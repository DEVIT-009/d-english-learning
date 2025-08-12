import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  type Product,
  updateProduct,
} from "../api/products";
import { useForm } from "react-hook-form";
import type { Resolver, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { TableSkeleton } from "../components/Skeleton";

type ProductForm = {
  name: string;
  price: number;
  category: string;
  image?: FileList;
};

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .min(0, "Price must be >= 0")
      .required("Price is required"),
    category: yup.string().required("Category is required"),
    image: yup.mixed<FileList>().optional(),
  })
  .required();

type SortState = { key: keyof Product; dir: "asc" | "desc" };

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [sort, setSort] = useState<SortState>({
    key: "createdAt",
    dir: "desc",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [infinite, setInfinite] = useState(false);
  const [visible, setVisible] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductForm>({
    resolver: yupResolver(schema) as Resolver<ProductForm>,
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        toast.error("Failed to load products");
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (infinite) setVisible(pageSize);
  }, [infinite, query, sort, pageSize]);

  useEffect(() => {
    if (!infinite) return;
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisible((v) => Math.min(v + pageSize, filteredLength));
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [infinite, pageSize /* filteredLength dep below */]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const base = q
      ? products.filter((p) =>
          [p.name, p.category, String(p.price)].some((v) =>
            v.toLowerCase().includes(q)
          )
        )
      : products;
    const sorted = [...base].sort((a, b) => {
      const va = a[sort.key];
      const vb = b[sort.key];
      if (typeof va === "number" && typeof vb === "number")
        return sort.dir === "asc" ? va - vb : vb - va;
      return sort.dir === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
    return sorted;
  }, [products, query, sort]);

  const filteredLength = filtered.length;

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  const displayItems = infinite ? filtered.slice(0, visible) : pageItems;

  function openCreate() {
    setEditing(null);
    reset({ name: "", price: 0, category: "", image: undefined });
    setPreview(null);
    setModalOpen(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    reset({ name: p.name, price: p.price, category: p.category });
    setPreview(p.image ?? null);
    setModalOpen(true);
  }

  const onSubmit: SubmitHandler<ProductForm> = async (values) => {
    try {
      const file = values.image?.[0];
      const image = file ? await fileToDataURL(file) : editing?.image ?? null;

      if (editing) {
        const updated = await updateProduct(editing.id, {
          name: values.name,
          price: Number(values.price),
          category: values.category,
          image,
        });
        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
        toast.success("Product updated successfully");
      } else {
        const created = await createProduct({
          name: values.name,
          price: Number(values.price),
          category: values.category,
          image,
        });
        setProducts((prev) => [created, ...prev]);
        toast.success("Product created successfully");
      }
      setModalOpen(false);
    } catch (error) {
      toast.error(
        editing ? "Failed to update product" : "Failed to create product"
      );
      console.error("Product operation failed:", error);
    }
  };

  async function onDelete(id: string) {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Failed to delete product:", error);
    }
  }

  function toggleSort(key: keyof Product) {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return setPreview(null);
    fileToDataURL(file).then(setPreview);
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <div className="flex gap-2">
          <input
            placeholder="Search..."
            className="w-48 rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-700"
              checked={infinite}
              onChange={(e) => setInfinite(e.target.checked)}
            />
            Infinite scroll
          </label>
          <button
            onClick={openCreate}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-auto">
          <table className="min-w-[720px] w-full text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50">
              <tr>
                <Th
                  label="Name"
                  onClick={() => toggleSort("name")}
                  active={sort.key === "name"}
                  dir={sort.dir}
                />
                <Th
                  label="Category"
                  onClick={() => toggleSort("category")}
                  active={sort.key === "category"}
                  dir={sort.dir}
                />
                <Th
                  label="Price"
                  onClick={() => toggleSort("price")}
                  active={sort.key === "price"}
                  dir={sort.dir}
                />
                <Th
                  label="Created"
                  onClick={() => toggleSort("createdAt")}
                  active={sort.key === "createdAt"}
                  dir={sort.dir}
                />
                <th className="px-3 py-2">Image</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton />
              ) : displayItems.length === 0 ? (
                <tr>
                  <td
                    className="px-3 py-6 text-center text-zinc-500 dark:text-zinc-400"
                    colSpan={6}
                  >
                    {query ? "No products found" : "No products"}
                  </td>
                </tr>
              ) : (
                displayItems.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-zinc-100 dark:border-zinc-800"
                  >
                    <td className="px-3 py-2 font-medium">{p.name}</td>
                    <td className="px-3 py-2">{p.category}</td>
                    <td className="px-3 py-2">${p.price.toFixed(2)}</td>
                    <td className="px-3 py-2">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt=""
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <span className="text-zinc-500">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="rounded-md border border-zinc-200 px-2 py-1 text-xs hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(p.id)}
                          className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!infinite ? (
          <div className="flex items-center justify-between border-t border-zinc-200 p-3 text-sm dark:border-zinc-800">
            <div>
              Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-md border border-zinc-200 px-2 py-1 disabled:opacity-50 dark:border-zinc-700"
              >
                Prev
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-md border border-zinc-200 px-2 py-1 disabled:opacity-50 dark:border-zinc-700"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div ref={sentinelRef} className="h-8 w-full" />
        )}
      </div>

      {/* modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-3 text-lg font-medium">
              {editing ? "Edit product" : "Add product"}
            </div>
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="mb-1 block text-sm">Name</label>
                <input
                  className="w-full rounded-md border border-zinc-300 bg-white p-2 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm">Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-md border border-zinc-300 bg-white p-2 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.price.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm">Category</label>
                <input
                  className="w-full rounded-md border border-zinc-300 bg-white p-2 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
                  {...register("category")}
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  onChange={onFileChange}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="mt-2 h-20 w-20 rounded object-cover"
                  />
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700"
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Th({
  label,
  onClick,
  active,
  dir,
}: {
  label: string;
  onClick: () => void;
  active: boolean;
  dir: "asc" | "desc";
}) {
  return (
    <th className="cursor-pointer select-none px-3 py-2" onClick={onClick}>
      <span className="inline-flex items-center gap-1">
        {label}
        {active && (
          <span className="text-zinc-500">{dir === "asc" ? "▲" : "▼"}</span>
        )}
      </span>
    </th>
  );
}

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string | null;
  createdAt: string;
};

const STORAGE_KEY = "products_store";

function ensureSeed() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return;
  const now = Date.now();
  const sample: Product[] = [
    {
      id: crypto.randomUUID(),
      name: "Notebook",
      price: 9.99,
      category: "Stationery",
      image: null,
      createdAt: new Date(now - 86400000 * 5).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "Headphones",
      price: 49.9,
      category: "Electronics",
      image: null,
      createdAt: new Date(now - 86400000 * 3).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "Backpack",
      price: 34.0,
      category: "Bags",
      image: null,
      createdAt: new Date(now - 86400000 * 2).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "Water Bottle",
      price: 12.5,
      category: "Accessories",
      image: null,
      createdAt: new Date(now - 86400000).toISOString(),
    },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
}

function readAll(): Product[] {
  ensureSeed();
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Product[]) : [];
}

function writeAll(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function delay<T>(data: T, ms = 300) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getProducts(): Promise<Product[]> {
  return delay(readAll());
}

export type CreateProductInput = Omit<Product, "id" | "createdAt">;
export async function createProduct(
  input: CreateProductInput
): Promise<Product> {
  const all = readAll();
  const product: Product = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };
  all.unshift(product);
  writeAll(all);
  return delay(product);
}

export type UpdateProductInput = Partial<Omit<Product, "id" | "createdAt">>;
export async function updateProduct(
  id: string,
  updates: UpdateProductInput
): Promise<Product> {
  const all = readAll();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Product not found");
  const updated = { ...all[idx], ...updates };
  all[idx] = updated;
  writeAll(all);
  return delay(updated);
}

export async function deleteProduct(id: string): Promise<void> {
  const all = readAll();
  const next = all.filter((p) => p.id !== id);
  writeAll(next);
  return delay(undefined);
}

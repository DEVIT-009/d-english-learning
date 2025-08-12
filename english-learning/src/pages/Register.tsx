import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppStore";
import { loginSuccess } from "../store/authSlice";
import { toast } from "react-hot-toast";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

const schema = yup
  .object({
    name: yup.string().min(2, "Too short").required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Min 6 characters")
      .required("Password is required"),
  })
  .required();

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: yupResolver(schema) });

  async function onSubmit(values: RegisterForm) {
    try {
      await new Promise((r) => setTimeout(r, 600));
      const fakeToken = "mock-jwt-token";
      dispatch(
        loginSuccess({
          token: fakeToken,
          email: values.email,
          name: values.name,
        })
      );
      toast.success("Account created");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Registration failed");
    }
  }

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-1 block text-sm">Name</label>
          <input
            className="w-full rounded-md border border-zinc-300 bg-white p-2 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm">Email</label>
          <input
            type="email"
            className="w-full rounded-md border border-zinc-300 bg-white p-2 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm">Password</label>
          <input
            type="password"
            className="w-full rounded-md border border-zinc-300 bg-white p-2 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Create account"}
        </button>
      </form>
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
        Already have an account?{" "}
        <Link className="text-blue-600 hover:underline" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}

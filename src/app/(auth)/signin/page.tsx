"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

type LoginResponse = {
  access?: string;
  refresh?: string;
  user_id?: string;
  username?: string;
  email?: string;
  error?: string;
};

const LOGIN_URL =
  process.env.NEXT_PUBLIC_LOGIN_URL ||
  "http://127.0.0.1:8000/api/auth/client/login/";

const SignIn = () => {
  console.log("SignIn Render");
  const router = useRouter();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      localStorage.setItem("access_token", data.access || "");
      localStorage.setItem("refresh_token", data.refresh || "");
      localStorage.setItem("user_id", data.user_id || "");
      localStorage.setItem("username", data.username || "");
      localStorage.setItem("email", data.email || "");

      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unexpected error occurred.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-200 grid grid-cols-1 lg:grid-cols-2">

        {/* Left Side */}

        <div className="bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Welcome Back
            </p>

            <h1 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight">
              Sign in to your account
            </h1>

            <p className="mt-4 text-slate-300 max-w-md">
              Access your account securely using your email and password to
              continue to your dashboard.
            </p>
          </div>

          <div className="mt-10 grid gap-4">
            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <h2 className="font-semibold">
                Secure Authentication
              </h2>

              <p className="text-sm text-slate-300 mt-1">
                Your account is protected using JWT authentication.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <h2 className="font-semibold">
                Fast Access
              </h2>

              <p className="text-sm text-slate-300 mt-1">
                Sign in and continue where you left off.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="p-8 sm:p-10">

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Sign In
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Enter your credentials to access your account.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white font-medium transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Enter your email and password to continue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
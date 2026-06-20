"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

type FormState = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ApiResponse = {
  message?: string;
};

const REGISTER_URL =
  process.env.NEXT_PUBLIC_REGISTER_URL || "http://127.0.0.1:8000/api/auth/client/register/";

const CreateAccount = () => {
  const [form, setForm] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("The password must be 8 characters or more.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSuccess(data.message || "Account created successfully. Check your email for the verification code.");
      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      localStorage.setItem("pending_email", form.email);
      router.push('/verifycode');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error happened.";
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
              Welcome
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight">
              Create your account
            </h1>
            <p className="mt-4 text-slate-300 max-w-md">
              Register now to receive a verification code by email and continue to your dashboard.
            </p>
          </div>

          <div className="mt-10 grid gap-4">
            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <h2 className="font-semibold">Fast verification</h2>
              <p className="text-sm text-slate-300 mt-1">
                A code will be sent to your email address after registration.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <h2 className="font-semibold">Secure access</h2>
              <p className="text-sm text-slate-300 mt-1">
                Passwords are validated before the account is created.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
            <p className="text-sm text-slate-500 mt-2">
              Fill in your details to register a new account.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
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
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white font-medium transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            After registration, check your email for the verification code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
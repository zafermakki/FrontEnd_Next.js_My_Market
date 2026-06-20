"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ApiResponse = {
  message?: string;
};

const VERIFY_URL =
  process.env.NEXT_PUBLIC_VERIFY_URL ||
  "http://127.0.0.1:8000/api/auth/verify-code/";

const CODE_LENGTH = 6;

const VerifyCode = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [codeDigits, setCodeDigits] = useState<string[]>(
    Array(CODE_LENGTH).fill("")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const code = useMemo(() => codeDigits.join(""), [codeDigits]);
  const isCodeComplete = codeDigits.every((digit) => digit !== "");

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    const emailFromStorage = localStorage.getItem("pending_email");

    const resolvedEmail = emailFromQuery || emailFromStorage || "";
    setEmail(resolvedEmail);

    if (!resolvedEmail) {
      setError("No email found. Please register again.");
    }
  }, [searchParams]);

  useEffect(() => {
    const firstEmptyIndex = codeDigits.findIndex((digit) => digit === "");
    const focusIndex = firstEmptyIndex === -1 ? 0 : firstEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  }, []);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setError("");
    setSuccess("");

    setCodeDigits((prev) => {
      const next = [...prev];
      next[index] = digit;

      return next;
    });

    if (digit && index < CODE_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      setError("");
      setSuccess("");

      if (codeDigits[index]) {
        setCodeDigits((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
        return;
      }

      if (index > 0) {
        setCodeDigits((prev) => {
          const next = [...prev];
          next[index - 1] = "";
          return next;
        });
        focusInput(index - 1);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    }

    if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pastedText = e.clipboardData.getData("text");
    const digits = pastedText.replace(/\D/g, "").slice(0, CODE_LENGTH - index);

    if (!digits) return;

    setError("");
    setSuccess("");

    setCodeDigits((prev) => {
      const next = [...prev];
      digits.split("").forEach((digit, offset) => {
        next[index + offset] = digit;
      });
      return next;
    });

    const nextIndex = Math.min(index + digits.length, CODE_LENGTH - 1);
    focusInput(nextIndex);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email) {
      setError("No email found. Please register again.");
      return;
    }

    if (!isCodeComplete) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(VERIFY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSuccess(data.message || "Account verified successfully.");

      localStorage.removeItem("pending_email");

      setCodeDigits(Array(CODE_LENGTH).fill(""));

      setTimeout(() => {
        router.push("/signin");
      }, 1800);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error.";
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
              Verification
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight">
              Verify your account
            </h1>
            <p className="mt-4 text-slate-300 max-w-md">
              Enter the 6-digit code sent to your email to activate your
              account.
            </p>
          </div>

          <div className="mt-10 grid gap-4">
            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <h2 className="font-semibold">Secure activation</h2>
              <p className="text-sm text-slate-300 mt-1">
                Your account becomes active immediately after successful
                verification.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <h2 className="font-semibold">Fast verification</h2>
              <p className="text-sm text-slate-300 mt-1">
                You can paste the full code directly into the boxes.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Verify Account
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              {email ? `Code sent to ${email}` : "Enter the verification code."}
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Verification Code
              </label>

              <div className="flex gap-3 sm:gap-4">
                {codeDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={(e) => handlePaste(index, e)}
                    className="h-14 w-full rounded-2xl border border-slate-300 bg-white text-center text-xl font-semibold text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white font-medium transition hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Check your inbox if you have not received the code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
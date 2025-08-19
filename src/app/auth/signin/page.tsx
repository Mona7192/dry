"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [step, setStep] = useState<"email" | "login" | "register">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.exists) {
        setStep("login"); // کاربر قبلی
      } else {
        // API خودش ایمیل کد می‌فرسته
        setStep("register"); // کاربر جدید
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/book-order/book",
    });

    if (res?.error) setError("Invalid credentials.");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // بعد از ثبت نام، خودکار لاگین کنیم
        await signIn("credentials", {
          redirect: true,
          email,
          password,
          callbackUrl: "/book-order/book",
        });
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="max-w-sm mx-auto py-10">
      <h1 className="text-xl font-bold mb-4">Sign In / Register</h1>

      {step === "email" && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
            Continue
          </button>
        </form>
      )}

      {step === "login" && (
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      )}

      {step === "register" && (
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="email" value={email} disabled className="w-full border p-2 rounded bg-gray-100" />
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
            Register & Login
          </button>
        </form>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

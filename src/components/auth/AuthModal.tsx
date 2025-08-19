"use client";
import React, { useState } from "react";

type AuthModalProps = {
  onClose: () => void;
  onLogin: (user: { email: string }, token: string) => void;
};

export default function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register" | "verify">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  // Login handler
  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        onLogin(data.user, data.token);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // Step 1 - Send code to email
  const handleSendCode = async () => {
    try {
      const res = await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Code sent to your email!");
        setMode("verify");
      } else {
        alert(data.message || "Failed to send code");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // Step 2 - Verify & Register
  const handleRegister = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, password }),
      });
      const data = await res.json();

      if (res.ok) {
        onLogin(data.user, data.token);
      } else {
        alert(data.message || "Register failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Switch modes */}
        <div className="flex justify-center mb-4 gap-4">
          <button
            className={`px-4 py-2 rounded ${mode === "login" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded ${mode === "register" || mode === "verify" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {/* LOGIN */}
        {mode === "login" && (
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={handleLogin}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </div>
        )}

        {/* REGISTER STEP 1 */}
        {mode === "register" && (
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={handleSendCode}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Send Code
            </button>
          </div>
        )}

        {/* REGISTER STEP 2 (verify) */}
        {mode === "verify" && (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={handleRegister}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Complete Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
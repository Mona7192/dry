// src/components/layout/Navbar.tsx
"use client"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useUserStore } from "@/store/userStore" // فرض: استیت کاربر در اینجا

export default function LoginButton() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, setUser, logout } = useUserStore()
  const [showModal, setShowModal] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) throw new Error("Login failed")
      const data = await res.json()
      setUser(data.user) // ذخیره کاربر در استیت
      setShowModal(false)
      // بعد از لاگین، اگر قبلاً مسیر book بود، می‌ریم اونجا
      if (pathname.includes("/book-order")) {
        router.replace(pathname) // روی همان صفحه می‌مانیم
      }
    } catch (err) {
      alert("Login failed")
    }
  }

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) throw new Error("Register failed")
      const data = await res.json()
      setUser(data.user)
      setShowModal(false)
    } catch (err) {
      alert("Register failed")
    }
  }

  return (
    <div>
      

      <div>
        {!user ? (
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary hover:bg-Secondary text-white text-sm px-4 py-2 rounded-md"
          >
            Login / Sign Up
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <span>{user.name}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">{isRegister ? "Register" : "Login"}</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-2 p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={isRegister ? handleRegister : handleLogin}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isRegister ? "Register" : "Login"}
            </button>
            <p className="text-sm mt-3 text-center">
              {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Login" : "Register"}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

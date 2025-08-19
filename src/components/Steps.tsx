"use client";

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-gray-100 shadow">
     
      {status === "loading" ? (
        <p>Loading...</p>
      ) : session ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-700">{session.user?.email}</span>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => {
             openAuth && (
        <AuthModal
          onClose={() => setOpenAuth(false)}
          onLogin={(userData, token) => {
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
            setUser(userData);
            setOpenAuth(false);
          }}
        />
      )
            // مودال لاگینت رو اینجا باز کن
            const modal = document.getElementById("auth-modal");
            if (modal) modal.classList.remove("hidden");
          }}
        >
          Login / Register
        </button>
      )}
    </div>
  );
}

{!user ? (
        <button
          onClick={() => setOpenAuth(true)}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Login / Sign Up
        </button>
      ) : (
        <div className="flex gap-4 items-center">
          <span>👤 {user.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}

      {openAuth && (
        <AuthModal
          onClose={() => setOpenAuth(false)}
          onLogin={(userData, token) => {
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
            setUser(userData);
            setOpenAuth(false);
          }}
        />
      )}
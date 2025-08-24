"use client";

import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import AuthModal from "./auth/AuthModal";

export default function Steps() {
  const { user, isAuthenticated, logout } = useUserStore();
  const [openAuth, setOpenAuth] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-gray-100 shadow">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">Your Order Steps</h1>
      </div>

      <div className="flex items-center">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-700">👤 {user?.name || user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setOpenAuth(true)}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Login / Register
          </button>
        )}
      </div>

      {/* Auth Modal */}
      {openAuth && (
        <AuthModal
          isOpen={openAuth}
          onClose={() => setOpenAuth(false)}
          initialTab="login"
        />
      )}
    </div>
  );
}
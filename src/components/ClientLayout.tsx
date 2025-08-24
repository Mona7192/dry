"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import AuthModal from "@/components/auth/AuthModal";
import Header from "@/components/Navbar"; // 👈 هدر اینجا اضافه میشه
import Footer from "@/components/Footer";



interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { hasHydrated, checkAuthStatus } = useUserStore();

  // Check auth status on app start (only once after hydration)
  useEffect(() => {
    if (hasHydrated) {
      // Only check if we have a token but no user data
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const { isAuthenticated, user } = useUserStore.getState();

      if (token && !isAuthenticated && !user) {
        checkAuthStatus();
      }
    }
  }, [hasHydrated, checkAuthStatus]);

  // Don't render anything until hydration is complete
  if (!hasHydrated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Header />         {/* هدر سایت */}
      <AuthModal />      {/* مودال */}
      <main>{children}</main>
      <Footer />       {/* فوتر سایت */}
    </>
  );
}
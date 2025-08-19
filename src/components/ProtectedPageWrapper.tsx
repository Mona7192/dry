"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProtectedPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      const modal = document.getElementById("auth-modal");
      if (modal) modal.classList.remove("hidden");
    }
  }, [status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    // وقتی لاگین نیست، children نشون داده نمی‌شن
    return <p className="text-center mt-4">لطفاً ابتدا وارد شوید...</p>;
  }

  return <>{children}</>;
}
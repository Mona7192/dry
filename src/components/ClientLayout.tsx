"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  return (
    <SessionProvider session={session}>
      <Navbar />
      {children}
      <Footer />
    </SessionProvider>
  );
}

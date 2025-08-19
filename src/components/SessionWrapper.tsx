"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface SessionWrapperProps {
  children: ReactNode;
  session?: object | null;
}

const SessionWrapper: React.FC<SessionWrapperProps> = ({
  children,
  session = {},
}) => {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </SessionProvider>
  );
};

export default SessionWrapper;
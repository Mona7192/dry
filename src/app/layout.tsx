// src/app/layout.tsx
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
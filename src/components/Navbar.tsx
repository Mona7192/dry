"use client"
// components/Navbar.tsx
import TopBar from "./TopBar";
import MainNav from "./MainNav";


export default function Navbar() {
  return (
    <header className="w-full">
      <TopBar />
      <MainNav />
    </header>
  );
}

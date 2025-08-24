"use client";

import Link from "next/link";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import AuthModal from "./auth/AuthModal";
import { useUserStore } from "@/store/userStore"; // NextAuth جایگزین شده با Zustand
import { Menu, X } from "lucide-react"; // آیکون‌های همبرگری و بستن

export default function MainNav() {
  const { user, isAuthenticated, logout } = useUserStore(); // استفاده از Zustand store
  const [openAuth, setOpenAuth] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpenMenu(false);
  };

  return (
    <div className="w-full bg-white py-3 px-4 shadow-sm flex items-center justify-between">
      {/* Navigation Links */}
      <div className="container mx-auto flex justify-between items-center py-4 px-6">

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/services" className="hover:text-primary">Services</Link>
          <Link href="/pricing" className="hover:text-primary">Pricing</Link>
          <Link href="/book-order" className="hover:text-primary">Book Order</Link>
          <Link href="/about" className="hover:text-primary">About Us</Link>
          <Link href="/contact" className="hover:text-primary">Contact Us</Link>
        </nav>
      </div>

      {/* Overlay + Mobile Slide Menu */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Mobile Nav */}
        <nav className="flex flex-col p-4 gap-4 text-gray-700 text-sm font-medium">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-primary">Home</Link>
          <Link href="/services" onClick={() => setIsOpen(false)} className="hover:text-primary">Services</Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)} className="hover:text-primary">Pricing</Link>
          <Link href="/book-order" onClick={() => setIsOpen(false)} className="hover:text-primary">Book Order</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-primary">About Us</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary">Contact Us</Link>
        </nav>
      </div>

      {/* Search Input + Auth */}
      <div className="flex items-center w-lg relative">
        <div className="flex items-center border border-Secondary rounded-md px-2 py-1 w-full max-w-[300px] mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none text-sm"
          />
          <FaSearch className="text-Secondary ml-2" />
        </div>

        {!isAuthenticated ? (
          <button
            onClick={() => setOpenAuth(true)}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Login / Sign Up
          </button>
        ) : (
          <div className="relative">
            {/* Avatar */}
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <FaUserCircle className="text-2xl text-gray-700" />
            </button>

            {/* Dropdown Menu */}
            {openMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
                <div className="px-4 py-2 text-sm text-gray-600 border-b">
                  {user?.email}
                </div>
                <div className="px-4 py-2 text-sm text-gray-600 border-b">
                  Welcome, {user?.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {openAuth && (
          <AuthModal
            isOpen={openAuth}
            onClose={() => setOpenAuth(false)}
          />
        )}

      </div>
    </div>
  );
}
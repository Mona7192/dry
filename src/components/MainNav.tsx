"use client";

import Link from "next/link";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import AuthModal from "./auth/AuthModal";
import { useSession, signOut } from "next-auth/react";


export default function MainNav() {
  const { data: session } = useSession();
  const [openAuth, setOpenAuth] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  
  
  return (
    <div className="w-full bg-white py-3 px-4 shadow-sm flex items-center justify-between">
      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
        <Link href="/" className="hover:text-primary">Home</Link>
        <Link href="/services" className="hover:text-primary">Services</Link>
        <Link href="/pricing" className="hover:text-primary">Pricing</Link>
        <Link href="/book-order" className="hover:text-primary">Book Order</Link>
        <Link href="/about" className="hover:text-primary">About Us</Link>
        <Link href="/contact" className="hover:text-primary">Contact Us</Link>
      </nav>

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

        {!session ? (
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
                  {session.user?.email}
                </div>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {openAuth && <AuthModal onClose={() => setOpenAuth(false)} />}
       
      </div>
    </div>
  );
}
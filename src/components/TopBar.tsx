// components/TopBar.tsx
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function TopBar() {
  return (
    <div className="w-full bg-white py-2 px-4 flex items-center justify-between text-sm text-gray-600">
      {/* Logo */}
      <div className="font-bold text-lg text-gray-800">
         <Image
      src="/images/logo.png"
      width={80}
      height={46}
      alt="logo"
    />
      </div>

      {/* Social Media Icons */}
      <div className="flex items-center space-x-4">
        <a href="#" aria-label="Instagram">
          <FaInstagram className="hover:text-pink-500 text-Secondary" />
        </a>
        <a href="#" aria-label="Telegram">
          <FaTelegramPlane className="hover:text-blue-400 text-Secondary" />
        </a>
        <a href="#" aria-label="WhatsApp">
          <FaWhatsapp className="hover:text-green-500 text-Secondary" />
        </a>
      </div>
    </div>
  );
}

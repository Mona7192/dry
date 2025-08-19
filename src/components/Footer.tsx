import Link from 'next/link'
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white text-gray-200 py-16 border-t-2 border-Secondary">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">About Us</h3>
          <p className="text-sm text-black">
            FreshFold is your go-to laundry and duvet cleaning service in London. We offer fast, reliable, and eco-friendly cleaning with free collection and delivery — making laundry day effortless.

          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
          <ul className="space-y-2 text-sm text-black">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Services</h3>
          <ul className="space-y-2 text-sm text-black">
            <li><Link href="/services/laundry" className="hover:underline">Laundry</Link></li>
            <li><Link href="/services/dry-cleaning" className="hover:underline">Dry Cleaning</Link></li>
            <li><Link href="/services/ironing" className="hover:underline">Ironing</Link></li>
            <li><Link href="/services/express" className="hover:underline">Express Service</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Contact Us</h3>
          <ul className="text-sm space-y-3 text-black">
            <li className="flex items-start gap-2">
              <MapPin size={16} /> 123 Clean Street, Fresh City, USA
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@dryclean.com
            </li>
          </ul>
          
        </div>
      </div>
      {/* social media */}
      <div className="mt-12 text-center text-sm bg-light text-gray-500 pt-6 justify-items-center h-[120px]">
        <p className="text-primary font-bold text-base">Follow Us:</p>
        <div className="flex gap-4 pt-6">
            <a href="#" className="hover:text-primary text-Gray-1"><Facebook size={20} /></a>
            <a href="#" className="hover:text-primary text-Gray-1"><Instagram size={20} /></a>
            <a href="#" className="hover:text-primary text-Gray-1"><Twitter size={20} /></a>
          </div>
      </div>
      {/* Copyright */}
      <div className="text-center text-sm text-black pt-6">
        &copy; {new Date().getFullYear()} FreshFold. All rights reserved.
      </div>
    </footer>
  )
}

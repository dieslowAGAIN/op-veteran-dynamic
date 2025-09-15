'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Shield } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, canView } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/blog', label: 'Blog' },
    { href: '/get-involved', label: 'Get Involved' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-veteran-gold" />
            <span className="font-heading font-bold text-xl text-veteran-navy">
              O.P. Veteran
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-veteran-gold transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            
            {canView && (
              <Link
                href="/admin"
                className="bg-veteran-navy text-white px-4 py-2 rounded-md hover:bg-veteran-blue transition-colors"
              >
                Admin Panel
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-veteran-gold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {canView && (
              <Link
                href="/admin"
                className="block mt-4 bg-veteran-navy text-white px-4 py-2 rounded-md hover:bg-veteran-blue transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Admin Panel
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
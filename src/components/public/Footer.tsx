'use client';

import Link from 'next/link';
import { Shield, Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-veteran-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-veteran-gold" />
              <span className="font-heading font-bold text-xl">O.P. Veteran</span>
            </div>
            <p className="text-sm opacity-80">
              Taking care of our own. A 501(c)(3) non-profit dedicated to reconnecting and supporting our nation's heroes.
            </p>
            <p className="text-sm mt-2 opacity-80">
              EIN: 81-4477452
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm opacity-80 hover:opacity-100 hover:text-veteran-gold transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm opacity-80 hover:opacity-100 hover:text-veteran-gold transition-all">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm opacity-80 hover:opacity-100 hover:text-veteran-gold transition-all">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="text-sm opacity-80 hover:opacity-100 hover:text-veteran-gold transition-all">
                  Get Involved
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-sm opacity-80 hover:opacity-100 hover:text-veteran-gold transition-all">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources/mental-health" className="text-sm opacity-80 hover:opacity-100 hover:text-veteran-gold transition-all">
                  Mental Health Support
                </Link>
              </li>
              <li>
                <Link href="/resources/benefits" className="text-sm opacity-80 hover:opacity-100 hover:text-veteran-gold transition-all">
                  VA Benefits
                </Link>
              </li>
              <li>
                <Link href="/resources/employment" className="text-sm opacity-80 hover:opacity-100 hover:text-veteran-gold transition-all">
                  Employment Help
                </Link>
              </li>
              <li>
                <Link href="/resources/education" className="text-sm opacity-80 hover:opacity-100 hover:text-veteran-gold transition-all">
                  Education Resources
                </Link>
              </li>
              <li>
                <a 
                  href="https://apps.irs.gov/app/eos/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-veteran-gold transition-all"
                >
                  IRS Verification
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-veteran-gold" />
                <a href="mailto:info@opveteran.org" className="text-sm opacity-80 hover:opacity-100">
                  info@opveteran.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-veteran-gold" />
                <a href="tel:+1234567890" className="text-sm opacity-80 hover:opacity-100">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-veteran-gold mt-1" />
                <span className="text-sm opacity-80">
                  123 Veteran Way<br />
                  Patriot City, USA 12345
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-veteran-gold hover:text-veteran-navy transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-veteran-gold hover:text-veteran-navy transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-veteran-gold hover:text-veteran-navy transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-veteran-gold hover:text-veteran-navy transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-veteran-gold hover:text-veteran-navy transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-80">
              © {currentYear} O.P. Veteran. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm opacity-80 hover:opacity-100 hover:text-veteran-gold transition-all">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm opacity-80 hover:opacity-100 hover:text-veteran-gold transition-all">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-sm opacity-80 hover:opacity-100 hover:text-veteran-gold transition-all">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
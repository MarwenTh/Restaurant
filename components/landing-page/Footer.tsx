"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { SiIfood } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <span className="text-xl md:text-2xl font-bold text-[#f97415] flex items-center space-x-2">
                <SiIfood size={40} />
                Food<span className="text-[#e64d19]">Guide</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Connecting food enthusiasts with exceptional restaurants for
              unforgettable dining experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <ul className="space-y-4">
              {[
                "About Us",
                "How It Works",
                "Featured Restaurants",
                "Service Areas",
                "Testimonials",
                "Join Us",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-400 hover:text-[#D4AF37] relative inline-block after:content-none
                      after:absolute after:w-full after: h-[3px] after:bg-[#D4AF37] after:bottom-0
                      after:left-0 after:scale-x-0 after:origin-bottom-right
                      after:transition-transform after:duration-300 hover:after:scale-x-100
                      hover:after:origin-bottom-left transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <ul className="space-y-4">
              {[
                "Privacy Policy",
                "Terms of Service",
                "FAQ",
                "Help Center",
                "Blog",
                "Careers",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#D4AF37] relative inline-block after:content-none
                      after:absolute after:w-full after: h-[3px] after:bg-[#D4AF37] after:bottom-0
                      after:left-0 after:scale-x-0 after:origin-bottom-right
                      after:transition-transform after:duration-300 hover:after:scale-x-100
                      hover:after:origin-bottom-left transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#D4AF37] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Tunisia, Foodie Plaza,
                  <br />
                  Tunis, TN 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#D4AF37] mr-3 flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                >
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#D4AF37] mr-3 flex-shrink-0" />
                <a
                  href="Nawres.zayneb@FoodGuide.com"
                  className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                >
                  info@FoodGuide.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between
            items-center"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} FoodGuide. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-[#D4AF37] text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#D4AF37] text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#D4AF37] text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

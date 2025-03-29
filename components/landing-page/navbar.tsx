"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SiIfood } from "react-icons/si";
import { useSession } from "next-auth/react";
import ThemeModeToggle from "../theme-mode-toggle";
import UserDropdown from "../dashboard/userDropdown";
import useUser from "@/hooks/useUser";
import Link from "next/link";

const NAV_ITEMS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Features", href: "#featured" },
  { name: "Areas", href: "#areas" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact Us", href: "#contact-us" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { user, loading, error } = useUser();

  // console.log(users);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-10",
        isScrolled
          ? "py-3 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm"
          : "py-5 bg-transparent",
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <span className="text-xl md:text-2xl font-bold text-[#f97415] flex items-center space-x-2">
            <SiIfood size={40} />
            Food<span className="text-[#e64d19]">Guide</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={cn(
                `text-white/90 dark:text-gray-200 cursor-pointer hover:text-[#f97415] relative
                after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0
                after:bg-[#f97415] after:transition-all hover:after:w-full`,
                isScrolled && "text-black/80",
              )}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeModeToggle />
          {!session ? (
            <Link href={"/signup"}>
              <Button variant="outline" className="font-medium cursor-pointer">
                Join us now
              </Button>
            </Link>
          ) : (
            <UserDropdown session={session} />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#020817]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          `md:hidden absolute w-full bg-white/95 dark:bg-black/80 backdrop-blur-lg
          transition-all duration-300 shadow-md`,
          isMobileMenuOpen
            ? "max-h-[500px] py-5"
            : "max-h-0 py-0 overflow-hidden",
        )}
      >
        <div className="container-custom flex flex-col space-y-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="py-2 text-[#020817]/80 dark:text-gray-200 hover:text-[#f97415] text-left"
            >
              {item.name}
            </button>
          ))}
          <div className="flex flex-col space-y-3 pt-3">
            <Button variant="outline" className="w-full">
              Partner with us
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

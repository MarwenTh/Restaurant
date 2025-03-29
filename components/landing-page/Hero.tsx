"use client";
import { ArrowDown } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const headlines = [
    "Connecting Foodies with Amazing Restaurants",
    "The Ultimate Food Marketplace Experience",
    "Discover Culinary Treasures Near You",
  ];
  const { data: session } = useSession();

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % headlines.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(to right, rgba(26, 26, 26, 0.9), rgba(26, 26, 26, 0.7)), 
                    url('https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/40"></div>

      <div
        className={`z-10 max-w-7xl mx-auto px-4 md:px-8 text-center transition-all duration-1000
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="inline-block mb-6 reveal">
          <span className="px-4 py-1.5 mb-6 bg-[#f97415]/10 text-[#f97415] rounded-full font-medium text-sm">
            THE PREMIUM FOOD MARKETPLACE
          </span>
        </div>

        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight
            reveal"
        >
          <span className="relative block h-[60px] md:h-[80px] overflow-hidden">
            {headlines.map((headline, index) => (
              <span
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                index === currentText
                    ? "opacity-100 transform-none"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {headline}
              </span>
            ))}
          </span>
          <span className="block mt-2 text-[#D4AF37]">Taste, Order, Enjoy</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/90 mb-10 reveal">
          Where exceptional restaurants meet food enthusiasts. Our marketplace
          brings together the best local eateries and hungry customers in one
          seamless platform.
        </p>

        <div
          className="reveal flex flex-col sm:flex-row justify-center items-center space-y-4
            sm:space-y-0 sm:space-x-6"
        >
          <button
            className="bg-[#D4AF37] cursor-pointer text-white px-6 py-3 rounded-md font-medium
              transition-all hover:shadow-[#D4AF37] hover:translate-y-[-2px] min-w-[180px]
              animate-fade-in hover:shadow-2xl"
            style={{ animationDelay: "300ms" }}
          >
            Find Restaurants
          </button>
          <Link href={`${session ? "/dashboard" : "signup"}`}>
            <button
              className="border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-md font-medium
                transition-all hover:bg-[#D4AF37] hover:text-white hover:shadow-2xl
                hover:shadow-[#D4AF37] min-w-[180px] animate-fade-in cursor-pointer"
              style={{ animationDelay: "500ms" }}
            >
              Join us now
            </button>
          </Link>
        </div>
      </div>

      <button
        onClick={scrollToNextSection}
        className="reveal absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white
          hover:text-[#D4AF37] transition-colors animate-bounce cursor-pointer"
        aria-label="Scroll down"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default Hero;

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      className={`fixed right-6 bottom-6 bg-orange-500 dark:bg-orange-400 rounded-full p-3
        shadow-lg transition-all duration-300 cursor-pointer z-40 ${
        showScrollToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      onClick={scrollToTop}
      size="icon"
    >
      <ArrowUp size={20} />
    </Button>
  );
};

export default ScrollToTop;

import { useEffect } from "react";
import Navbar from "../Navbar";
import Hero from "../Hero";
import About from "../About";
import HowItWorks from "../HowItWorks";
import FeaturedRestaurants from "../FeaturedRestaurants";
import ServiceMap from "../ServiceMap";
import Testimonials from "../Testimonials";
import RestaurantCTA from "../RestaurantCTA";
import Footer from "../Footer";
import Areas from "../Areas";

const Index = () => {
  useEffect(() => {
    // Reveal animations on scroll
    const handleScroll = () => {
      const reveals = document.querySelectorAll(".reveal");
      const windowHeight = window.innerHeight;

      reveals.forEach((reveal) => {
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Preload images for better UX
  useEffect(() => {
    const preloadImages = () => {
      const imageUrls = [
        "https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
      ];

      imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    };

    preloadImages();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <FeaturedRestaurants />
      <Areas />
      <Testimonials />
      <RestaurantCTA />
      <Footer />
    </div>
  );
};

export default Index;

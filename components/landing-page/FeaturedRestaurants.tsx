"use client";
import { useState, useEffect, useRef } from "react";
import { Star, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedRestaurants = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // We'll show 3 slides with 3 restaurants each (9 total)
  const slideRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  const restaurants = [
    {
      name: "Bella Italiano",
      cuisine: "Italian",
      rating: 4.8,
      deliveryTime: "25-35",
      image:
        "https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      dishes: ["Margherita Pizza", "Pasta Carbonara", "Tiramisu"],
    },
    {
      name: "Sushi Palace",
      cuisine: "Japanese",
      rating: 4.9,
      deliveryTime: "30-40",
      image:
        "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
      dishes: ["Dragon Roll", "Miso Soup", "Salmon Sashimi"],
    },
    {
      name: "Taj Mahal",
      cuisine: "Indian",
      rating: 4.7,
      deliveryTime: "35-45",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80",
      dishes: ["Butter Chicken", "Naan Bread", "Vegetable Biryani"],
    },
    {
      name: "El Mariachi",
      cuisine: "Mexican",
      rating: 4.6,
      deliveryTime: "20-30",
      image:
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      dishes: ["Beef Tacos", "Guacamole", "Churros"],
    },
    {
      name: "[#D4AF37]en Dragon",
      cuisine: "Chinese",
      rating: 4.5,
      deliveryTime: "25-35",
      image:
        "https://images.unsplash.com/photo-1563245372-f37a35d681a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      dishes: ["Kung Pao Chicken", "Spring Rolls", "Fried Rice"],
    },
    {
      name: "Le Petit Bistro",
      cuisine: "French",
      rating: 4.9,
      deliveryTime: "35-45",
      image:
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
      dishes: ["Coq au Vin", "Crème Brûlée", "Beef Bourguignon"],
    },
    {
      name: "Mediterranean Delight",
      cuisine: "Greek",
      rating: 4.7,
      deliveryTime: "25-35",
      image:
        "https://images.unsplash.com/photo-1594311942545-98a32dad33db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1317&q=80",
      dishes: ["Gyros", "Greek Salad", "Baklava"],
    },
    {
      name: "Burger Joint",
      cuisine: "American",
      rating: 4.6,
      deliveryTime: "15-25",
      image:
        "https://images.unsplash.com/photo-1603508102123-f13563c84ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      dishes: ["Classic Burger", "Cheese Fries", "Milkshake"],
    },
    {
      name: "Thai Spice",
      cuisine: "Thai",
      rating: 4.8,
      deliveryTime: "30-40",
      image:
        "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      dishes: ["Pad Thai", "Green Curry", "Mango Sticky Rice"],
    },
  ];

  // Split restaurants into groups of 3 for our slides
  const restaurantSlides = Array.from({ length: totalSlides }, (_, i) =>
    restaurants.slice(i * 3, (i + 1) * 3),
  );
  return (
    <section id="featured" ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className="inline-block px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm
              font-medium tracking-wider mb-6 reveal"
          >
            FEATURED RESTAURANTS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-6 reveal">
            Explore Our Top-Rated Partners
          </h2>
          <p className="text-gray-700 text-lg reveal">
            Discover the most loved restaurants on our platform, known for their
            exceptional food quality, service, and unique culinary experiences.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={slideRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ width: `${totalSlides * 100}%` }}
            >
              {restaurantSlides.map((slideRestaurants, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex flex-col md:flex-row gap-6"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  {slideRestaurants.map((restaurant, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-[#D4AF37]/50 overflow-hidden flex-1 reveal border
                        border-gray-100 hover:shadow-[#D4AF37] transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div
                          className="absolute top-4 left-4 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-sm
                            font-medium"
                        >
                          {restaurant.cuisine}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {restaurant.name}
                        </h3>
                        <div className="flex items-center mb-4">
                          <div className="flex items-center mr-4">
                            <Star className="h-4 w-4 text-[#D4AF37] mr-1 fill-[#D4AF37]" />
                            <span className="text-gray-700">
                              {restaurant.rating}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-[#D4AF37] mr-1" />
                            <span className="text-gray-700">
                              {restaurant.deliveryTime} min
                            </span>
                          </div>
                        </div>
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-sm text-gray-600 font-medium mb-2">
                            Popular Dishes:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {restaurant.dishes.map((dish, i) => (
                              <span
                                key={i}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                              >
                                {dish}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={goToPrevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white
              shadow-[#D4AF37]/50 shadow-sm cursor-pointer h-12 w-12 rounded-full flex
              items-center justify-center text-gray-700 hover:text-[#D4AF37] transition-colors
              z-10 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white
              shadow-[#D4AF37]/50 shadow-sm cursor-pointer h-12 w-12 rounded-full flex
              items-center justify-center text-gray-700 hover:text-[#D4AF37] transition-colors
              z-10 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full mx-1 transition-all ${
              currentSlide === index ? "bg-[#D4AF37] w-6" : "bg-gray-300" }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;

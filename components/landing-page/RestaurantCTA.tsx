"use client";
import { ChefHat, Check } from "lucide-react";
import { useEffect, useRef } from "react";

const RestaurantCTA = () => {
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

  const benefits = [
    "Increased visibility to food enthusiasts",
    "Simple order management system",
    "Analytics and insights on your performance",
    "Dedicated support team",
    "Marketing tools to grow your business",
    "Flexible pricing plans",
  ];

  return (
    <section
      id="join-us"
      ref={sectionRef}
      className="py-20 md:py-28 relative"
      style={{
        background: `linear-gradient(to right, rgba(26, 26, 26, 0.8), rgba(26, 26, 26, 0.6)), 
                    url('https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm
                font-medium tracking-wider mb-6 reveal"
            >
              JOIN OUR NETWORK
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-serif reveal">
              Grow Your Restaurant with FoodGuide
            </h2>
            <p className="text-white/90 text-lg mb-8 reveal">
              Join thousands of successful restaurants that have expanded their
              customer base and increased their revenue through our platform.
            </p>

            <div className="space-y-4 mb-8 reveal">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-1 mr-4 bg-[#D4AF37]/20 rounded-full p-1">
                    <Check className="h-4 w-4 text-[#D4AF37]" />
                  </div>
                  <p className="text-white/90">{benefit}</p>
                </div>
              ))}
            </div>

            <button
              className="bg-[#D4AF37] text-white px-6 py-3 rounded-md font-medium transition-all
                hover:shadow-[#D4AF37] hover:translate-y-[-2px] reveal"
            >
              <div className="flex items-center">
                <ChefHat className="mr-2 h-5 w-5" />
                <span>Apply to Join</span>
              </div>
            </button>
          </div>

          <div className="reveal">
            <div className="bg-white rounded-lg shadow-[#D4AF37]/50 shadow-sm p-8 md:p-10">
              <h3 className="text-2xl font-semibold mb-6">Get Started Today</h3>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="restaurant-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    id="restaurant-name"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none
                      focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
                    placeholder="Enter your restaurant name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none
                      focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none
                      focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Restaurant Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none
                      focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
                    placeholder="Enter your restaurant location"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] text-white px-6 py-3 rounded-md font-medium transition-all
                    hover:shadow-[#D4AF37] hover:translate-y-[-2px]"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantCTA;

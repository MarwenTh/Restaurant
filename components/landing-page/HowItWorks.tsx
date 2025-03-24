"use client";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  UtensilsCrossed,
  CreditCard,
  Truck,
  Store,
  Smartphone,
  ShoppingBag,
  ChefHat,
} from "lucide-react";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<"customer" | "restaurant">(
    "customer",
  );
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

  const customerSteps = [
    {
      icon: <Search className="h-8 w-8 text-[#D4AF37]" />,
      title: "Discover",
      description:
        "Browse through our curated selection of restaurants and dishes based on your preferences and location.",
    },
    {
      icon: <UtensilsCrossed className="h-8 w-8 text-[#D4AF37]" />,
      title: "Select",
      description:
        "Choose from a variety of dishes and customize your order to your liking.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-[#D4AF37]" />,
      title: "Order",
      description:
        "Complete your purchase securely with our easy-to-use payment system.",
    },
    {
      icon: <Truck className="h-8 w-8 text-[#D4AF37]" />,
      title: "Enjoy",
      description:
        "Track your order in real-time and enjoy a delicious meal delivered to your doorstep.",
    },
  ];

  const restaurantSteps = [
    {
      icon: <Store className="h-8 w-8 text-[#D4AF37]" />,
      title: "Join",
      description:
        "Sign up as a restaurant partner and create your profile on our platform.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-[#D4AF37]" />,
      title: "Showcase",
      description:
        "Upload your menu, photos, and restaurant details to attract food enthusiasts.",
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-[#D4AF37]" />,
      title: "Receive",
      description:
        "Get orders from customers and manage them through our intuitive dashboard.",
    },
    {
      icon: <ChefHat className="h-8 w-8 text-[#D4AF37]" />,
      title: "Grow",
      description:
        "Build your brand, increase visibility, and expand your customer base through our platform.",
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 md:py-28 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className="inline-block px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm
              font-medium tracking-wider mb-6 reveal"
          >
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-serif reveal">
            Seamless Experience for Everyone
          </h2>
          <p className="text-gray-700 text-lg reveal">
            Our platform is designed to create a smooth experience for both food
            lovers and restaurant owners. Whether you're looking for your next
            meal or wanting to showcase your culinary creations, we've
            simplified the process.
          </p>
        </div>

        <div className="mb-12 flex justify-center reveal">
          <div className="bg-white rounded-full p-1 shadow-[#D4AF37] inline-flex">
            <button
              className={`px-6 py-3 rounded-full text-base font-medium transition-all cursor-pointer ${
                activeTab === "customer"
                  ? "bg-[#D4AF37] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#D4AF37]"
                }`}
              onClick={() => setActiveTab("customer")}
            >
              For Customers
            </button>
            <button
              className={`px-6 py-3 rounded-full text-base font-medium transition-all cursor-pointer ${
                activeTab === "restaurant"
                  ? "bg-[#D4AF37] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#D4AF37]"
                }`}
              onClick={() => setActiveTab("restaurant")}
            >
              For Restaurants
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {(activeTab === "customer" ? customerSteps : restaurantSteps).map(
            (step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-[#D4AF37]/50 shadow-2xl border border-gray-100
                  text-center hover:shadow-[#D4AF37] transition-all duration-300 reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6 mx-auto">
                  <div className="h-16 w-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto">
                    {step.icon}
                  </div>
                  <div
                    className="absolute top-0 right-0 h-6 w-6 bg-[#D4AF37] text-white rounded-full flex
                      items-center justify-center text-sm font-bold"
                  >
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

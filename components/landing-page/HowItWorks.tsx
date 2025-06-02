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
      title: "Découvrez",
      description:
        "Parcourez les plats et restaurants qui correspondent à vos goûts et à votre localisation.",
    },
    {
      icon: <UtensilsCrossed className="h-8 w-8 text-[#D4AF37]" />,
      title: "Choisissez",
      description:
        "Trouvez ce qui vous plaît parmi une variété de plats et personnalisez-les selon vos préférences.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-[#D4AF37]" />,
      title: "Commandez",
      description:
        "Finalisez votre commande en toute sécurité grâce à notre système de paiement simple et transparent.",
    },
    {
      icon: <Truck className="h-8 w-8 text-[#D4AF37]" />,
      title: "Savourez",
      description:
        "Suivez votre commande en temps réel et profitez d'un repas livré directement chez vous.",
    },
  ];

  const restaurantSteps = [
    {
      icon: <Store className="h-8 w-8 text-[#D4AF37]" />,
      title: "Rejoignez",
      description:
        "Inscrivez-vous en tant que partenaire et créez votre profil sur notre plateforme.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-[#D4AF37]" />,
      title: "Présentez",
      description:
        "Ajoutez votre menu, photos et informations pour attirer les amateurs de cuisine.",
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-[#D4AF37]" />,
      title: "Recevez",
      description:
        "Gérez vos commandes facilement depuis notre tableau de bord intuitif.",
    },
    {
      icon: <ChefHat className="h-8 w-8 text-[#D4AF37]" />,
      title: "Développez",
      description:
        "Construisez votre marque, augmentez votre visibilité et atteignez de nouveaux clients avec nous.",
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className="inline-block px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm
              font-medium tracking-wider mb-6 reveal"
          >
            Comment ça marche
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-serif reveal
              dark:text-white"
          >
            Une expérience simple pour tous
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg reveal">
            Notre plateforme est conçue pour simplifier la vie des amateurs de
            cuisine et des restaurateurs. Que vous cherchiez un bon repas ou que
            vous souhaitiez partager vos talents culinaires, nous avons tout
            simplifié pour vous !
          </p>
        </div>

        <div className="mb-12 flex justify-center reveal">
          <div className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-[#D4AF37] inline-flex">
            <button
              className={`px-6 py-3 rounded-full text-base font-medium transition-all cursor-pointer ${
                activeTab === "customer"
                  ? "bg-[#D4AF37] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]"
                }`}
              onClick={() => setActiveTab("customer")}
            >
              Pour les Gourmets
            </button>
            <button
              className={`px-6 py-3 rounded-full text-base font-medium transition-all cursor-pointer ${
                activeTab === "restaurant"
                  ? "bg-[#D4AF37] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]"
                }`}
              onClick={() => setActiveTab("restaurant")}
            >
              Pour les Restaurants
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {(activeTab === "customer" ? customerSteps : restaurantSteps).map(
            (step, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-[#D4AF37]/50 shadow-2xl border
                  border-gray-100 dark:border-gray-700 text-center hover:shadow-[#D4AF37]
                  transition-all duration-300 reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6 mx-auto">
                  <div
                    className="h-16 w-16 bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 rounded-full flex items-center
                      justify-center mx-auto"
                  >
                    {step.icon}
                  </div>
                  <div
                    className="absolute top-0 right-0 h-6 w-6 bg-[#D4AF37] text-white rounded-full flex
                      items-center justify-center text-sm font-bold"
                  >
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

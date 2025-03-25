import React, { useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CITIES = [
  "Tunis",
  "Sfax",
  "Sousse",
  "Kairouan",
  "Bizerte",
  "Gabès",
  "Ariana",
  "Gafsa",
  "Monastir",
  "Nabeul",
  "Kasserine",
  "Mahdia",
  "Medenine",
  "Tataouine",
  "Beja",
  "Jendouba",
  "Kef",
];

const Areas = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = CITIES.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
      id="areas"
      className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div
            className="inline-block px-4 py-1.5 mb-6 bg-[#f97415]/10 dark:bg-[#D4AF37]/20
              text-[#f97415] rounded-full font-medium text-sm"
          >
            Our Coverage
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Areas We Serve
          </h2>
          <p className="text-[#64748b] dark:text-gray-300 text-lg">
            FeastHaus is constantly expanding to bring delicious meals to more
            locations. Check if we're available in your area.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal">
          {/* Map visualization */}
          <div className="animate-fade-in order-2 lg:order-1">
            <div
              className="glass rounded-2xl overflow-hidden shadow-xl p-4 h-[450px] relative bg-white
                dark:bg-gray-800"
            >
              {/* This would be replaced with an actual map implementation */}
              <div
                className="bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80')]
                  bg-cover bg-center w-full h-full rounded-xl relative"
              >
                {/* Map pins */}
                <div className="absolute top-[30%] left-[35%] animate-pulse">
                  <div className="relative">
                    <MapPin
                      className="text-[#f97415] h-6 w-6"
                      fill="currentColor"
                    />
                    <div className="absolute -top-1 -left-1 w-8 h-8 bg-[#f97415]/20 rounded-full animate-ping"></div>
                  </div>
                </div>
                <div
                  className="absolute top-[40%] left-[75%] animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="relative">
                    <MapPin
                      className="text-[#f97415] h-6 w-6"
                      fill="currentColor"
                    />
                    <div className="absolute -top-1 -left-1 w-8 h-8 bg-[#f97415]/20 rounded-full animate-ping"></div>
                  </div>
                </div>
                <div
                  className="absolute top-[60%] left-[55%] animate-pulse"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="relative">
                    <MapPin
                      className="text-[#f97415] h-6 w-6"
                      fill="currentColor"
                    />
                    <div className="absolute -top-1 -left-1 w-8 h-8 bg-[#f97415]/20 rounded-full animate-ping"></div>
                  </div>
                </div>
                <div
                  className="absolute top-[25%] left-[85%] animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                >
                  <div className="relative">
                    <MapPin
                      className="text-[#f97415] h-6 w-6"
                      fill="currentColor"
                    />
                    <div className="absolute -top-1 -left-1 w-8 h-8 bg-[#f97415]/20 rounded-full animate-ping"></div>
                  </div>
                </div>

                {/* Map overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>

              {/* Map caption */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-[#0a0c0e] dark:text-gray-200 font-medium">
                  Serving major cities across Tunisia
                </p>
              </div>
            </div>
          </div>

          {/* City search and list */}
          <div className="animate-slide-up order-1 lg:order-2">
            <div className="mb-8">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]
                    dark:text-[#94a3b8]"
                />
                <Input
                  type="text"
                  placeholder="Search for your city..."
                  className="pl-10 py-6 text-lg bg-white dark:bg-gray-800 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="glass rounded-2xl p-6 h-[350px] overflow-auto bg-white dark:bg-gray-800">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Available Cities
              </h3>

              {filteredCities.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {filteredCities.map((city, index) => (
                    <div
                      key={city}
                      className="flex items-center p-3 rounded-lg hover:bg-[#f1f5f9]/50 dark:hover:bg-gray-700
                        transition-colors"
                    >
                      <MapPin className="text-[#f97415] h-5 w-5 mr-2" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {city}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-[#64748b] dark:text-[#94a3b8] mb-4">
                    No cities match your search.
                  </p>
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Show All Cities
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-[#64748b] dark:text-[#94a3b8] mb-4">
                Don't see your city? Let us know where you'd like us to expand
                next!
              </p>
              <Button className="cursor-pointer">Request Your Area</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Areas;

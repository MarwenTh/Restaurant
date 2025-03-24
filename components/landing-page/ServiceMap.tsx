"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

// Note: In a real project, you would use a proper map library like Mapbox, Google Maps, or Leaflet
// This is a simplified version for demonstration purposes

const ServiceMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState("New York");
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

  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Miami",
    "San Francisco",
    "Seattle",
    "Boston",
    "Austin",
    "Denver",
  ];

  return (
    <section
      id="service-areas"
      ref={sectionRef}
      className="py-20 md:py-28 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium
              tracking-wider mb-6 reveal"
          >
            SERVICE AREAS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-serif mb-6 reveal">
            We're Expanding Across America
          </h2>
          <p className="text-gray-700 text-lg reveal">
            FoodGuide is available in major cities across the United States,
            with new locations being added regularly. Check if we serve your
            area or see where we're heading next.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 order-2 md:order-1">
            <div className="bg-white rounded-lg shadow-soft p-6 reveal">
              <h3 className="text-xl font-semibold mb-4">Our Locations</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    className={`flex items-center w-full p-3 rounded-lg transition-all ${
                    selectedCity === city
                        ? "bg-gold/10 text-gold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSelectedCity(city)}
                  >
                    <MapPin
                      className={`h-5 w-5 mr-3 ${selectedCity === city ? "text-gold" : "text-gray-400"}`}
                    />
                    <span>{city}</span>
                    {selectedCity === city && (
                      <span className="ml-auto bg-gold text-white text-xs px-2 py-1 rounded-full">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-6 border-t border-gray-100 pt-6">
                <h4 className="font-medium mb-2">Coming Soon</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Philadelphia",
                    "Phoenix",
                    "San Diego",
                    "Dallas",
                    "Portland",
                  ].map((city) => (
                    <span
                      key={city}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 order-1 md:order-2 reveal">
            <div
              ref={mapRef}
              className="rounded-lg overflow-hidden shadow-soft h-[500px] relative bg-gray-200"
            >
              {/* In a real implementation, this would be replaced with an actual map component */}
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80"
                alt="Service Area Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10"></div>

              {/* City marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div
                    className="h-6 w-6 bg-gold rounded-full flex items-center justify-center animate-pulse z-20
                      relative"
                  >
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute top-0 left-0 h-6 w-6 bg-gold rounded-full opacity-30 animate-ping"></div>
                </div>
                <div className="mt-2 bg-white px-4 py-2 rounded-lg text-sm font-medium shadow-soft text-center">
                  {selectedCity}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-soft p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{selectedCity} Coverage</h3>
                <p className="text-sm text-gray-600">
                  We serve all neighborhoods in and around {selectedCity}
                </p>
              </div>
              <button
                className="bg-[#D4AF37] text-white px-6 py-3 rounded-md font-medium transition-all
                  hover:shadow-gold hover:translate-y-[-2px] text-sm py-2"
              >
                Check Your Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMap;

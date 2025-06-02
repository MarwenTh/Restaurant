"use client";
import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/site-review");
        if (!res.ok) throw new Error("Échec de la récupération des avis");
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err: any) {
        setError(err.message || "Une erreur inattendue s'est produite");
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const testimonials = reviews.length > 0 ? reviews : [];

  const goToTestimonial = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentTestimonial(index);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToPrevTestimonial = () => {
    const newIndex =
      (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    goToTestimonial(newIndex);
  };

  const goToNextTestimonial = () => {
    const newIndex = (currentTestimonial + 1) % testimonials.length;
    goToTestimonial(newIndex);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className="inline-block px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm
              font-medium tracking-wider mb-6 reveal dark:bg-[#D4AF37]/20 dark:text-[#D4AF37]"
          >
            TÉMOIGNAGES
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-6 reveal text-gray-900
              dark:text-white"
          >
            Que disent nos utilisateurs ?
          </h2>
          <p className="text-gray-700 text-lg reveal dark:text-gray-300">
            Ne nous croyez pas sur parole, découvrez ce que nos clients et
            restaurateurs qui ont essayé FoodGuide pensent de leur expérience.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-16 text-[#D4AF37] font-semibold text-xl">
              Chargement en cours...
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-500 font-semibold text-xl">
              {error}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16 text-gray-400 font-semibold text-xl">
              Aucun témoignage pour le moment.
            </div>
          ) : (
            <div
              ref={testimonialRef}
              className="bg-[#F8F8F8] dark:bg-gray-800 rounded-lg shadow-[#D4AF37]/50 shadow-2xl p-8
                md:p-12 overflow-hidden"
            >
              <div className="absolute top-8 right-8 text-[#D4AF37]/20 dark:text-[#D4AF37]/30">
                <Quote size={80} />
              </div>

              <div className="relative z-10">
                <div
                  className={`transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}
                >
                  <div className="flex items-center mb-8 reveal">
                    <div className="mr-4">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="h-16 w-16 rounded-full object-cover border-2 border-[#D4AF37]
                          dark:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {testimonials[currentTestimonial].name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {testimonials[currentTestimonial].role || "Utilisateur"}
                      </p>
                      <div className="flex mt-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${
                              index < testimonials[currentTestimonial].rating
                                ? "text-[#D4AF37] fill-[#D4AF37]"
                                : "text-gray-300 dark:text-gray-600"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg italic mb-8 reveal dark:text-gray-300">
                    "{testimonials[currentTestimonial].reviewMessage}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {testimonials.length > 0 && !loading && !error && (
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={goToPrevTestimonial}
                className="bg-white dark:bg-gray-800 shadow-[#D4AF37]/50 shadow-sm cursor-pointer h-12 w-12
                  rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300
                  hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors
                  focus:outline-none"
                aria-label="Témoignage précédent"
                disabled={isAnimating}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                    currentTestimonial === index
                        ? "bg-[#D4AF37] w-6"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    aria-label={`Aller au témoignage ${index + 1}`}
                    disabled={isAnimating}
                  />
                ))}
              </div>

              <button
                onClick={goToNextTestimonial}
                className="bg-white dark:bg-gray-800 shadow-[#D4AF37]/50 shadow-sm cursor-pointer h-12 w-12
                  rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300
                  hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors
                  focus:outline-none"
                aria-label="Témoignage suivant"
                disabled={isAnimating}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

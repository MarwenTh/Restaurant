"use client";
import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Enthusiast",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      content:
        "FoodGuide has completely transformed how I discover new restaurants. The platform is incredibly intuitive, and I love the detailed restaurant profiles that help me make informed choices. Every meal I've ordered through FoodGuide has been exceptional!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Regular Customer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      content:
        "As someone who orders takeout frequently, I can confidently say that FoodGuide offers the best selection of restaurants in my area. The ordering process is seamless, and I appreciate the real-time tracking feature that keeps me updated on my delivery status.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Food Blogger",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80",
      content:
        "I've used many food delivery platforms, but FoodGuide stands out for its commitment to quality. The restaurants featured on the platform are carefully selected, and it shows. Their customer service is also exceptional—they quickly resolved an issue I had with an order.",
      rating: 4,
    },
    {
      name: "David Park",
      role: "Restaurant Owner",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      content:
        "Joining FoodGuide has been great for our restaurant. The platform's interface is user-friendly, and we've seen a significant increase in orders since we became a partner. Their support team is responsive and helpful, making it easy to manage our online presence.",
      rating: 5,
    },
  ];

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
      className="py-20 md:py-28 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className="inline-block px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm
              font-medium tracking-wider mb-6 reveal dark:bg-[#D4AF37]/20 dark:text-[#D4AF37]"
          >
            TESTIMONIALS
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-6 reveal text-gray-900
              dark:text-white"
          >
            What Our Users Say
          </h2>
          <p className="text-gray-700 text-lg reveal dark:text-gray-300">
            Don't just take our word for it. Hear from the food enthusiasts and
            restaurant owners who have experienced the FoodGuide difference.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
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
                      {testimonials[currentTestimonial].role}
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
                  "{testimonials[currentTestimonial].content}"
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={goToPrevTestimonial}
              className="bg-white dark:bg-gray-800 shadow-[#D4AF37]/50 shadow-sm cursor-pointer h-12 w-12
                rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300
                hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors
                focus:outline-none"
              aria-label="Previous testimonial"
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
                  aria-label={`Go to testimonial ${index + 1}`}
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
              aria-label="Next testimonial"
              disabled={isAnimating}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

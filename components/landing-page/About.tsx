"use client";
import React, { useEffect } from "react";
import { Award, Users, BriefcaseBusiness, HeartHandshake } from "lucide-react";
import BlurImage from "../ui/BlurImage";
import { Button } from "@/components/ui/button";

const About = () => {
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
      id="about"
      className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden
        dark:bg-gray-900"
    >
      {/* Background elements */}
      <div
        className="absolute -z-10 top-40 right-0 w-72 h-72 bg-[#f97415]/10 rounded-full filter
          blur-3xl opacity-70 reveal dark:bg-[#f97415]/20"
      ></div>
      <div
        className="absolute -z-10 bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full filter
          blur-3xl opacity-70 reveal dark:bg-accent/20"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image collage */}
          <div className="relative animate-fade-in reveal">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <BlurImage
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt="Restaurant interior"
                aspectRatio="aspect-[4/3]"
              />
            </div>
            <div
              className="absolute top-[60%] -right-10 w-2/3 rounded-2xl overflow-hidden shadow-xl
                border-4 border-[#f8fafc] z-20 dark:border-gray-800"
            >
              <BlurImage
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt="Chef preparing food"
                aspectRatio="aspect-[3/2]"
              />
            </div>
            <div
              className="absolute -top-8 -left-8 w-1/2 rounded-2xl overflow-hidden shadow-xl border-4
                border-[#f8fafc] z-20 dark:border-gray-800"
            >
              <BlurImage
                src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1710&q=80"
                alt="Food dish closeup"
                aspectRatio="aspect-square"
              />
            </div>
          </div>

          {/* Content */}
          <div className="animate-slide-up reveal">
            <div
              className="inline-block px-4 py-1.5 mb-6 bg-[#f97415]/10 text-[#f97415] rounded-full
                font-medium text-sm dark:bg-[#f97415]/20 dark:text-[#f97415]"
            >
              Our Story
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-gray-100">
              نربطو بين الذوق العالي و محبّي الماكلة
            </h2>
            <p className="text-[#64748b] text-lg mb-6 dark:text-gray-400">
              FoodGuide جات من فكرة بسيطة: نعملو بلاصة تجمع تنوّع الماكلة و
              تخلّي أحسن الأطباق توصل للناس الكل، و في نفس الوقت نعاونوا
              الريسطوّات باش يواكبوا العصر الرقمي.
            </p>
            <p className="text-[#64748b] text-lg mb-8 dark:text-gray-400">
              تأسّسنا في 2023، و في وقت قصير ولّينا مارشي فيه طباخة مبدعين و
              ريسطوّات مجدّدة، و ناس تحب تذوق الماكلة الصحاح. الميسيون متاعنا هي
              نبدلو كيفاش الناس تكتشف، تطلب، و تتمتّع بالماكلة.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-start">
                <div className="p-3 bg-[#f97415]/10 rounded-full mr-4 dark:bg-[#f97415]/20">
                  <Award className="h-6 w-6 text-[#f97415]" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 dark:text-gray-100">
                    الجودة قبل كل شيء
                  </h4>
                  <p className="text-[#64748b] text-sm dark:text-gray-400">
                    ✦ ما نقبلو كان الريسطوّات اللي عندهم ستاندار عالي
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-[#f97415]/10 rounded-full mr-4 dark:bg-[#f97415]/20">
                  <Users className="h-6 w-6 text-[#f97415]" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 dark:text-gray-100">
                    مجتمعنا هو القائد
                  </h4>
                  <p className="text-[#64748b] text-sm dark:text-gray-400">
                    ✦ نسمعو للطباخة و الحرفاء و نطوّرو مع بعضنا
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-[#f97415]/10 rounded-full mr-4 dark:bg-[#f97415]/20">
                  <BriefcaseBusiness className="h-6 w-6 text-[#f97415]" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 dark:text-gray-100">
                    نكبّرو البيزنس المحلي
                  </h4>
                  <p className="text-[#64748b] text-sm dark:text-gray-400">
                    ✦ نعاونوا الريسطوّات باش يوصلو لأكثر ناس
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-[#f97415]/10 rounded-full mr-4 dark:bg-[#f97415]/20">
                  <HeartHandshake className="h-6 w-6 text-[#f97415]" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 dark:text-gray-100">
                    شراكة بالنية
                  </h4>
                  <p className="text-[#64748b] text-sm dark:text-gray-400">
                    ✦ أسعار واضحة و علاقة فيها الإنصاف
                  </p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="cursor-pointer reveal dark:bg-[#f97415] dark:text-white dark:hover:bg-[#f65e00]"
            >
              تعرف علينا أكثر
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

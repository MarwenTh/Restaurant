"use client";
import React from "react";
import { Award, Users, BriefcaseBusiness, HeartHandshake } from "lucide-react";
import BlurImage from "../ui/BlurImage";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section
      id="about"
      className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Background elements */}
      <div
        className="absolute -z-10 top-40 right-0 w-72 h-72 bg-[#f97415]/10 rounded-full filter
          blur-3xl opacity-70"
      ></div>
      <div
        className="absolute -z-10 bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full filter
          blur-3xl opacity-70"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image collage */}
          <div className="relative animate-fade-in">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <BlurImage
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt="Restaurant interior"
                aspectRatio="aspect-[4/3]"
              />
            </div>
            <div
              className="absolute top-[60%] -right-10 w-2/3 rounded-2xl overflow-hidden shadow-xl
                border-4 border-[#f8fafc] z-20"
            >
              <BlurImage
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt="Chef preparing food"
                aspectRatio="aspect-[3/2]"
              />
            </div>
            <div
              className="absolute -top-8 -left-8 w-1/2 rounded-2xl overflow-hidden shadow-xl border-4
                border-[#f8fafc] z-20"
            >
              <BlurImage
                src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1710&q=80"
                alt="Food dish closeup"
                aspectRatio="aspect-square"
              />
            </div>
          </div>

          {/* Content */}
          <div className="animate-slide-up">
            <div
              className="inline-block px-4 py-1.5 mb-6 bg-[#f97415]/10 text-[#f97415] rounded-full
                font-medium text-sm"
            >
              Our Story
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Connecting Culinary Excellence with Food Enthusiasts
            </h2>
            <p className="text-[#64748b] text-lg mb-6">
              FoodGuide was born from a simple idea: to create a platform that
              celebrates culinary diversity and makes exceptional food
              accessible to everyone, while helping restaurants thrive in the
              digital age.
            </p>
            <p className="text-[#64748b] text-lg mb-8">
              Founded in 2023, we've quickly grown into a vibrant marketplace
              connecting talented chefs and innovative restaurants with food
              lovers seeking authentic culinary experiences. Our mission is to
              transform the way people discover, order, and enjoy food.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-start">
                <div className="p-3 bg-[#f97415]/10 rounded-full mr-4">
                  <Award className="h-6 w-6 text-[#f97415]" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Quality First</h4>
                  <p className="text-[#64748b] text-sm">
                    Only vetted restaurants with exceptional standards
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-[#f97415]/10 rounded-full mr-4">
                  <Users className="h-6 w-6 text-[#f97415]" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Community Driven</h4>
                  <p className="text-[#64748b] text-sm">
                    Built on feedback from chefs and customers alike
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-[#f97415]/10 rounded-full mr-4">
                  <BriefcaseBusiness className="h-6 w-6 text-[#f97415]" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Business Growth</h4>
                  <p className="text-[#64748b] text-sm">
                    Helping local restaurants reach new customers
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-[#f97415]/10 rounded-full mr-4">
                  <HeartHandshake className="h-6 w-6 text-[#f97415]" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Fair Partnership</h4>
                  <p className="text-[#64748b] text-sm">
                    Transparent pricing and equitable relationships
                  </p>
                </div>
              </div>
            </div>

            <Button size="lg" className="cursor-pointer">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

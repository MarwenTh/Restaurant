"use client";
import {
  ChevronDown,
  Clock,
  Filter,
  Search,
  ShoppingBag,
  Star,
} from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { SiIfood } from "react-icons/si";

type Props = {};

const Header = (props: Props) => {
  return (
    <main>
      <Link
        href="/"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 mx-7 pt-7
          relative z-20"
      >
        <SiIfood className="h-10 w-10 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
        <span className="font-medium text-black dark:text-white whitespace-pre text-lg">
          FoodGuide
        </span>
      </Link>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div
            className="bg-gradient-to-r from-[#D4AF37]/10 to-amber-50 rounded-xl p-8 md:p-12 shadow-md
              relative overflow-hidden"
          >
            <div
              className="absolute inset-0
                bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=60')]
                opacity-10 bg-cover bg-center"
            ></div>
            <div className="relative z-10">
              <h1
                className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gradient-to-r from-[#D4AF37]
                  to-amber-600 animate-fade-in"
              >
                Discover Delicious Food
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl animate-fade-in">
                Order from the best local restaurants with easy, on-demand
                delivery right to your door.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-5 w-5 text-[#D4AF37]" />
                  <Input
                    placeholder="Search for food, restaurants, cuisines..."
                    className="pl-12 py-6 text-base border-[#D4AF37]/20 focus:border-[#D4AF37]
                      focus:ring-[#D4AF37]/30 shadow-sm bg-white/80 backdrop-blur-sm"
                    //   value={searchQuery}
                    //   onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex gap-2 py-6 border-[#D4AF37]/20 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]
                        cursor-pointer"
                    >
                      <Filter className="h-5 w-5" />
                      <span className="text-base">Filters</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <Star className="h-4 w-4 mr-2 text-[#D4AF37]" />
                      Rating: 4+ stars
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Clock className="h-4 w-4 mr-2 text-[#D4AF37]" />
                      Delivery time: Under 30 min
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ShoppingBag className="h-4 w-4 mr-2 text-[#D4AF37]" />
                      Price: Under $15
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Header;

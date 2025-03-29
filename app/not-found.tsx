"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, UtensilsCrossed } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  const pathname = usePathname();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(to right, rgba(26, 26, 26, 0.85), rgba(26, 26, 26, 0.75)), 
                    url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/40"></div>

      <div className="text-center max-w-md z-10 px-4">
        <div className="mb-6 flex justify-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping"></div>
            <div className="relative bg-orange-500/90 rounded-full p-6 shadow-lg">
              <UtensilsCrossed size={80} className="text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-8xl font-bold text-[#FF9F43] mb-2">404</h1>
        <p className="text-2xl font-medium text-orange-200 mt-4 mb-6">
          Oops! Page not found
        </p>
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto cursor-pointer border-orange-400 text-orange-600
              hover:bg-orange-900/30 hover:text-orange-100"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </Button>
          <Button
            asChild
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Link href="/">
              <Home size={16} className="mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="mt-12 flex justify-center space-x-4">
          <div className="w-16 h-1 bg-orange-500/50 rounded-full"></div>
          <div className="w-8 h-1 bg-orange-500/30 rounded-full"></div>
          <div className="w-4 h-1 bg-orange-500/20 rounded-full"></div>
        </div>
      </div>

      {/* Decorative food elements */}
      <div className="absolute -bottom-6 -left-6 w-32 h-32 opacity-20 rotate-12">
        <Image
          src="/placeholder.svg?height=128&width=128"
          width={128}
          height={128}
          alt=""
          className="object-contain"
        />
      </div>
      <div className="absolute -top-6 -right-6 w-32 h-32 opacity-20 -rotate-12">
        <Image
          src="/placeholder.svg?height=128&width=128"
          width={128}
          height={128}
          alt=""
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default NotFound;

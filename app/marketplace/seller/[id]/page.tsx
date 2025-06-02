"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  ShoppingBag,
  Clock,
  Phone,
  Globe,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FoodCarousel from "@/components/marketplace/FoodCarousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ReservationForm from "@/components/marketplace/ReservationForm";

interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
  _id: string;
}

interface Seller {
  _id: string;
  name: string;
  image: string;
  description?: string;
  cuisine?: string[];
  rating?: number;
  address?: {
    city: string;
    state: string;
    street: string;
    zipCode: string;
  };
  priceRange?: "low" | "medium" | "high";
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  businessHours?: BusinessHours[];
}

const SellerProfile = () => {
  const params = useParams();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState([]);

  // Helper function to format time in AM/PM
  const formatTime = (time: string) => {
    try {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    } catch (error) {
      return time; // Return original time if parsing fails
    }
  };

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await fetch(`/api/sellers/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch seller data");
        }
        const data = await response.json();
        setSeller(data.seller);

        // Fetch seller's menu items
        const menuResponse = await fetch(`/api/menu-item?seller=${params.id}`);
        if (menuResponse.ok) {
          const menuData = await menuResponse.json();
          setMenuItems(menuData.menuItems);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch seller data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="text-red-500">Error: {error || "Seller not found"}</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/marketplace">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={seller.image} alt={seller.name} />
                <AvatarFallback className="text-2xl bg-gold/10 text-gold">
                  {seller.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {seller.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-gold fill-gold" />
                        <span className="ml-1 font-semibold">
                          {seller.rating || "New"}
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-gold/10 text-gold border-gold/20"
                      >
                        {seller.priceRange || "Medium"} Price Range
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {seller.contactInfo?.phone && (
                      <a
                        href={`tel:${seller.contactInfo.phone}`}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Phone className="h-5 w-5 text-gray-600" />
                      </a>
                    )}
                    {seller.contactInfo?.website && (
                      <a
                        href={seller.contactInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Globe className="h-5 w-5 text-gray-600" />
                      </a>
                    )}
                    {seller.contactInfo?.email && (
                      <a
                        href={`mailto:${seller.contactInfo.email}`}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Mail className="h-5 w-5 text-gray-600" />
                      </a>
                    )}
                  </div>
                </div>
                {seller.address && (
                  <p className="flex items-center text-gray-600 mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {seller.address.street}, {seller.address.city},{" "}
                    {seller.address.state} {seller.address.zipCode}
                  </p>
                )}
                <ReservationForm sellerId={seller._id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="menu" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-lg shadow-sm">
              <TabsTrigger value="menu" className="rounded-md">
                Menu
              </TabsTrigger>
              <TabsTrigger value="about" className="rounded-md">
                About
              </TabsTrigger>
              <TabsTrigger value="hours" className="rounded-md">
                Hours
              </TabsTrigger>
            </TabsList>

            <TabsContent value="menu" className="space-y-6">
              {menuItems.length > 0 ? (
                <FoodCarousel
                  title="Menu Items"
                  items={menuItems}
                  showSeeMore={false}
                />
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    No menu items available yet.
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="about">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">About</h3>
                      <p className="text-gray-600">
                        {seller.description || "No description available."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hours">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
                  <div className="space-y-2">
                    {seller.businessHours && seller.businessHours.length > 0 ? (
                      seller.businessHours.map((hours) => (
                        <div
                          key={hours._id}
                          className="flex justify-between items-center py-2 border-b last:border-0"
                        >
                          <span className="font-medium capitalize">
                            {hours.day}
                          </span>
                          <span className="text-gray-600">
                            {hours.isClosed
                              ? "Closed"
                              : `${formatTime(hours.open)} - ${formatTime(hours.close)}`}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        Business hours not available.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Save, Upload, LogOut } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import useUser from "@/hooks/useUser";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa6";
import { HashLoader } from "react-spinners";

const UserSettings = () => {
  const { user, loading, error, refetch } = useUser();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cuisine: [] as string[],
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    contactInfo: {
      phone: "",
      email: "",
      website: "",
    },
    businessHours: [
      {
        day: "Monday",
        open: "09:00",
        close: "17:00",
        isClosed: false,
      },
      {
        day: "Tuesday",
        open: "09:00",
        close: "17:00",
        isClosed: false,
      },
      {
        day: "Wednesday",
        open: "09:00",
        close: "17:00",
        isClosed: false,
      },
      {
        day: "Thursday",
        open: "09:00",
        close: "17:00",
        isClosed: false,
      },
      {
        day: "Friday",
        open: "09:00",
        close: "17:00",
        isClosed: false,
      },
      {
        day: "Saturday",
        open: "10:00",
        close: "15:00",
        isClosed: false,
      },
      {
        day: "Sunday",
        open: "10:00",
        close: "15:00",
        isClosed: true,
      },
    ],
    priceRange: "medium" as "low" | "medium" | "high",
    deliveryOptions: {
      delivery: true,
      pickup: true,
      dineIn: true,
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        description: user.description || "",
        cuisine: user.cuisine || [],
        address: user.address || {
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
        contactInfo: {
          phone: user.contactInfo?.phone || "",
          email: user.email || "",
          website: user.contactInfo?.website || "",
        },
        businessHours: user.businessHours || formData.businessHours,
        priceRange: user.priceRange || "medium",
        deliveryOptions: user.deliveryOptions || {
          delivery: true,
          pickup: true,
          dineIn: true,
        },
      });
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, any>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleBusinessHoursChange = (
    index: number,
    field: string,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      businessHours: prev.businessHours.map((hour, i) =>
        i === index ? { ...hour, [field]: value } : hour,
      ),
    }));
  };

  const handleDeliveryOptionChange = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      deliveryOptions: {
        ...prev.deliveryOptions,
        [option]:
          !prev.deliveryOptions[option as keyof typeof prev.deliveryOptions],
      },
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      await handleSubmit({ image: data.url });
      toast.success("Profile picture updated successfully");
    } catch (error) {
      toast.error("Failed to upload profile picture");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (additionalData = {}) => {
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, ...additionalData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      toast.success(data.message || "Profile updated successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-80px)] flex justify-center items-center">
        <HashLoader color="#ff6b00" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <Button
          variant="outline"
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 overflow-hidden rounded-full border bg-[#f1f5f9]">
                  <img
                    src={
                      user?.image ||
                      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <FaSpinner
                        className="animate-spin text-white"
                        size={24}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="mb-2"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {uploading ? "Uploading..." : "Change"}
                  </Button>
                  <p className="text-xs text-[#64748b]">
                    JPG, PNG or GIF. 1MB max.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="contactInfo.email"
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="contactInfo.phone"
                  type="tel"
                  value={formData.contactInfo.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="contactInfo.website"
                  type="url"
                  value={formData.contactInfo.website}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button onClick={() => handleSubmit()}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Update your restaurant details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                className="min-h-32"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="street">Address</Label>
                <Input
                  id="street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Business Hours</Label>
              <div className="space-y-3">
                {formData.businessHours.map((hours, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="font-medium">{hours.day}</div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={hours.open}
                        onChange={(e) =>
                          handleBusinessHoursChange(
                            index,
                            "open",
                            e.target.value,
                          )
                        }
                        className="w-32"
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={hours.close}
                        onChange={(e) =>
                          handleBusinessHoursChange(
                            index,
                            "close",
                            e.target.value,
                          )
                        }
                        className="w-32"
                      />
                      <Switch
                        checked={!hours.isClosed}
                        onCheckedChange={(checked) =>
                          handleBusinessHoursChange(index, "isClosed", !checked)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Delivery Options</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Delivery</Label>
                  <Switch
                    checked={formData.deliveryOptions.delivery}
                    onCheckedChange={() =>
                      handleDeliveryOptionChange("delivery")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Pickup</Label>
                  <Switch
                    checked={formData.deliveryOptions.pickup}
                    onCheckedChange={() => handleDeliveryOptionChange("pickup")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Dine-in</Label>
                  <Switch
                    checked={formData.deliveryOptions.dineIn}
                    onCheckedChange={() => handleDeliveryOptionChange("dineIn")}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Price Range</Label>
              <div className="flex gap-2">
                <Button
                  variant={
                    formData.priceRange === "low" ? "default" : "outline"
                  }
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      priceRange: "low",
                    }))
                  }
                >
                  Low
                </Button>
                <Button
                  variant={
                    formData.priceRange === "medium" ? "default" : "outline"
                  }
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      priceRange: "medium",
                    }))
                  }
                >
                  Medium
                </Button>
                <Button
                  variant={
                    formData.priceRange === "high" ? "default" : "outline"
                  }
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      priceRange: "high",
                    }))
                  }
                >
                  High
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button onClick={() => handleSubmit()}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserSettings;

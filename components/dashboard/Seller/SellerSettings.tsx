"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Bell,
  CreditCard,
  Globe,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  Smartphone,
  Upload,
  User,
} from "lucide-react";

const SellerSettings: React.FC = () => {
  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  const [coverImage, setCoverImage] = useState("/placeholder.svg");

  return (
    <div>
      <div className="animate-fade-in">
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="md:w-64 lg:w-72">
              <CardContent className="p-4">
                <div className="space-y-1 py-2">
                  <h3 className="text-sm font-medium">Settings</h3>
                  <TabsList
                    className="flex flex-col items-stretch mt-2 bg-transparent justify-start h-auto p-0
                      space-y-1"
                  >
                    <TabsTrigger
                      value="profile"
                      className="justify-start h-9 px-3 data-[state=active]:bg-muted"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="business"
                      className="justify-start h-9 px-3 data-[state=active]:bg-muted"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Business Info
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="justify-start h-9 px-3 data-[state=active]:bg-muted"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="payments"
                      className="justify-start h-9 px-3 data-[state=active]:bg-muted"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payments
                    </TabsTrigger>
                    <TabsTrigger
                      value="security"
                      className="justify-start h-9 px-3 data-[state=active]:bg-muted"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Security
                    </TabsTrigger>
                  </TabsList>
                </div>
                <div className="border-t pt-4 mt-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex-1">
              <TabsContent value="profile" className="mt-0">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                      Manage your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 overflow-hidden rounded-full border bg-muted">
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Button size="sm" variant="outline" className="mb-2">
                            <Upload className="mr-2 h-4 w-4" />
                            Change
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG or GIF. 1MB max.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="Mario" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Rossi" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="mario@italianbistro.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="business" className="mt-0">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                    <CardDescription>
                      Update your restaurant details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Cover Image</Label>
                      <div className="w-full h-32 rounded-md border bg-muted overflow-hidden relative">
                        <img
                          src={coverImage}
                          alt="Restaurant"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/80 hover:bg-white"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="restaurant-name">Restaurant Name</Label>
                      <Input
                        id="restaurant-name"
                        defaultValue="Mario's Italian Bistro"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="restaurant-description">
                        Description
                      </Label>
                      <Textarea
                        id="restaurant-description"
                        className="min-h-32"
                        defaultValue="Authentic Italian cuisine prepared with love and tradition. Serving the community since 1998 with family recipes passed down through generations."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cuisine-types">Cuisine Types</Label>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          className="px-3 py-1 bg-food-orange/20 text-food-orange hover:bg-food-orange/30
                            cursor-pointer"
                        >
                          Italian
                        </Badge>
                        <Badge className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer">
                          Mediterranean
                        </Badge>
                        <Badge className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer">
                          Vegetarian
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 text-xs"
                        >
                          + Add Cuisine
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="123 Main Street" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="New York" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" defaultValue="NY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" defaultValue="10001" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Business Hours</Label>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">Monday - Friday</div>
                          <div>11:00 AM - 10:00 PM</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-food-blue"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-medium">Saturday</div>
                          <div>10:00 AM - 11:00 PM</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-food-blue"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-medium">Sunday</div>
                          <div>12:00 PM - 9:00 PM</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-food-blue"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">New Orders</h3>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-gray-400" />
                          <Label htmlFor="push-new-order" className="flex-1">
                            Push notifications
                          </Label>
                        </div>
                        <Switch id="push-new-order" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <Label htmlFor="email-new-order" className="flex-1">
                            Email notifications
                          </Label>
                        </div>
                        <Switch id="email-new-order" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <Label htmlFor="sms-new-order" className="flex-1">
                            SMS notifications
                          </Label>
                        </div>
                        <Switch id="sms-new-order" defaultChecked />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Reviews & Ratings</h3>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-gray-400" />
                          <Label htmlFor="push-reviews" className="flex-1">
                            Push notifications
                          </Label>
                        </div>
                        <Switch id="push-reviews" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <Label htmlFor="email-reviews" className="flex-1">
                            Email notifications
                          </Label>
                        </div>
                        <Switch id="email-reviews" defaultChecked />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">
                        Marketing & Promotions
                      </h3>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div className="flex-1">
                            <Label htmlFor="email-marketing" className="block">
                              Email notifications
                            </Label>
                            <p className="text-xs text-gray-500">
                              Receive tips, updates and offers
                            </p>
                          </div>
                        </div>
                        <Switch id="email-marketing" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="mt-0">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-500 text-white p-2 rounded">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-500">
                              Expires 12/2025
                            </p>
                          </div>
                        </div>
                        <Badge>Primary</Badge>
                      </div>

                      <div className="rounded-lg border p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-red-500 text-white p-2 rounded">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Mastercard ending in 8353
                            </p>
                            <p className="text-sm text-gray-500">
                              Expires 08/2024
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Set as Primary
                        </Button>
                      </div>

                      <Button variant="outline" className="w-full mt-4">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>
                      Manage your billing address
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium">Business Address</p>
                            <p className="text-sm text-gray-500">
                              Mario's Italian Bistro
                              <br />
                              123 Main Street
                              <br />
                              New York, NY 10001
                              <br />
                              United States
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-medium">Tax Information</p>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Business Type</p>
                          <p className="text-sm">LLC</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tax ID</p>
                          <p className="text-sm">XX-XXXXXXX</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      View Billing History
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-0">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button>Update Password</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-gray-400" />
                        <div className="flex-1">
                          <Label htmlFor="two-factor" className="block">
                            Two-factor authentication
                          </Label>
                          <p className="text-xs text-gray-500">
                            Secure your account with 2FA
                          </p>
                        </div>
                      </div>
                      <Switch id="two-factor" />
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-gray-400" />
                        <div className="flex-1">
                          <Label htmlFor="sms-auth" className="block">
                            SMS Authentication
                          </Label>
                          <p className="text-xs text-gray-500">
                            Use your phone as an authentication method
                          </p>
                        </div>
                      </div>
                      <Switch id="sms-auth" />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button variant="outline">Security Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerSettings;

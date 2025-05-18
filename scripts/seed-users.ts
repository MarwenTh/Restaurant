import "dotenv/config";
import { connectToDatabase } from "../lib/database";
import User from "../lib/database/models/user.model";
import bcrypt from "bcrypt";

// Helper function to hash passwords
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const users = [
  // Admin User
  {
    email: "admin@foodmarket.com",
    password: "admin123", // Will be hashed
    name: "Admin User",
    role: "Admin",
    verified: true,
    isActive: true,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
  },

  // Regular Clients
  {
    email: "john.doe@example.com",
    password: "client123",
    name: "John Doe",
    role: "Client",
    verified: true,
    isActive: true,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
  },
  {
    email: "jane.smith@example.com",
    password: "client123",
    name: "Jane Smith",
    role: "Client",
    verified: true,
    isActive: true,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    address: {
      street: "456 Park Ave",
      city: "New York",
      state: "NY",
      zipCode: "10022",
    },
  },

  // Sellers (Restaurants)
  {
    email: "italian.restaurant@example.com",
    password: "seller123",
    name: "Mamma Mia Italian",
    role: "Seller",
    verified: true,
    isActive: true,
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
    description: "Authentic Italian cuisine with a modern twist",
    cuisine: ["Italian Cuisine", "Mediterranean", "Pizza"],
    location: {
      type: "Point",
      coordinates: [-73.935242, 40.73061], // NYC coordinates
    },
    contactInfo: {
      phone: "+1 (212) 555-0123",
      email: "italian.restaurant@example.com",
      website: "www.mammamiaitalian.com",
    },
    businessHours: [
      { day: "Monday", open: "11:00", close: "22:00", isClosed: false },
      { day: "Tuesday", open: "11:00", close: "22:00", isClosed: false },
      { day: "Wednesday", open: "11:00", close: "22:00", isClosed: false },
      { day: "Thursday", open: "11:00", close: "22:00", isClosed: false },
      { day: "Friday", open: "11:00", close: "23:00", isClosed: false },
      { day: "Saturday", open: "11:00", close: "23:00", isClosed: false },
      { day: "Sunday", open: "11:00", close: "22:00", isClosed: false },
    ],
    priceRange: "medium",
    averageRating: 4.5,
    deliveryOptions: {
      delivery: true,
      pickup: true,
      dineIn: true,
    },
  },
  {
    email: "asian.fusion@example.com",
    password: "seller123",
    name: "East Meets West",
    role: "Seller",
    verified: true,
    isActive: true,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
    description: "Contemporary Asian fusion cuisine",
    cuisine: ["Asian Fusion", "Japanese", "Thai"],
    location: {
      type: "Point",
      coordinates: [-73.985242, 40.75061], // NYC coordinates
    },
    contactInfo: {
      phone: "+1 (212) 555-0124",
      email: "asian.fusion@example.com",
      website: "www.eastmeetswest.com",
    },
    businessHours: [
      { day: "Monday", open: "11:30", close: "22:30", isClosed: false },
      { day: "Tuesday", open: "11:30", close: "22:30", isClosed: false },
      { day: "Wednesday", open: "11:30", close: "22:30", isClosed: false },
      { day: "Thursday", open: "11:30", close: "22:30", isClosed: false },
      { day: "Friday", open: "11:30", close: "23:30", isClosed: false },
      { day: "Saturday", open: "11:30", close: "23:30", isClosed: false },
      { day: "Sunday", open: "11:30", close: "22:30", isClosed: false },
    ],
    priceRange: "high",
    averageRating: 4.7,
    deliveryOptions: {
      delivery: true,
      pickup: true,
      dineIn: true,
    },
  },

  // Delivery Personnel
  {
    email: "delivery1@example.com",
    password: "delivery123",
    name: "Mike Johnson",
    role: "Delivery",
    verified: true,
    isActive: true,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    address: {
      street: "789 Delivery St",
      city: "New York",
      state: "NY",
      zipCode: "10003",
    },
  },
  {
    email: "delivery2@example.com",
    password: "delivery123",
    name: "Sarah Williams",
    role: "Delivery",
    verified: true,
    isActive: true,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
    address: {
      street: "321 Courier Ave",
      city: "New York",
      state: "NY",
      zipCode: "10004",
    },
  },
];

async function seedUsers() {
  try {
    await connectToDatabase();

    // Hash passwords before inserting
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password),
      })),
    );

    const result = await User.insertMany(usersWithHashedPasswords);
    console.log(`Successfully seeded ${result.length} users`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
}

seedUsers();

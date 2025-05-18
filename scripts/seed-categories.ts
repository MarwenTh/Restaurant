import "dotenv/config";
import { connectToDatabase } from "../lib/database";
import Category from "../lib/database/models/categories.model";

const categories = [
  {
    name: "Italian Cuisine",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Asian Fusion",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Mediterranean",
    image:
      "https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Mexican",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Indian",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "American",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Japanese",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Thai",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Vegetarian",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Seafood",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Vegan",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "BBQ & Grill",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Bakery",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Breakfast & Brunch",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Desserts",
    image:
      "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Burgers",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Sushi",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Middle Eastern",
    image:
      "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "French",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Chinese",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Healthy",
    image:
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?q=80&w=1000&auto=format&fit=crop",
  },
];

async function seedCategories() {
  try {
    await connectToDatabase();

    // Clear existing categories
    await Category.deleteMany({});

    // Insert new categories
    const result = await Category.insertMany(categories);

    console.log(`Successfully seeded ${result.length} categories`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
}

seedCategories();

import "dotenv/config";
import { connectToDatabase } from "../lib/database";
import MenuItem from "../lib/database/models/menuItem.model";

const sellerIds = {
  seller1: "682391e6c15df9c5e97b5628",
  seller2: "68239201c15df9c5e97b562b",
};

const menuItems = [
  // Seller 1 Items (Italian & Mediterranean Restaurant)
  {
    name: "Margherita Pizza",
    seller: sellerIds.seller1,
    description:
      "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
    price: 12.99,
    category: ["Italian Cuisine", "Pizza"],
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Basil"],
    status: "available",
    isAvailable: true,
    popularity: 90,
    preparationTime: 20,
    discount: 10,
    isDiscounted: true,
    dietaryInfo: { isVegetarian: true, isVegan: false, isGlutenFree: false },
  },
  {
    name: "Falafel Wrap",
    seller: sellerIds.seller1,
    description:
      "Crispy falafel with fresh veggies and tahini sauce in a wrap.",
    price: 8.5,
    category: ["Middle Eastern", "Vegetarian"],
    image:
      "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["Falafel", "Lettuce", "Tomato", "Tahini Sauce", "Wrap"],
    status: "available",
    isAvailable: true,
    popularity: 60,
    preparationTime: 10,
    discount: 0,
    isDiscounted: false,
    dietaryInfo: { isVegetarian: true, isVegan: true, isGlutenFree: false },
  },
  {
    name: "Caesar Salad",
    seller: sellerIds.seller1,
    description:
      "Crisp romaine lettuce, parmesan, croutons, and Caesar dressing.",
    price: 9.5,
    category: ["Healthy", "Vegetarian"],
    image:
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["Romaine Lettuce", "Parmesan", "Croutons", "Caesar Dressing"],
    status: "available",
    isAvailable: true,
    popularity: 65,
    preparationTime: 8,
    discount: 0,
    isDiscounted: false,
    dietaryInfo: { isVegetarian: true, isVegan: false, isGlutenFree: false },
  },
  {
    name: "Mediterranean Platter",
    seller: sellerIds.seller1,
    description: "Assortment of hummus, baba ganoush, olives, and pita bread.",
    price: 14.99,
    category: ["Mediterranean", "Vegetarian"],
    image:
      "https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["Hummus", "Baba Ganoush", "Olives", "Pita Bread", "Feta"],
    status: "available",
    isAvailable: true,
    popularity: 75,
    preparationTime: 15,
    discount: 5,
    isDiscounted: true,
    dietaryInfo: { isVegetarian: true, isVegan: false, isGlutenFree: false },
  },
  {
    name: "Pasta Carbonara",
    seller: sellerIds.seller1,
    description: "Creamy pasta with pancetta, egg, and parmesan cheese.",
    price: 13.99,
    category: ["Italian Cuisine"],
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["Spaghetti", "Pancetta", "Egg", "Parmesan", "Black Pepper"],
    status: "available",
    isAvailable: true,
    popularity: 85,
    preparationTime: 18,
    discount: 0,
    isDiscounted: false,
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: false },
  },
  {
    name: "Tiramisu",
    seller: sellerIds.seller1,
    description:
      "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.",
    price: 7.99,
    category: ["Desserts", "Italian Cuisine"],
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["Ladyfingers", "Mascarpone", "Coffee", "Cocoa Powder"],
    status: "available",
    isAvailable: true,
    popularity: 88,
    preparationTime: 10,
    discount: 0,
    isDiscounted: false,
    dietaryInfo: { isVegetarian: true, isVegan: false, isGlutenFree: false },
  },

  // Seller 2 Items (Asian Fusion & Sushi Restaurant)
  {
    name: "Sushi Platter",
    seller: sellerIds.seller2,
    description: "Assorted sushi rolls with fresh fish and vegetables.",
    price: 18.5,
    category: ["Japanese", "Seafood"],
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["Rice", "Nori", "Salmon", "Tuna", "Avocado"],
    status: "available",
    isAvailable: true,
    popularity: 80,
    preparationTime: 25,
    discount: 0,
    isDiscounted: false,
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: false },
  },
  {
    name: "Pad Thai",
    seller: sellerIds.seller2,
    description:
      "Stir-fried rice noodles with shrimp, tofu, peanuts, and lime.",
    price: 13.25,
    category: ["Thai", "Asian Fusion"],
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["Rice Noodles", "Shrimp", "Tofu", "Peanuts", "Lime"],
    status: "available",
    isAvailable: true,
    popularity: 75,
    preparationTime: 18,
    discount: 0,
    isDiscounted: false,
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: false },
  },
  {
    name: "Vegan Buddha Bowl",
    seller: sellerIds.seller2,
    description:
      "A nourishing bowl with quinoa, chickpeas, avocado, and veggies.",
    price: 10.0,
    category: ["Vegan", "Healthy"],
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["Quinoa", "Chickpeas", "Avocado", "Spinach", "Carrots"],
    status: "available",
    isAvailable: true,
    popularity: 70,
    preparationTime: 15,
    discount: 5,
    isDiscounted: true,
    dietaryInfo: { isVegetarian: true, isVegan: true, isGlutenFree: true },
  },
  {
    name: "Ramen Bowl",
    seller: sellerIds.seller2,
    description:
      "Traditional Japanese ramen with rich broth, noodles, and toppings.",
    price: 14.99,
    category: ["Japanese", "Asian Fusion"],
    image:
      "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["Noodles", "Pork Broth", "Chashu", "Egg", "Green Onions"],
    status: "available",
    isAvailable: true,
    popularity: 85,
    preparationTime: 20,
    discount: 0,
    isDiscounted: false,
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: false },
  },
  {
    name: "Dumplings",
    seller: sellerIds.seller2,
    description: "Steamed dumplings filled with pork and vegetables.",
    price: 8.99,
    category: ["Asian Fusion"],
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["Dumpling Wrapper", "Pork", "Cabbage", "Ginger", "Soy Sauce"],
    status: "available",
    isAvailable: true,
    popularity: 82,
    preparationTime: 12,
    discount: 0,
    isDiscounted: false,
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: false },
  },
  {
    name: "Mango Sticky Rice",
    seller: sellerIds.seller2,
    description:
      "Sweet Thai dessert with sticky rice, fresh mango, and coconut cream.",
    price: 6.99,
    category: ["Desserts", "Thai"],
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["Sticky Rice", "Mango", "Coconut Cream", "Sugar"],
    status: "available",
    isAvailable: true,
    popularity: 68,
    preparationTime: 10,
    discount: 0,
    isDiscounted: false,
    dietaryInfo: { isVegetarian: true, isVegan: true, isGlutenFree: true },
  },
];

async function seedMenuItems() {
  try {
    await connectToDatabase();
    await MenuItem.deleteMany({});
    const result = await MenuItem.insertMany(menuItems);
    console.log(`Successfully seeded ${result.length} menu items`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding menu items:", error);
    process.exit(1);
  }
}

seedMenuItems();

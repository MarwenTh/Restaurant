import "dotenv/config";
import { connectToDatabase } from "../lib/database";
import Promo from "../lib/database/models/promo.model";

const promos = [
  {
    code: "WELCOME10",
    discount: 10,
    available: true,
  },
  {
    code: "FIRSTORDER",
    discount: 15,
    available: true,
  },
  {
    code: "SUMMER25",
    discount: 25,
    available: true,
  },
  {
    code: "FOODIE20",
    discount: 20,
    available: true,
  },
  {
    code: "SAVE30",
    discount: 30,
    available: true,
  },
  {
    code: "WEEKEND15",
    discount: 15,
    available: true,
  },
  {
    code: "NEWUSER",
    discount: 20,
    available: true,
  },
  {
    code: "SPECIAL50",
    discount: 50,
    available: false, // This one is already used
  },
  {
    code: "HOLIDAY25",
    discount: 25,
    available: true,
  },
  {
    code: "LOYALTY10",
    discount: 10,
    available: true,
  },
  {
    code: "BIRTHDAY20",
    discount: 20,
    available: true,
  },
  {
    code: "FLASH30",
    discount: 30,
    available: false, // This one is already used
  },
  {
    code: "FAMILY15",
    discount: 15,
    available: true,
  },
  {
    code: "DINNER20",
    discount: 20,
    available: true,
  },
  {
    code: "LUNCH10",
    discount: 10,
    available: true,
  },
];

async function seedPromos() {
  try {
    await connectToDatabase();
    await Promo.deleteMany({});
    const result = await Promo.insertMany(promos);
    console.log(`Successfully seeded ${result.length} promo codes`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding promo codes:", error);
    process.exit(1);
  }
}

seedPromos();

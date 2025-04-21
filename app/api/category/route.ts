import { connectToDatabase, disconnectFromDatabase } from "@/lib/database";
import Category from "@/lib/database/models/categories.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const category = await Category.find();

    const totalCategories = category.length;

    return NextResponse.json({ category, totalCategories }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    await connectToDatabase();
    const category = await Category.create({ name });
    await disconnectFromDatabase();
    return NextResponse.json({ category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

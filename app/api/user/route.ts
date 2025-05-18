import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Session } from "next-auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Verification from "@/lib/database/models/verification.model";
import sendMail from "@/utils/sendMail";

export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await User.findOne({ email: session?.user?.email });
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    if (email) {
      const user = await User.findOne({ email }).select(
        "name email role image contactInfo address description cuisine businessHours priceRange deliveryOptions createdAt updatedAt",
      );
      if (!user) {
        return NextResponse.json(
          { error: "User not found with this email!" },
          { status: 404 },
        );
      }
      return NextResponse.json({ users: user, totalUsers: 1 }, { status: 200 });
    }

    // Check admin privileges before fetching all users
    if (currentUser.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);
    const skip = (page - 1) * limit;

    // Fetch paginated users
    const allUsers = await User.find()
      .select("name email role image createdAt updatedAt contactInfo address")
      .skip(skip)
      .limit(limit);
    const totalUsers = await User.countDocuments();

    return NextResponse.json({ users: allUsers, totalUsers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user page:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    connectToDatabase();
    const session = await getSession();
    const currentUser = await User.findOne({ email: session?.user?.email });

    if (
      !currentUser ||
      currentUser.role !== "Admin" ||
      currentUser.email !== session?.user?.email
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, name, password, role, image } = await request.json();

    if (!email || !name || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 },
      );
    }

    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      role,
      image,
    });

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const session = await getSession();
    const currentUser = await User.findOne({ email: session?.user?.email });

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      name,
      email,
      role,
      image,
      contactInfo,
      address,
      description,
      cuisine,
      businessHours,
      priceRange,
      deliveryOptions,
    } = await request.json();

    // Update basic info
    currentUser.name = name || currentUser.name;
    currentUser.email = email || currentUser.email;
    if (role && currentUser.role === "Admin") {
      currentUser.role = role;
    }
    currentUser.image = image || currentUser.image;

    // Update contact info if provided
    if (contactInfo) {
      currentUser.contactInfo = {
        ...currentUser.contactInfo,
        ...contactInfo,
      };
    }

    // Update address if provided
    if (address) {
      currentUser.address = {
        ...currentUser.address,
        ...address,
      };
    }

    // Update seller specific fields
    if (description) currentUser.description = description;
    if (cuisine) currentUser.cuisine = cuisine;
    if (businessHours) currentUser.businessHours = businessHours;
    if (priceRange) currentUser.priceRange = priceRange;
    if (deliveryOptions) currentUser.deliveryOptions = deliveryOptions;

    await currentUser.save();

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: {
          _id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role,
          image: currentUser.image,
          contactInfo: currentUser.contactInfo,
          address: currentUser.address,
          description: currentUser.description,
          cuisine: currentUser.cuisine,
          businessHours: currentUser.businessHours,
          priceRange: currentUser.priceRange,
          deliveryOptions: currentUser.deliveryOptions,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await connectToDatabase();
    const session = await getSession();
    const currentUser = await User.findOne({ email: session?.user?.email });

    if (!currentUser || currentUser.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { _id, name, email, role, image } = await request.json();
    if (!_id || !name || !email || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const user = await User.findById(_id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.name = name;
    user.email = email;
    user.role = role;
    user.image = image;
    await user.save();

    return NextResponse.json(
      {
        message: "User updated successfully!",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

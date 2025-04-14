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
        "name email role image createdAt updatedAt",
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
      .select("name email role image createdAt updatedAt")
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
    const isUserHaveToken = await Verification.findOne({ email });

    if (isUserExists) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate a verification token (JWT)
    let verificationToken;
    if (!isUserHaveToken) {
      verificationToken = jwt.sign(
        { email },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }, // Token expires in 1 hour
      );
    } else {
      verificationToken = isUserHaveToken.token;
    }

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      role,
      image,
    });

    const verification = await Verification.create({
      email,
      token: verificationToken,
    });

    const verificationLink = `${process.env.BASE_URL}/verify?token=${verificationToken}`;

    await sendMail({
      email: user.email,
      subject: "Verify your account",
      template: "verifyEmail.ejs",
      data: { name: user.name, verificationLink },
    });

    return NextResponse.json(
      { message: "User registered successfully. Please verify your email." },
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

    if (!currentUser || currentUser.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, name, email, role, image } = await request.json();

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.name = name;
    user.email = email;
    user.role = role;
    user.image = image;

    await user.save();

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { prisma } from "@/lib/prisma"; // اگر از دیتابیس استفاده می‌کنی

// Mock user data - در پروداکشن از دیتابیس استفاده کن
let mockUsers = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewThojALGfOm8PPm"
  }
];

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check password strength
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);

    /* با دیتابیس:
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    */

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      password: hashedPassword
    };

    mockUsers.push(newUser);

    /* با دیتابیس:
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    */

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user data (without password) and token
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userData,
        token
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { prisma } from "@/lib/prisma"; // اگر از دیتابیس استفاده می‌کنی

// Mock user data - در پروداکشن از دیتابیس استفاده کن
const mockUsers = [
    {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewThojALGfOm8PPm" // "password123"
    }
];

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find user - در پروداکشن از دیتابیس استفاده کن
        const user = mockUsers.find(u => u.email === email);

        /* با دیتابیس:
        const user = await prisma.user.findUnique({
          where: { email }
        });
        */

        if (!user) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            JWT_SECRET,
            { expiresIn: "7d" } // Token valid for 7 days
        );

        // Return user data (without password) and token
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        return NextResponse.json(
            {
                message: "Login successful",
                user: userData,
                token
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
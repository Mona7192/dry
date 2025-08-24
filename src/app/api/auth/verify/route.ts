import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";

// Mock user data
const mockUsers = [
    {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewThojALGfOm8PPm"
    }
];

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { message: "No token provided" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as {
                userId: string;
                email: string;
            };

            // Find user by ID
            const user = mockUsers.find(u => u.id === decoded.userId);

            /* با دیتابیس:
            const user = await prisma.user.findUnique({
              where: { id: decoded.userId }
            });
            */

            if (!user) {
                return NextResponse.json(
                    { message: "User not found" },
                    { status: 404 }
                );
            }

            // Return user data (without password)
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email
            };

            return NextResponse.json(
                {
                    message: "Token valid",
                    user: userData
                },
                { status: 200 }
            );

        } catch (jwtError) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

    } catch (error) {
        console.error("Token verification error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
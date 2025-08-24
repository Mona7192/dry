import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// import { prisma } from "@/lib/prisma"; // اگر از دیتابیس استفاده می‌کنی

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";

// Mock orders storage
let mockOrders: any[] = [];

export async function POST(req: Request) {
  try {
    // بررسی Authorization header
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Authorization token required" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as {
        userId: string;
        email: string;
      };
    } catch (jwtError) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { services, customOrders, pickupDelivery, total, userId } = body;

    // Validation
    if (!services && !customOrders) {
      return NextResponse.json(
        { message: "At least one service or custom order is required" },
        { status: 400 }
      );
    }

    if (!total || total <= 0) {
      return NextResponse.json(
        { message: "Invalid total amount" },
        { status: 400 }
      );
    }

    // بررسی که userId در token با userId در body مطابقت داشته باشه
    if (userId && userId !== decoded.userId) {
      return NextResponse.json(
        { message: "User ID mismatch" },
        { status: 403 }
      );
    }

    // Create order object
    const newOrder = {
      id: Date.now().toString(), // در production از UUID استفاده کن
      userId: decoded.userId,
      userEmail: decoded.email,
      services: services || [],
      customOrders: customOrders || [],
      pickupDelivery: pickupDelivery || {},
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to mock storage (در production در دیتابیس ذخیره کن)
    mockOrders.push(newOrder);

    /* با دیتابیس:
    const order = await prisma.order.create({
      data: {
        userId: decoded.userId,
        services: JSON.stringify(services),
        customOrders: JSON.stringify(customOrders),
        pickupDelivery: JSON.stringify(pickupDelivery),
        total,
        status: "pending",
      },
    });
    */

    console.log("✅ Order created:", newOrder);

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        order: {
          id: newOrder.id,
          status: newOrder.status,
          total: newOrder.total,
          createdAt: newOrder.createdAt,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error"
      },
      { status: 500 }
    );
  }
}

// GET endpoint برای دریافت سفارش‌های کاربر
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Authorization token required" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as {
        userId: string;
        email: string;
      };
    } catch (jwtError) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // فیلتر کردن سفارش‌های کاربر
    const userOrders = mockOrders.filter(order => order.userId === decoded.userId);

    /* با دیتابیس:
    const userOrders = await prisma.order.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' },
    });
    */

    return NextResponse.json(
      {
        success: true,
        orders: userOrders,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
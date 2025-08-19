// app/api/orders/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const order = await prisma.order.create({
      data: {
        total: body.total,
        pickupDate: body.pickupDelivery.pickupDate,
        pickupTime: body.pickupDelivery.pickupTime,
        deliveryDate: body.pickupDelivery.deliveryDate,
        deliveryTime: body.pickupDelivery.deliveryTime,
        address: body.pickupDelivery.fullAddress,
        postalCode: body.pickupDelivery.postalCode,
        driverNote: body.pickupDelivery.driverNote,
        items: JSON.stringify(body.orderItems),
        customOrders: JSON.stringify(body.customOrders),
      },
    });

    return NextResponse.json({ id: order.id }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}


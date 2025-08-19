import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body

  // شبیه‌سازی بررسی ایمیل تکراری
  if (email === "test@example.com") {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    )
  }

  // شبیه‌سازی موفقیت
  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 200 }
  )
}

import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;

  try {
    const apiRes = await fetch("https://your-backend.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ message: data.message || "خطا در ورود" });
    }

    setCookie({ res }, "token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 روز
      path: "/",
    });

    res.status(200).json({ user: data.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در اتصال به سرور" });
  }
}

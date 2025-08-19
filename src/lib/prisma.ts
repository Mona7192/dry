// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // برای جلوگیری از ساخت چندین کلاینت توی hot-reload در dev
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
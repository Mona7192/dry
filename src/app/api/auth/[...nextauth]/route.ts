// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "ایمیل", type: "text" },
        password: { label: "رمز عبور", type: "password" },
      },
      async authorize(credentials) {
        // نمونه تستی
        if (
          credentials?.email === "test@test.com" &&
          credentials?.password === "123456"
        ) {
          // اینجا فرض کن از API لاگین یک token گرفتی
          return {
            id: "1",
            name: "کاربر تستی",
            email: "test@test.com",
            accessToken: "fake-jwt-token-123", // ✅ اضافه کردن توکن
          };
        }
        // لاگین ناموفق
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // وقتی لاگین شدی
      if (user) {
        token.accessToken = (user as any).accessToken; // ✅ توکن رو تو jwt ذخیره کن
      }
      return token;
    },
    async session({ session, token }) {
      // هر بار که session خونده شد، توکن رو اضافه کن
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

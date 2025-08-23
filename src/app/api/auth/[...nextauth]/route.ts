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
        if (!credentials?.email || !credentials?.password) {
          console.error("ایمیل یا رمز عبور ارائه نشده است");
          return null;
        }

        try {
          // فراخوانی API لاگین بک‌اند
          const res = await fetch(
            "https://intrcmpa-opsusm-887420.hostingersite.com/api/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await res.json();

          if (!res.ok || !data?.accessToken) {
            console.error("خطا در لاگین:", data?.message || `HTTP ${res.status}`);
            return null;
          }

          // فرض می‌کنیم بک‌اند پاسخ زیر رو می‌ده:
          // { user: { id, name, email }, accessToken }
          return {
            id: data.user.id.toString(), // NextAuth نیاز به id به صورت رشته داره
            name: data.user.name || null,
            email: data.user.email,
            accessToken: data.accessToken, // ذخیره توکن
          };
        } catch (error) {
          console.error("خطا در authorize:", error);
          return null;
        }
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
      if (user) {
        token.accessToken = user.accessToken; // ذخیره توکن در JWT
        console.log("JWT Callback - Token:", token);
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // انتقال توکن به session
      console.log("Session Callback - Session:", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
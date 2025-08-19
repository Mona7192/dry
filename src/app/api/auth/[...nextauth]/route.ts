import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // نسخه تستی: همیشه یوزر تستی برگردون
        return { id: "1", name: "Test User", email: credentials?.email || "test@example.com" };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
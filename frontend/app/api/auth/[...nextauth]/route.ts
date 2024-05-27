import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/app/_utils/database";
import { signIn } from "next-auth/react";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/scheme/User";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { name, email } = user;
        try {
          await connectMongoDB();

          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              body: JSON.stringify({ name, email, password: "aaa" }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (res.ok) {
              return user;
            }
          }
          return userExists;
        } catch (error) {
          console.error(error);
        }
      }
    },
    async redirect({url, baseUrl}) {
        return baseUrl;
      },
  },
});

export { handler as GET, handler as POST };

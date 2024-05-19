// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
// import { connectDB } from "@/app/_utils/database";

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//     ],
//     callbacks: {
//         async signIn(user, account, profile) {
//         const db = connectDB();
//         const { email } = user;
//         const userExists = await db.collection('users').findOne({ email });
//         if (!userExists) {
//             await db.collection('users').insertOne({ email });
//         }
//         return true;
//         },
//     },
// });

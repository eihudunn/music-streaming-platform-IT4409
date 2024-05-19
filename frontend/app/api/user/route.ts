import { connectMongoDB } from "@/lib/mongodb";
import User from "@/scheme/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, password } = await request.json();
  await connectMongoDB();
  await User.create({ username: name, email, password });
  return NextResponse.json(
    { message: "User Registered Successfully" },
    { status: 201 }
  );
}

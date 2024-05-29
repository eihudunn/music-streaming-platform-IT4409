import { connectMongoDB } from "@/lib/mongodb";
import User from "@/scheme/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { username, email, password } = await request.json();
  console.log(username, email, password);
  await connectMongoDB();
  if (!username || !email || !password) {
    return new NextResponse("Please fill all the fields", { status: 400 });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return new Error("Email Already Exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  return NextResponse.json(user);
}

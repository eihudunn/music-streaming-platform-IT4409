import { connectMongoDB } from '@/lib/mongodb';
import User from '@/scheme/User';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { name, email, password } = await request.json();
  await connectMongoDB();
  const user = await User.create({ username: name, email, password });
  const userResponse = {
    id: user._id,
    username: user.username,
    email: user.email,
    // Add any other properties that you want to send back
  };
  return NextResponse.json(
    { message: 'User Registered Successfully', user: userResponse },
    { status: 201 },
  );
}

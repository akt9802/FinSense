import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/models/User';
import OTP from '@/models/OTP';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, otp } = await req.json();

    if (!name || !email || !password || !otp) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const validOtp = await OTP.findOne({ email, otp });
    if (!validOtp) {
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    await OTP.deleteMany({ email });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, secret, {
      expiresIn: '1d',
    });

    return NextResponse.json({ message: 'User created successfully', token }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

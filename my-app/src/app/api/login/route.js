// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/repository';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const user = await authenticateUser(username, password);
    
    return NextResponse.json({
      id: user.id,
      username: user.username
    });
  } catch (error) {
    return NextResponse.json({
      id: 0,
      username: error.message
    });
  }
}
// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { authenticateUser as repositoryAuth } from '@/lib/repository';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const user = await authenticateUser(username, password);
    
    return NextResponse.json({
      id: user.id,
      username: user.username
    });
  } catch (error) {
    
  }
}
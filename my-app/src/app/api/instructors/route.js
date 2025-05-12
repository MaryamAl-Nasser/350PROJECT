// app/api/instructors/route.js
import { NextResponse } from 'next/server';
import { getAllInstructors } from '@/lib/repository';

export async function GET() {
  try {
    const instructors = await getAllInstructors();
    return NextResponse.json(instructors);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch instructors' },
      { status: 500 }
    );
  }
}
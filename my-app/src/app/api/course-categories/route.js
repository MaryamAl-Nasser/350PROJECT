// app/api/statistics/course-categories/route.js
import { NextResponse } from 'next/server';
import { getCoursesByCategory } from '@/lib/repository';

export async function GET() {
  try {
    const categories = await getCoursesByCategory();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch course categories: ${error.message}` },
      { status: 500 }
    );
  }
}
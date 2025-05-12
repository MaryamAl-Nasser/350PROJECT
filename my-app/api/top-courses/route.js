// app/api/top-courses/route.js
import { NextResponse } from 'next/server';
import { getTopEnrolledCourses } from '@/lib/repository';

export async function GET() {
  try {
    const courses = await getTopEnrolledCourses();
    return NextResponse.json(courses);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: `Failed to fetch top courses: ${error.message}` },
      { status: 500 }
    );
  }
}
// app/api/instructor/courses/route.js
import { NextResponse } from 'next/server';
import { getInstructorCourses } from '@/lib/repository';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const instructorId = searchParams.get('instructorId');
    
    const courses = await getInstructorCourses(instructorId);
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
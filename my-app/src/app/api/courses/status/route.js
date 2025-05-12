// app/api/courses/route.js
import { NextResponse } from 'next/server';
import { createCourse as repositoryCreate } from '@/lib/repository';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate data
    if (!data.title || !data.category || !data.credits || !data.instructorId) {
      return NextResponse.json(
        {error:`Failed to fetch course categories: ' ${error.message}`},
        { status: 400 }
      );
    }

    const course = await repositoryCreate(data);
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: `Failed to create cource:  ${error.message}` },
      { status: 500 }
    );
  }
}
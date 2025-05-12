// app/api/students/year/route.js
import { NextResponse } from 'next/server';
import { getStudentsPerYear } from '@/lib/repository';

export async function GET() {
  try {
    const result = await getStudentsPerYear();

    const stats = result.map(item => ({
      year: item.enrollmentDate.getFullYear(),
      count: item._count._all
    }));
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
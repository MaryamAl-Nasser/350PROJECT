// app/api/statistics/failure-rate/route.js
import { NextResponse } from 'next/server';
import { getFailureRatePerCourse } from '@/lib/repository';

export async function GET() {
  try {
    const stats = await getFailureRatePerCourse();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch failure rate data' },
      { status: 500 }
    );
  }
}
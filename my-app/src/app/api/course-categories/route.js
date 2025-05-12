import { getCourseCategoryStats } from '@/lib/repository';

export async function GET() {
  try {
    const stats = await getCourseCategoryStats();
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching course category stats:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch course category statistics' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
// app/statistics/actions.js
'use server';

export async function getCoursesByCategoryStats() {
  try {
    const stats = await repositoryGetCoursesByCategory();
    
    return stats.map(category => ({
      category: category.category,
      courseCount: category._count._all
    }));
  } catch (error) {
    console.error('Server action error:', error);
    throw new Error(`Failed to load category stats: ${error.message}`);
  }
}
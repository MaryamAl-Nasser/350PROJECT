import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getCourseCategoryStats() {
  const stats = await prisma.course.groupBy({
    by: ['category'],
    _count: {
      category: true,
    },
    orderBy: {
      _count: {
        category: 'desc',
      },
    },
  });

  return stats.map((item) => ({
    category: item.category,
    count: item._count.category,
  }));
}
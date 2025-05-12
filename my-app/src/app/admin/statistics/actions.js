// app/admin/statistics/actions.js
'use server';

import { getStudentsPerYear as repositoryQuery } from '@/lib/repository';

export async function fetchStudentsPerYear() {
  try {
    const result = await repositoryQuery();
    
  
    return result.map(item => ({
      year: item.year.toString(),
      count: parseInt(item.count)
    }));
  } catch (error) {
    console.error('Server action error:', error);
    throw new Error(`Failed to fetch students per year: ${error.message}`);
  }
}
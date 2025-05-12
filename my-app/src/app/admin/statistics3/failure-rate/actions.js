// app/statistics/actions.js
'use server';

import { getFailureRatePerCourse as repositoryQuery } from '@/lib/repository';

export async function getCourseFailureRates() {
  try {
    return await repositoryQuery();
  } catch (error) {
    console.error('Server action error:', error);
    throw error;
  }
}
// app/instructor/actions.js
'use server';

import { getAllInstructors as fetchInstructors } from '@/lib/repository';

export async function fetchInstructorsData() {
  try {
    return await fetchInstructors();
  } catch (error) {
    console.error('Server action error:', error);
    throw new Error(`Failed to load instructors: ${error.message}`);
  }
}
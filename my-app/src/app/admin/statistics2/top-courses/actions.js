// app/admin/statistics/actions.js
'use server';

import { getTopEnrolledCourses as repositoryQuery } from '@/lib/repository';

export async function getTop3EnrolledCourses() {
  try {
    const courses = await repositoryQuery();
  
    if (!Array.isArray(courses)) {
      throw new Error('Invalid data format from repository');
    }
    
    return courses;
  } catch (error) {
    console.error('Server action error:', error);
    throw new Error(`Failed to load top courses: ${error.message}`);
  }
}
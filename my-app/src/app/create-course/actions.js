// app/create-course/actions.js
'use server';

import { createCourse } from '@/lib/repository';

export async function createCourseAction(data) {
  try {
    return await createCourse(data);
  } catch (error) {
    console.error('Server action error:', error);
    throw new Error(`Failed to create course: ${error.message}`);
  }
}
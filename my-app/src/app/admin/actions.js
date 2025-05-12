'use server';

import { getAllCourses, updateInstructorStatus as updateStatus } from '@/lib/repository';

export async function fetchCourses() {
  try {
    return await getAllCourses();
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Failed to load courses');
  }
}

export async function updateInstructorStatus(courseId, classId, status) {
  try {

    const updatedCourse = await updateStatus(courseId, classId, status);
    return updatedCourse;
  } catch (error) {
    console.error('Error updating instructor status:', error);
    throw new Error('Failed to update instructor status');
  }
}

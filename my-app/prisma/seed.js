// prisma/seed.js

import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
// prisma/seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const saltRounds = 10;

// ✅ Keep your existing seeding functions
async function seedStudents(count = 500) {
  const students = [];
  for (let i = 0; i < count; i++) {
    students.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      enrollmentDate: faker.date.between({ from: '2020-01-01', to: '2024-01-01' }),
    });
  }
  return await prisma.student.createMany({ data: students });
}

async function seedCourses(count = 50) {
  const categories = ['Programming', 'Backend', 'Computer Science', 'Databases', 'Frontend'];
  const courses = [];
  for (let i = 0; i < count; i++) {
    courses.push({
      title: `${faker.word.adjective()} ${faker.word.noun()}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      credits: Math.floor(Math.random() * 3) + 3,
    });
  }
  return await prisma.course.createMany({ data: courses });
}

async function seedInstructors(count = 20) {
  const departments = ['CS', 'IT', 'SE', 'DS'];
  const instructors = [];
  for (let i = 0; i < count; i++) {
    instructors.push({
      name: faker.person.fullName(),
      department: departments[Math.floor(Math.random() * departments.length)],
    });
  }
  return await prisma.instructor.createMany({ data: instructors });
}

async function seedClasses(courseCount = 50, instructorCount = 20) {
  const semesters = ['Spring', 'Fall', 'Summer'];
  const classes = [];
  for (let i = 1; i <= courseCount; i++) {
    const year = Math.floor(Math.random() * 5) + 2020;
    const semester = semesters[Math.floor(Math.random() * semesters.length)];
    const instructorId = Math.floor(Math.random() * instructorCount) + 1;
    classes.push({
      courseId: i,
      instructorId,
      year,
      semester,
    });
  }
  return await prisma.class.createMany({ data: classes });
}

async function seedEnrollments(studentCount = 500, classCount = 50) {
  const statuses = ['Pending', 'Active', 'Completed'];
  const grades = ['A', 'B', 'C', 'D', 'F'];
  const enrollments = [];
  
  for (let i = 1; i <= studentCount; i++) {
    for (let j = 1; j <= classCount; j++) {
      if (Math.random() > 0.7) {
        enrollments.push({
          studentId: i,
          classId: j,
          grade: grades[Math.floor(Math.random() * grades.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
        });
      }
    }
  }
  return await prisma.enrollment.createMany({ data: enrollments });
}

// ✅ Add admin user seeding inside main()
async function main() {
  console.log('Starting seeding...');
  
  // ✅ Seed data
  await seedStudents();
  await seedCourses();
  await seedInstructors();
  await seedClasses();
  await seedEnrollments();


}
main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
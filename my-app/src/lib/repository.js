// lib/repository.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();



export async function getAllCourses() {
  return await prisma.course.findMany({
    include: {
      classes: {
        include: {
          instructor: true,
        },
      },
      prerequisites: {
        include: {
          prerequisite: true,
        },
      },
    },
  });
}

export async function createCourse(data) {
  try {
    if (!data.title || !data.category || !data.credits || !data.instructorId) {
      throw new Error('Missing required fields');
    }

    return await prisma.course.create({
      data: {
        title: data.title,
        category: data.category,
        credits: parseInt(data.credits),
        classes: {
          create: {
            year: parseInt(data.year),
            semester: data.semester,
            instructor: {
              connect: { id: parseInt(data.instructorId) },
            },
          },
        },
        prerequisites: {
          create: data.prerequisites.map(prereqId => ({
            prerequisite: {
              connect: { id: parseInt(prereqId) },
            },
          })),
        },
      },
      include: {
        classes: {
          include: { instructor: true },
        },
        prerequisites: {
          include: { prerequisite: true },
        },
      },
    });
  } catch (error) {
    console.error('Repository error:', error);
    throw new Error(`Failed to create course: ${error.message}`);
  }
}


export async function getInstructorClasses(instructorId) {
  return await prisma.class.findMany({
    where: { instructorId: parseInt(instructorId) },
    include: {
      course: true,
      enrollments: {
        include: {
          student: true
        }
      }
    }
  });
}


export async function updateStudentGrade(classId, studentId, grade) {
  return await prisma.enrollment.update({
    where: {
      studentId_classId: {
        studentId: parseInt(studentId),
        classId: parseInt(classId)
      }
    },
    data: {
      grade,
    },
    include: {
      student: true,
      class: {
        include: { course: true }
      }
    }
  });
}

export async function getAllInstructors() {
  return await prisma.instructor.findMany({
    select: {
      id: true,
      name: true,
      department: true
    }
  });
}

export async function getStudentsPerYear() {
  const result = await prisma.$queryRaw`
    SELECT 
      YEAR(enrollmentDate) AS year,
      COUNT(*) AS count
    FROM Student
    GROUP BY year
    ORDER BY year DESC;
  `;
  
  return result;
}

// lib/repository.js
export async function getTopEnrolledCourses() {
  try {
    const topClasses = await prisma.class.findMany({
      include: {
        course: true,
        _count: {
          select: { enrollments: true }
        }
      },
      orderBy: {
        enrollments: {
          _count: 'desc'
        }
      },
      take: 3
    });


    return topClasses.map((cls, index) => ({
      rank: index + 1,
      id: cls.course.id,
      title: cls.course.title,
      category: cls.course.category,
      studentCount: cls._count.enrollments
    }));
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error(`Failed to fetch top courses: ${error.message}`);
  }
}


export async function getFailureRatePerCourse() {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        class: {
          include: {
            course: true
          }
        }
      }
    });


    const courseStats = {};

    for (const enrollment of enrollments) {
      const courseId = enrollment.class.course.id;
      const courseTitle = enrollment.class.course.title;
      
      if (!courseStats[courseId]) {
        courseStats[courseId] = {
          title: courseTitle,
          totalStudents: 0,
          failedStudents: 0
        };
      }

      courseStats[courseId].totalStudents++;
      
      if (enrollment.grade === 'F') {
        courseStats[courseId].failedStudents++;
      }
    }

    const results = Object.values(courseStats).map(stat => ({
      ...stat,
      failureRate: stat.totalStudents > 0 
        ? (stat.failedStudents / stat.totalStudents) * 100 
        : 0
    }));

    return results.sort((a, b) => b.failureRate - a.failureRate);
  } catch (error) {
    console.error('Failed to calculate failure rate:', error);
    throw new Error(`Failed to fetch failure rate data: ${error.message}`);
  }
}

export async function getCoursesByCategory() {
  try {
    return await prisma.course.groupBy({
      by: ['category'],
      _count: {
        _all: true
      },
      orderBy: {
        _count: {
          _all: 'desc'
        }
      }
    });
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error(`Failed to fetch courses by category: ${error.message}`);
  }
}
//course category statistics
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
//username and password authentication
export async function authenticateUser(username, password) {
  try {
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user || !user.password) {
      throw new Error('User not found');
    }

    const isValid =password === user.password;
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.id,
      username: user.username
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}


// app/admin/page.js
'use client';

import { useEffect, useState } from 'react';
import styles from './admin.module.css';
import { fetchCourses, updateInstructorStatus } from './actions';
import Link from 'next/link';

export default function AdminPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to load courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
    const logginName = localStorage.getItem("logginName");
    if (!logginName) window.location.href="/login";
  }, []);

  const handleStatusUpdate = async (courseId, classId, newStatus) => {
    try {
      const updatedCourse = await updateInstructorStatus(courseId, classId, newStatus);

      setCourses(prevCourses => 
        prevCourses.map(course => 
          course.id === courseId ? updatedCourse : course
        )
      );
      
      alert(`Status updated to: ${newStatus}`);
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
      console.error(err);
    }
  };

 
  const removeCourse = (index) => {
    if (confirm('Are you sure you want to remove this course?')) {
      const updated = courses.filter((_, i) => i !== index);
      setCourses(updated);
    }
  };


  const createNewCourse = () => {
    const title = prompt('Enter course name:');
    const category = prompt('Enter course category:');
    const credits = parseInt(prompt('Enter number of credits:') || '3');

    if (!title || !category || isNaN(credits)) {
      alert('All fields are required.');
      return;
    }

    const newCourse = {
      id: Date.now(),
      title,
      category,
      credits,
      classes: [
        {
          id: Date.now() + 1,
          year: 2025,
          semester: 'Spring',
          instructor: {
            id: 1000,
            name: prompt('Enter instructor name:') || 'Unknown',
            department: 'Computer Science',
            status: 'Pending',
          },
        },
      ],
    };

    setCourses((prev) => [...prev, newCourse]);
  };

  if (loading) return <div className={styles.loading}>Loading courses...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <header className={styles.adminHeader}>
        <h1>Course Management</h1>
      </header>

      <nav className={styles.adminControls}>
  
  <Link href="/create-course">
    <button type="button" className={styles.createButton}>
      Create New Course
    </button>
  </Link>
</nav>

      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>Course Management</h2>
        
        <div className={styles.tableContainer}>
          <table className={styles.courseTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Credits</th>
                <th>Instructor</th>
                <th>Instructor Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="6" className={styles.noData}>
                    No courses found
                  </td>
                </tr>
              ) : (
                courses.map((course) =>
                  course.classes?.map((cls) => (
                    <tr key={`${course.id}-${cls.id}`} className={styles.tableRow}>
                      <td>{course.title}</td>
                      <td>{course.category}</td>
                      <td>{course.credits}</td>
                      <td>{cls.instructor?.name || 'No instructor assigned'}</td>
                      <td className={styles.statusCell}>
                        <span className={`${styles.statusBadge} ${styles[cls.instructor?.status?.toLowerCase() || 'pending']}`}>
                          {cls.instructor?.status || 'Pending'}
                        </span>
                      </td>
                      <td className={styles.actionButtons}>
                        <button 
                          onClick={() => handleStatusUpdate(course.id, cls.id, 'validated')}
                          className={styles.validateButton}
                        >
                          Validate
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(course.id, cls.id, 'cancelled')}
                          className={styles.cancelButton}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
// app/admin/statistics2/top-courses/page.js
'use client';

import { useEffect, useState } from 'react';
import styles from '../../admin.module.css';
import {getTop3EnrolledCourses} from './actions'

export default function StatisticsPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getTop3EnrolledCourses();
        
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data received from server action');
        }
        
        setCourses(data);
        const logginName = localStorage.getItem("logginName");
        if (!logginName) window.location.href="/login";
      } catch (err) {
        console.error('Failed to load stats:', err);
        setError('Failed to load course statistics');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading course statistics...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.adminHeader}>
        <h1>Course Enrollment Statistics</h1>
      </header>

      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>Top 3 Most Enrolled Courses</h2>
        
        <div className={styles.tableContainer}>
          <table className={styles.courseTable}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Course Title</th>
                <th>Category</th>
                <th>Total Students</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="4" className={styles.noData}>
                    No course data available
                  </td>
                </tr>
              ) : (
                courses.map((course, index) => (
                  <tr key={course.id || index} className={styles.tableRow}>
                    <td>{course.rank || index + 1}</td>
                    <td>{course.title}</td>
                    <td>{course.category}</td>
                    <td>{course.studentCount || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
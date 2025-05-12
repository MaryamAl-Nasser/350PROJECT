// app/statistics/failure-rate/page.js
'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';

export default function FailureRatePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/statistics3/failure-rate');
        
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
        
        }

        if (!response.ok) {
          
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
    const logginName = localStorage.getItem("logginName");
    if (!logginName) window.location.href="/login";
  }, []);

  if (loading) return <div className={styles.loading}>Loading failure rate data...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.sectionTitle}>Course Failure Rates</h1>
      
      <table className={styles.courseTable}>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Total Students</th>
            <th>Failed Students</th>
            <th>Failure Rate (%)</th>
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
              <tr key={index} className={styles.tableRow}>
                <td>{course.title}</td>
                <td>{course.totalStudents}</td>
                <td>{course.failedStudents}</td>
                <td className={
                  course.failureRate > 20 
                    ? styles.highRate 
                    : course.failureRate > 10 
                      ? styles.mediumRate 
                      : styles.lowRate
                }>
                  {course.failureRate.toFixed(2)}%
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
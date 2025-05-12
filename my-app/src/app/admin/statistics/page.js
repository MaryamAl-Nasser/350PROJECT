// app/admin/statistics/page.js
'use client';

import { useEffect, useState } from 'react';
import styles from '../admin.module.css';
import { fetchStudentsPerYear } from './actions'; 

export default function StatisticsPage() {
  const [studentsPerYear, setStudentsPerYear] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchStudentsPerYear(); 
        setStudentsPerYear(data);
      } catch (err) {
        setError('Failed to load statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
    const logginName = localStorage.getItem("logginName");
    if (!logginName) window.location.href="/login";
  }, []);

  if (loading) return <div className={styles.loading}>Loading statistics...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <header className={styles.adminHeader}>
        <h1>Student Enrollment Statistics</h1>
      </header>

      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>Students Per Year</h2>
        
        <div className={styles.tableContainer}>
          <table className={styles.studentsTable}>
            <thead>
              <tr>
                <th>Year</th>
                <th>Students Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {studentsPerYear.length === 0 ? (
                <tr>
                  <td colSpan="2" className={styles.noData}>
                    No enrollment data found
                  </td>
                </tr>
              ) : (
                studentsPerYear.map((stat, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td>{stat.year}</td>
                    <td>{stat.count}</td>
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
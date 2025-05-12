// app/instructor/page.js
'use client';

import { useEffect, useState } from 'react';
import styles from '../admin/admin.module.css';
import { fetchInstructorsData } from './actions';

export default function InstructorPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchInstructorsData();
        setInstructors(data);
      } catch (err) {
        setError('Failed to load instructor data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
    const logginName = localStorage.getItem("logginName");
    if (!logginName) window.location.href="/login";
  }, []);

  if (loading) return <div className={styles.loading}>Loading instructors...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <header className={styles.adminHeader}>
        <h1>Instructor Management</h1>
      </header>

      <main className={styles.main}>
     
        
        <div className={styles.tableContainer}>
          <table className={styles.courseTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {instructors.length === 0 ? (
                <tr>
                  <td colSpan="2" className={styles.noData}>
                    No instructors found
                  </td>
                </tr>
              ) : (
                instructors.map((instructor) => (
                  <tr key={instructor.id} className={styles.tableRow}>
                    <td>{instructor.name}</td>
                    <td>{instructor.department}</td>
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
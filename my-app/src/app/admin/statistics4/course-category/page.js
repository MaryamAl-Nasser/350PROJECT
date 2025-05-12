// app/statistics/course-categories/page.js
'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';

export default function CourseCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  if (loading) return <div className={styles.loading}>Loading category statistics...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Course Categories</h2>
      
      <div className={styles.tableContainer}>
        <table className={styles.courseTable}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Courses</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="2" className={styles.noData}>
                  No course categories found
                </td>
              </tr>
            ) : (
              categories.map((category, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td>{category.category}</td>
                  <td>{category._count._all}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
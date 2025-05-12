import styles from '../../admin.module.css';

async function fetchCourseCategoryStats() {
  
  const res = await fetch(`http://localhost:3000/api/course-categories`, {
    cache: 'no-store', // disable caching
  });

  if (!res.ok) {
    throw new Error('Failed to fetch course category statistics');
  }

  return res.json();
}

export default async function CourseCategoryStatisticsPage() {
  let stats = [];

  try {
    stats = await fetchCourseCategoryStats();
  } catch (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Course Category Statistics</h1>
        <p className="text-red-500 mt-4">Error loading data: {error.message}</p>
      </div>
    );
  }

  return (
    
      <div className={styles.container}>
      <h1 className={styles.sectionTitle}>Course Category Statistics</h1>
      <table className={styles.courseTable}>
        <thead >
          <tr>
            <th>Category</th>
            <th >Course Count</th>
          </tr>
        </thead>
        <tbody>
          {stats.length > 0 ? (
            stats.map((stat, index) => (
              <tr key={index} className={styles.tableRow}>
                <td >{stat.category}</td>
                <td >{stat.count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="py-4 text-center text-gray-500">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
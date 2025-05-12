import React from 'react';
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

export default function InstructorClassPage() {
  // Example function to handle button click
  const viewInstructorCourses = () => {
    // Logic to fetch/display courses
    console.log('Viewing instructor courses');
  };

  return (
    <div>
      <nav className="controls">
        <button >View My Classes</button>
      </nav>

      <main className="course-container">
        <div id="instructor-courses">
          {/* Dynamic course content would go here */}
        </div>
      </main>
    </div>
  );
}
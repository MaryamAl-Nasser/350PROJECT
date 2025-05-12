import React from 'react';

export default function InstructorStudentPage() {
  const viewInstructorCourses = () => {
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
function showCourses() {
    console.log("showCourses function triggered");
    document.getElementById('content').innerHTML = `
      <h2>Available Courses</h2>
      <input type="text" id="searchInput" placeholder="Search by name or category..." />
      <div id="courseList"></div>
    `;
    
    // Rebind the course display logic
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase();
      const filtered = courses.filter(c =>
        c.name.toLowerCase().includes(keyword) ||
        c.category.toLowerCase().includes(keyword)
      );
      displayCourses(filtered);
    });
    displayCourses(courses); // Display all by default
  }
  
function showRegister() {
  document.getElementById('content').innerHTML = `
    <h2>Register for a Course</h2>
    <button onclick="registerCourse()">Register for Advanced JavaScript</button>
  `;
}

function showLearningPath() {
  document.getElementById('content').innerHTML = `
    <h2>Learning Path</h2>
    <div id="learningPath"></div>
  `;
  showLearningPathDetails(); // Function to show the learning path details
}

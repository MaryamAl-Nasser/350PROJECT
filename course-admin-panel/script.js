// Sample courses data (you will likely get this from a backend or JSON file)
const courses = [
  {
      name: "Programming Concepts",
      courseNumber: "151",
      category: "Computer Science",
      description: "Problem solving techniques, including basic programming concepts such as variables, arithmetic, logical operations, input/output, conditional statements, loops, arrays, functions, and file processing."
  },
  {
      name: "General Chemistry I",
      courseNumber: "101",
      category: "Chemistry",
      description: "Topics covered include measurements, significant figures, atomic structure, nomenclature, stoichiometry and chemical reactions, thermochemistry, and electron configuration."
  },
  {
      name: "Calculus I",
      courseNumber: "101",
      category: "Mathematics",
      description: "Limits and continuity, differentiation, applications of derivatives, integration, inverse functions, transcendental functions."
  },
  {
      name: "Software Engineering",
      courseNumber: "310",
      category: "Computer Science",
      description: "Fundamental concepts, principles, and techniques for cost-effective engineering of quality software, including software process models, requirements specification, design, testing, and project management."
  }
];

// Search function to filter courses based on name, category, or course number
function searchCourses() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredCourses = courses.filter(course => 
      course.name.toLowerCase().includes(searchTerm) ||
      course.category.toLowerCase().includes(searchTerm) ||
      course.courseNumber.includes(searchTerm)
  );
  
  displayCourses(filteredCourses);
}

// Display courses on the page
function displayCourses(coursesList) {
  const courseListDiv = document.getElementById('openCoursesList');
  courseListDiv.innerHTML = ""; // Clear the previous list
  
  if (coursesList.length === 0) {
      courseListDiv.innerHTML = "<p class='no-courses'>No courses found</p>";
  } else {
      coursesList.forEach(course => {
          const courseElement = document.createElement('div');
          courseElement.classList.add('course');
          courseElement.innerHTML = `
              <h2>${course.name} (${course.courseNumber})</h2>
              <p><strong>Category:</strong> ${course.category}</p>
              <p>${course.description}</p>
              <button onclick="cancelCourse('${course.courseNumber}')">Cancel Course</button>
              <button onclick="updateCourseStatus('${course.courseNumber}')">Update Status</button>
          `;
          courseListDiv.appendChild(courseElement);
      });
  }
}

// Handle course cancellation
function cancelCourse(courseNumber) {
  const courseIndex = courses.findIndex(course => course.courseNumber === courseNumber);
  if (courseIndex !== -1) {
      // Here, you would typically make a request to the backend to cancel the course
      alert(`Course ${courses[courseIndex].name} (Course Number: ${courseNumber}) has been cancelled.`);
      // Remove the course from the list (for demo purposes)
      courses.splice(courseIndex, 1);
      displayCourses(courses); // Re-render the list
  }
}

// Handle course status update
function updateCourseStatus(courseNumber) {
  const courseIndex = courses.findIndex(course => course.courseNumber === courseNumber);
  if (courseIndex !== -1) {
      // Here, you can toggle the status (or implement any logic like 'In Progress' or 'Closed')
      const course = courses[courseIndex];
      alert(`The status of the course ${course.name} (Course Number: ${courseNumber}) has been updated.`);
  }
}

// Create a new course
function createCourse() {
  const courseName = prompt("Enter course name:");
  const courseNumber = prompt("Enter course number:");
  const category = prompt("Enter course category:");
  const description = prompt("Enter course description:");
  
  // For demo purposes, directly add the course
  const newCourse = {
      name: courseName,
      courseNumber: courseNumber,
      category: category,
      description: description
  };
  
  courses.push(newCourse); // Add the new course to the list
  alert(`Course ${newCourse.name} (Course Number: ${newCourse.courseNumber}) has been created.`);
  displayCourses(courses); // Re-render the list
}

// Initially display all courses
displayCourses(courses);

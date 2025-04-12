let courses = [];
let users = [];

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("data/courses.json").then(res => res.json()),
    fetch("data/users.json").then(res => res.json())
  ])
  .then(([coursesData, usersData]) => {
    courses = coursesData;
    users = usersData;
    console.log("Courses and users loaded.");
  })
  .catch(error => {
    console.error("Failed to load JSON files:", error);
  });
});

function loadInstructorCourses() {
  const instructorName = document.getElementById("instructorName").value.trim();
  const container = document.getElementById("instructorCourses");
  container.innerHTML = "";

  if (!instructorName) {
    alert("Please enter instructor name.");
    return;
  }

  let found = false;

  courses.forEach(course => {
    const instructorIndex = course.instructors.findIndex(i => i.name === instructorName);

    if (instructorIndex !== -1) {
      found = true;

      const enrolledStudents = users.filter(user =>
        user.role === "student" &&
        (
          user.inProgressCourses?.some(c => c.code === course.code) ||
          user.pendingCourses?.some(c => c.code === course.code)
        )
      );

      const studentListHTML = enrolledStudents.map((student, index) => `
        <li>
          ${student.name} (${student.id}) -
    <input type="text" id="grade-${course.code}-${instructorIndex}-${index}" value="" placeholder="Grade">
        </li>
      `).join("");

      const div = document.createElement("div");
      div.classList.add("course-block");
      div.innerHTML = `
        <h3>${course.code} - ${course.name}</h3>
        <ul>${studentListHTML || "<li>No students enrolled.</li>"}</ul>
        <button onclick="submitGrades('${course.code}', ${instructorIndex})">Submit Grades</button>
        <hr>
      `;

      container.appendChild(div);
    }
  });

  if (!found) {
    container.innerHTML = <p>No classes found for instructor <strong>${instructorName}</strong>.</p>;
  }
}

function submitGrades(courseCode, instIndex) {
  const course = courses.find(c => c.code === courseCode);
  const instructorName = course.instructors[instIndex].name;

  const enrolledStudents = users.filter(user =>
    user.role === "student" &&
    (
      user.inProgressCourses?.some(c => c.code === courseCode) ||
      user.pendingCourses?.some(c => c.code === courseCode)
    )
  );
  enrolledStudents.forEach((student, i) => {
    const input = document.getElementById(`grade-${courseCode}-${instIndex}-${i}`);
    if (!input) return;

    const grade = input.value.trim();

    if (!student.submittedGrades) student.submittedGrades = [];
    student.submittedGrades.push({
      courseCode: courseCode,
      instructor: instructorName,
      grade: grade
    });
  });

  alert(`Grades submitted by ${instructorName} for ${courseCode}.`);
  console.log("Updated users with submitted grades:",users);
};


let courses = [];
let users = [];

async function loadData() {
    try {
        const coursesResponse = await fetch('courses.json');
        const usersResponse = await fetch('/loginPage/users.json');

        const coursesData = await coursesResponse.json();
        const usersData = await usersResponse.json();

        courses = coursesData.courses;
        users = usersData.users;
        
        searchCourses(); 
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}

function getUserByUsername(username) {
    return users.find(user => user.username === username);
}

// Utility function to find course by code
function getCourseByCode(courseCode) {
    return courses.find(course => course.courseCode === courseCode);
}

// Function to register a student for a course
function registerCourse(studentUsername, courseCode, instructorName) {
    let student = getUserByUsername(studentUsername);
    let course = getCourseByCode(courseCode);

    if (!student) {
        alert("Student not found.");
        return;
    }

    // Check if the student has completed the prerequisite courses
    if (course.RequirementsCourses.length > 0) {
        let hasPrerequisites = course.RequirementsCourses.every(reqCode => {
            return student.completedCourses.some(c => c.code === reqCode && c.grade >= 50); // Assuming passing grade is 50
        });

        if (!hasPrerequisites) {
            alert("You must complete all prerequisite courses to register for this course.");
            return;
        }
    }

    // Check if the course is open for registration
    if (course.instructors.length === 0) {
        alert("No instructors available for this course.");
        return;
    }

    // Check if the desired instructor has available slots
    let instructor = course.instructors.find(i => i.name === instructorName);
    if (!instructor) {
        alert("Instructor not found.");
        return;
    }

    if (instructor.availableSlots <= 0) {
        alert("No available slots with this instructor.");
        return;
    }

    // Register the student for the course by adding to pendingCourses
    instructor.availableSlots--; // Reduce the available slots
    student.pendingCourses.push({ courseCode: course.courseCode, instructor: instructor.name });

    alert(`You have successfully registered for ${course.name} with ${instructor.name}. Your registration is pending approval.`);
}

// Function to search and display available courses
function searchCourses() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const filteredCourses = courses.filter(course => course.name.toLowerCase().includes(searchText));

    let courseListHTML = '';
    filteredCourses.forEach(course => {
        courseListHTML += `
            <div class="course">
                <h3>${course.name}</h3>
                <p>Course Code: ${course.courseCode}</p>
                <p>Instructor Options:</p>
                <ul>
                    ${course.instructors.map(instructor => `
                        <li>${instructor.name} - Available Slots: ${instructor.availableSlots}</li>
                    `).join('')}
                </ul>
                <button onclick="registerCourse('maryam', '${course.courseCode}', '${course.instructors[0].name}')">Register</button>
            </div>
        `;
    });

    document.getElementById('courseList').innerHTML = courseListHTML;
}

// Event listener for logout button
document.getElementById('logoutBtn').addEventListener('click', function() {
    let student = getUserByUsername('maryam');
    student = null;  // Simulating logout by clearing the user object
    alert("You have logged out successfully.");
});

// Call loadData to fetch and load the JSON files when the page loads
window.onload = loadData;

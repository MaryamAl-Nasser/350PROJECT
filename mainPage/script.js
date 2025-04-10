const viewCoursesBtn = document.getElementById('viewCoursesBtn');
const viewLearningPathBtn = document.getElementById('viewLearningPathBtn');
const logoutBtn = document.getElementById('logoutBtn');

let allCourses = [];

async function loadCourses() {
    let response = await fetch('courses.json');
    if (response.ok) {
        let data = await response.json();
        allCourses = data.courses.map(course => ({
            name: course.name,
            courseNumber: course["course number"],
            category: course.category,
            description: course.description,
            courseCode: course.courseCode,
        }));
    } else {
        document.getElementById('courseList').innerHTML = "Failed to load courses. Please try again later.";
    }
}

function displayCourses(courses) {
    let courseListContainer = document.getElementById('courseList');
    courseListContainer.innerHTML = '';

    if (courses.length === 0) {
        courseListContainer.innerHTML = 'No courses found matching your search criteria.';
        return;
    }

    courses.forEach(course => {
        let courseDiv = document.createElement('div');
        courseDiv.classList.add('course');
        courseDiv.innerHTML = `
            <h2>${course.name}</h2>
            <p><strong>Category:</strong> ${course.category}</p>
            <p><strong>Course Number:</strong> ${course.courseNumber}</p>
            <p><strong>Course Code:</strong> ${course.courseCode}</p>
            <p>${course.description}</p>
        `;
        courseListContainer.appendChild(courseDiv);
    });
}

function searchCourses() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();


    if (allCourses.length === 0) {
        loadCourses().then(() => {
            filterAndDisplay(searchTerm);
        });
    } else {
        filterAndDisplay(searchTerm);
    }
}

function filterAndDisplay(searchTerm) {
    if (searchTerm === '') {
        document.getElementById('courseList').innerHTML = '';
        return;
    }

    const filteredCourses = allCourses.filter(course =>
        course.name.toLowerCase().includes(searchTerm) ||
        course.category.toLowerCase().includes(searchTerm) ||
        course.courseNumber.toString().includes(searchTerm) ||
        course.courseCode.toLowerCase().includes(searchTerm)
    );

    displayCourses(filteredCourses);
}

document.addEventListener("DOMContentLoaded", function () {

    loadCourses();

    const viewCoursesBtn = document.getElementById('viewCoursesBtn');
    if (viewCoursesBtn) {
        viewCoursesBtn.addEventListener('click', function () {
            window.location.href = 'index2.html';
        });
    }
});

let allCourses = [];

async function loadCourses() {
    let response = await fetch('courses.json');
    if (response.ok) {
        let data = await response.json();
        allCourses = data.courses.map(course => ({
            name: course.name,
            courseNumber: course["course number"], // Fixing space issue
            category: course.category,
            description: course.description
        }));
        displayCourses(allCourses);
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
            <p>${course.description}</p>
        `;
        courseListContainer.appendChild(courseDiv);
    });
}

function searchCourses() {
    let searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm === '') {
        displayCourses(allCourses);
        return;
    }

    let filteredCourses = allCourses.filter(course => 
        course.name.toLowerCase().includes(searchTerm) || 
        course.category.toLowerCase().includes(searchTerm) ||
        course.courseNumber.toString().includes(searchTerm) 
    );

    displayCourses(filteredCourses);
}

document.addEventListener("DOMContentLoaded", function() {
    loadCourses();
});


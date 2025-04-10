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


function showCourses() {
    document.getElementById('content').innerHTML = `
        <h2>Available Courses</h2>
        <input type="text" id="searchInput" placeholder="Search by name or category..." />
        <div id="courseList"></div>
    `;

    
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase();
        const filtered = allCourses.filter(c =>
            c.name.toLowerCase().includes(keyword) ||
            c.category.toLowerCase().includes(keyword)
        );
        displayCourses(filtered);
    });
    displayCourses(allCourses); 
}


document.addEventListener("DOMContentLoaded", function () {
    loadCourses();

    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchCourses);
    }

    const showCoursesButton = document.getElementById('showCoursesButton');
    if (showCoursesButton) {
        showCoursesButton.addEventListener('click', showCourses); // Add showCourses function here
    }
});

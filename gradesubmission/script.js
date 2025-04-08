const courses = [
    {
        name: "Programming Concepts",
        courseNumber: "151",
        category: "Computer Science",
        students: [
            { name: "John Doe", id: "S12345", grade: "" },
            { name: "Jane Smith", id: "S12346", grade: "" },
        ]
    },
    {
        name: "General Chemistry I",
        courseNumber: "101",
        category: "Chemistry",
        students: [
            { name: "Mary Johnson", id: "S22345", grade: "" },
            { name: "James White", id: "S22346", grade: "" },
        ]
    }
];


function searchCourses() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredCourses = courses.filter(course => 
        course.name.toLowerCase().includes(searchTerm) ||
        course.category.toLowerCase().includes(searchTerm) ||
        course.courseNumber.includes(searchTerm)
    );
    
    displayCourses(filteredCourses);
}

function displayCourses(coursesList) {
    const courseListDiv = document.getElementById('courseList');
    courseListDiv.innerHTML = ""; 
    
    if (coursesList.length === 0) {
        courseListDiv.innerHTML = "<p class='no-courses'>No courses found</p>";
    } else {
        coursesList.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('course');
            courseElement.innerHTML = `
                <h2>${course.name} (${course.courseNumber})</h2>
                <p><strong>Category:</strong> ${course.category}</p>
                <button onclick="viewStudents('${course.courseNumber}')">View Students</button>
            `;
            courseListDiv.appendChild(courseElement);
        });
    }
}

function viewStudents(courseNumber) {
    const course = courses.find(course => course.courseNumber === courseNumber);
    if (course) {
        const studentListDiv = document.getElementById('studentList');
        const studentsDiv = document.getElementById('students');
        studentsDiv.innerHTML = ""; 
        
        course.students.forEach(student => {
            const studentElement = document.createElement('li');
            studentElement.innerHTML = `
                <strong>${student.name} (${student.id})</strong>
                <label for="grade-${student.id}">Grade:</label>
                <input type="text" id="grade-${student.id}" value="${student.grade}" />
            `;
            studentsDiv.appendChild(studentElement);
        });
        
        document.getElementById('courseList').style.display = "none";
        studentListDiv.style.display = "block";
    }
}

function submitGrades() {
    const studentInputs = document.querySelectorAll('#students input');
    studentInputs.forEach(input => {
        const studentId = input.id.split('-')[1]; 
        const course = courses.find(course => course.students.some(student => student.id === studentId));
        
        if (course) {
            const student = course.students.find(student => student.id === studentId);
            student.grade = input.value; 
        }
    });

    alert("Grades have been successfully submitted!");

    document.getElementById('studentList').style.display = "none";
    document.getElementById('courseList').style.display = "block";
}

displayCourses(courses);

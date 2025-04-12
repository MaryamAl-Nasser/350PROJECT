document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Initialize user course arrays if they don't exist
    currentUser.completedCourses = currentUser.completedCourses || [];
    currentUser.inProgressCourses = currentUser.inProgressCourses || [];
    currentUser.pendingCourses = currentUser.pendingCourses || [];

    // DOM elements
    const viewCoursesBtn = document.getElementById('viewCoursesBtn');
    const viewLearningPathBtn = document.getElementById('viewLearningPathBtn');
    const registerCourseBtn = document.getElementById('registerCourseBtn');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchBtn = document.getElementById('searchBtn');
    const coursesList = document.getElementById('coursesList');
    const coursesSection = document.getElementById('coursesSection');
    const learningPathSection = document.getElementById('learningPathSection');
    const completedCoursesList = document.getElementById('completedCourses');
    const inProgressCoursesList = document.getElementById('inProgressCourses');
    const pendingCoursesList = document.getElementById('pendingCourses');

    let allCourses = [];

    // Event listeners
    viewCoursesBtn.addEventListener('click', showCoursesSection);
    viewLearningPathBtn.addEventListener('click', showLearningPathSection);
    registerCourseBtn.addEventListener('click', showAvailableCourses);
    
    searchBtn.addEventListener('click', filterCourses);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') filterCourses();
    });

    // Initialize the page
    loadCourses();
    showCoursesSection();

    function loadCourses() {
        fetch('data/courses.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(courses => {
                allCourses = courses;
                displayCourses(allCourses);
            })
            .catch(error => {
                console.error('Error loading courses:', error);
                coursesList.innerHTML = '<p>Error loading courses. Please try again later.</p>';
            });
    }

    function displayCourses(courses) {
        coursesList.innerHTML = '';
        
        if (courses.length === 0) {
            coursesList.innerHTML = '<p>No courses found.</p>';
            return;
        }

        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <h3>${course.name} (${course.code})</h3>
                <p><strong>Category:</strong> ${course.category}</p>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p><strong>Status:</strong> ${course.status}</p>
                <p>${course.description}</p>
            `;
            coursesList.appendChild(courseCard);
        });
    }

    function showAvailableCourses() {
        const availableCourses = allCourses.filter(course => course.status === "Open");
        displayAvailableCourses(availableCourses);
        showCoursesSection();
    }

    function displayAvailableCourses(courses) {
        coursesList.innerHTML = '';
        
        if (courses.length === 0) {
            coursesList.innerHTML = '<p>No courses available for registration at this time.</p>';
            return;
        }

        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            
            const meetsPrerequisites = checkPrerequisites(course);
            const hasAvailableSlots = course.instructors.some(instructor => instructor.availableSlots > 0);

            courseCard.innerHTML = `
                <h3>${course.name} (${course.code})</h3>
                <p><strong>Category:</strong> ${course.category}</p>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p>${course.description}</p>
                ${meetsPrerequisites && hasAvailableSlots ? 
                    `<button class="register-course-btn" data-code="${course.code}">Register</button>` : 
                    `<p class="warning-message">${
                        !meetsPrerequisites ? 'Prerequisites not met' : 
                        !hasAvailableSlots ? 'No available slots' : 
                        'Cannot register'
                    }</p>`}
            `;
            coursesList.appendChild(courseCard);
        });

        // Add event listeners to register buttons
        document.querySelectorAll('.register-course-btn').forEach(button => {
            button.addEventListener('click', function() {
                const courseCode = this.getAttribute('data-code');
                registerForCourse(courseCode);
            });
        });
    }

    function checkPrerequisites(course) {
        if (!course.prerequisites || course.prerequisites.length === 0) {
            return true;
        }
        
        const completedCourseCodes = currentUser.completedCourses.map(c => c.code);
        return course.prerequisites.every(prereq => completedCourseCodes.includes(prereq));
    }

    function registerForCourse(courseCode) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        const course = allCourses.find(c => c.code === courseCode);
        
        if (!course) {
            alert('Error: Course not found');
            return;
        }

        // Check if already registered
        const isAlreadyRegistered = 
            currentUser.pendingCourses.some(c => c.code === courseCode) ||
            currentUser.inProgressCourses.some(c => c.code === courseCode) ||
            currentUser.completedCourses.some(c => c.code === courseCode);

        if (isAlreadyRegistered) {
            alert('You are already registered for this course!');
            return;
        }

        // Check prerequisites again (in case UI was bypassed)
        if (!checkPrerequisites(course)) {
            alert('You do not meet the prerequisites for this course');
            return;
        }

        // Check available slots
        const availableInstructor = course.instructors.find(instructor => instructor.availableSlots > 0);
        if (!availableInstructor) {
            alert('No available slots for this course');
            return;
        }

        // Register for the course
        currentUser.pendingCourses.push({
            code: course.code,
            name: course.name,
            instructor: availableInstructor.name
        });

        // Decrement available slot
        availableInstructor.availableSlots--;

        // Update user data
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserInStorage(currentUser);
        
        // Update courses data
        updateCourseInStorage(allCourses);

        alert(`Successfully registered for ${course.name}!`);
        showAvailableCourses();
        updateLearningPath();
    }

    function updateUserInStorage(updatedUser) {
        try {
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            const userIndex = registeredUsers.findIndex(u => u.username === updatedUser.username);
            
            if (userIndex !== -1) {
                registeredUsers[userIndex] = updatedUser;
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            } else {
                // If not found in registeredUsers, add them (for new registrations)
                registeredUsers.push(updatedUser);
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            }
        } catch (error) {
            console.error('Error updating user in storage:', error);
        }
    }

    function updateCourseInStorage(updatedCourses) {
        try {
            localStorage.setItem('courses', JSON.stringify(updatedCourses));
        } catch (error) {
            console.error('Error updating courses in storage:', error);
        }
    }

    function filterCourses() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        
        const filtered = allCourses.filter(course => {
            const matchesSearch = course.name.toLowerCase().includes(searchTerm) || 
                               course.description.toLowerCase().includes(searchTerm) ||
                               course.code.toLowerCase().includes(searchTerm);
            const matchesCategory = category === '' || course.category === category;
            return matchesSearch && matchesCategory;
        });
        
        displayCourses(filtered);
    }

    function showCoursesSection() {
        coursesSection.classList.remove('hidden');
        learningPathSection.classList.add('hidden');
    }

    function showLearningPathSection() {
        coursesSection.classList.add('hidden');
        learningPathSection.classList.remove('hidden');
        updateLearningPath();
    }

    function updateLearningPath() {
        completedCoursesList.innerHTML = currentUser.completedCourses.length > 0 ? 
            currentUser.completedCourses.map(c => 
                `<li>${c.name} (${c.code}) - Grade: ${c.grade || 'N/A'}</li>`
            ).join('') : 
            '<li>No completed courses</li>';
            
        inProgressCoursesList.innerHTML = currentUser.inProgressCourses.length > 0 ?
            currentUser.inProgressCourses.map(c => 
                `<li>${c.name} (${c.code})${c.instructor ? ' - ' + c.instructor : ''}</li>`
            ).join('') :
            '<li>No courses in progress</li>';
            
        pendingCoursesList.innerHTML = currentUser.pendingCourses.length > 0 ?
            currentUser.pendingCourses.map(c => 
                `<li>${c.name} (${c.code})${c.instructor ? ' - ' + c.instructor : ''}</li>`
            ).join('') :
            '<li>No pending courses</li>';
    }
});
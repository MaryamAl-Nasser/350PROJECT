document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // DOM elements
    const viewCoursesBtn = document.getElementById('viewCoursesBtn');
    const viewLearningPathBtn = document.getElementById('viewLearningPathBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchBtn = document.getElementById('searchBtn');
    const coursesList = document.getElementById('coursesList');
    const coursesSection = document.getElementById('coursesSection');
    const learningPathSection = document.getElementById('learningPathSection');
    const completedCoursesList = document.getElementById('completedCourses');
    const inProgressCoursesList = document.getElementById('inProgressCourses');
    const pendingCoursesList = document.getElementById('pendingCourses');
    const modal = document.getElementById('courseModal');
    const closeBtn = document.querySelector('.close');
    const modalCourseTitle = document.getElementById('modalCourseTitle');
    const modalCourseDesc = document.getElementById('modalCourseDesc');
    const instructorsList = document.getElementById('instructorsList');
    const registerBtn = document.getElementById('registerBtn');
    const registrationMessage = document.getElementById('registrationMessage');

    let allCourses = [];
    let currentSelectedCourse = null;

    // Event listeners
    viewCoursesBtn.addEventListener('click', showCoursesSection);
    viewLearningPathBtn.addEventListener('click', showLearningPath);
    logoutBtn.addEventListener('click', logout);
    searchBtn.addEventListener('click', filterCourses);
    closeBtn.addEventListener('click', closeModal);
    registerBtn.addEventListener('click', registerForCourse);
    
    // Also filter when pressing Enter in search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterCourses();
        }
    });

    // Initialize the page
    loadCourses();
    showCoursesSection();

    function loadCourses() {
        fetch('data/courses.json')
            .then(response => response.json())
            .then(courses => {
                allCourses = courses;
                displayCourses(courses);
            })
            .catch(error => console.error('Error loading courses:', error));
    }

    function displayCourses(courses) {
        coursesList.innerHTML = '';
        
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <h3>${course.name}</h3>
                <p><strong>Category:</strong> ${course.category}</p>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p><strong>Status:</strong> ${course.status}</p>
            `;
            
            courseCard.addEventListener('click', () => openCourseModal(course));
            coursesList.appendChild(courseCard);
        });
    }

    function filterCourses() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        
        const filtered = allCourses.filter(course => {
            const matchesSearch = course.name.toLowerCase().includes(searchTerm) || 
                               course.description.toLowerCase().includes(searchTerm);
            const matchesCategory = category === '' || course.category === category;
            
            return matchesSearch && matchesCategory;
        });
        
        displayCourses(filtered);
    }

    function openCourseModal(course) {
        currentSelectedCourse = course;
        modalCourseTitle.textContent = course.name;
        modalCourseDesc.textContent = course.description;
        
        // Display instructors
        instructorsList.innerHTML = '';
        course.instructors.forEach(instructor => {
            const instructorDiv = document.createElement('div');
            instructorDiv.className = 'instructor';
            instructorDiv.innerHTML = `
                <p><strong>${instructor.name}</strong> (${instructor.availableSlots} slots available)</p>
            `;
            instructorsList.appendChild(instructorDiv);
        });
        
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
        registrationMessage.textContent = '';
    }

    function registerForCourse() {
        if (!currentSelectedCourse) return;
        
        // Check if user has completed prerequisites
        const missingPrerequisites = currentSelectedCourse.prerequisites.filter(prereq => 
            !currentUser.completedCourses.some(c => c.code === prereq && c.grade >= 60)
        );
        
        if (missingPrerequisites.length > 0) {
            registrationMessage.textContent = `You must complete the following prerequisites: ${missingPrerequisites.join(', ')}`;
            registrationMessage.style.color = 'red';
            return;
        }
        
        // Check if course is open for registration
        if (currentSelectedCourse.status !== 'Open') {
            registrationMessage.textContent = 'This course is not currently open for registration';
            registrationMessage.style.color = 'red';
            return;
        }
        
        // Check if there are available instructors
        const availableInstructor = currentSelectedCourse.instructors.find(i => i.availableSlots > 0);
        if (!availableInstructor) {
            registrationMessage.textContent = 'No available instructors for this course';
            registrationMessage.style.color = 'red';
            return;
        }
        
        // Simulate successful registration
        registrationMessage.textContent = 'Registration successful! Waiting for administrator approval.';
        registrationMessage.style.color = 'green';
        
        // Update user's pending courses (in a real app, this would be saved to the server)
        if (!currentUser.pendingCourses) {
            currentUser.pendingCourses = [];
        }
        currentUser.pendingCourses.push({
            code: currentSelectedCourse.code,
            name: currentSelectedCourse.name,
            instructor: availableInstructor.name
        });
        
        // Update session storage
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update learning path display
        updateLearningPath();
    }

    function showCoursesSection() {
        coursesSection.classList.remove('hidden');
        learningPathSection.classList.add('hidden');
    }

    function showLearningPath() {
        coursesSection.classList.add('hidden');
        learningPathSection.classList.remove('hidden');
        updateLearningPath();
    }

    function updateLearningPath() {
        completedCoursesList.innerHTML = '';
        inProgressCoursesList.innerHTML = '';
        pendingCoursesList.innerHTML = '';
        
        // Display completed courses
        currentUser.completedCourses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = `${course.name} (Grade: ${course.grade})`;
            completedCoursesList.appendChild(li);
        });
        
        // Display in-progress courses (would come from server in real app)
        const inProgress = [
            { name: "Web Development", code: "CMPS350" }
        ];
        inProgress.forEach(course => {
            const li = document.createElement('li');
            li.textContent = course.name;
            inProgressCoursesList.appendChild(li);
        });
        
        // Display pending courses
        if (currentUser.pendingCourses) {
            currentUser.pendingCourses.forEach(course => {
                const li = document.createElement('li');
                li.textContent = `${course.name} (Instructor: ${course.instructor}) - Pending approval`;
                pendingCoursesList.appendChild(li);
            });
        }
    }

    function logout() {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
    
});
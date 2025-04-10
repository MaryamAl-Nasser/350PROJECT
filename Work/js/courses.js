document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Initialize empty arrays if they don't exist
    currentUser.completedCourses = currentUser.completedCourses || [];
    currentUser.inProgressCourses = currentUser.inProgressCourses || [];
    currentUser.pendingCourses = currentUser.pendingCourses || [];

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

    let allCourses = [];

    // Event listeners
    viewCoursesBtn.addEventListener('click', showCoursesSection);
    viewLearningPathBtn.addEventListener('click', function() {
        showLearningPath();
        updateLearningPath();
    });
    logoutBtn.addEventListener('click', logout);
    searchBtn.addEventListener('click', filterCourses);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') filterCourses();
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

    function showCoursesSection() {
        coursesSection.classList.remove('hidden');
        learningPathSection.classList.add('hidden');
    }

    function showLearningPath() {
        coursesSection.classList.add('hidden');
        learningPathSection.classList.remove('hidden');
    }

    function updateLearningPath() {
        completedCoursesList.innerHTML = currentUser.completedCourses.length > 0 ? 
            currentUser.completedCourses.map(c => `<li>${c.name} (Grade: ${c.grade})</li>`).join('') :
            '<li>No completed courses</li>';
            
        inProgressCoursesList.innerHTML = currentUser.inProgressCourses.length > 0 ?
            currentUser.inProgressCourses.map(c => `<li>${c.name}</li>`).join('') :
            '<li>No courses in progress</li>';
            
        pendingCoursesList.innerHTML = currentUser.pendingCourses.length > 0 ?
            currentUser.pendingCourses.map(c => `<li>${c.name}</li>`).join('') :
            '<li>No pending courses</li>';
    }

    function logout() {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }

    // Initial update of learning path
    updateLearningPath();
});
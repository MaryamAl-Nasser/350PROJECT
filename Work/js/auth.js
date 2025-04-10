document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');
    const regErrorMessage = document.getElementById('regErrorMessage');

    // Function to get all users (from both users.json and localStorage)
    async function getAllUsers() {
        try {
            // Get static users from users.json
            const response = await fetch('data/users.json');
            if (!response.ok) throw new Error('Network response was not ok');
            const staticUsers = await response.json();
            
            // Get dynamically registered users from localStorage
            const localStorageUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            
            // Combine both arrays
            return [...staticUsers, ...localStorageUsers];
        } catch (error) {
            console.error('Error loading users:', error);
            return [];
        }
    }

    // Handle login form
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (!username || !password) {
                errorMessage.textContent = 'Please enter both username and password';
                return;
            }

            errorMessage.textContent = 'Authenticating...';
            errorMessage.style.color = 'blue';
            
            try {
                const users = await getAllUsers();
                const user = users.find(u => u.username === username && u.password === password);
                
                if (user) {
                    // Store user data in sessionStorage
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    
                    // Redirect to courses page
                    window.location.href = 'courses.html';
                } else {
                    errorMessage.textContent = 'Invalid username or password';
                    errorMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Error:', error);
                errorMessage.textContent = 'Error loading user data. Please try again later.';
                errorMessage.style.color = 'red';
            }
        });
    }

    // Handle registration form
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('regUsername').value.trim();
            const password = document.getElementById('regPassword').value.trim();
            const confirmPassword = document.getElementById('regConfirmPassword').value.trim();
            const name = document.getElementById('regName').value.trim();
            const id = document.getElementById('regId').value.trim();

            // Validation
            if (!username || !password || !confirmPassword || !name || !id) {
                regErrorMessage.textContent = 'Please fill in all fields';
                return;
            }

            if (password !== confirmPassword) {
                regErrorMessage.textContent = 'Passwords do not match';
                return;
            }

            if (password.length < 6) {
                regErrorMessage.textContent = 'Password must be at least 6 characters';
                return;
            }

            regErrorMessage.textContent = 'Checking username availability...';
            regErrorMessage.style.color = 'blue';

            try {
                const users = await getAllUsers();
                
                // Check if username already exists
                if (users.some(u => u.username === username)) {
                    regErrorMessage.textContent = 'Username already exists';
                    regErrorMessage.style.color = 'red';
                    return;
                }

                // Check if ID already exists
                if (users.some(u => u.id === id)) {
                    regErrorMessage.textContent = 'Student ID already registered';
                    regErrorMessage.style.color = 'red';
                    return;
                }

                // Create new user object
                const newUser = {
                    username,
                    password,
                    role: "student",
                    name,
                    id,
                    completedCourses: [],
                    inProgressCourses: [],
                    pendingCourses: []
                };

                // Save to localStorage (simulating saving to users.json)
                const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
                registeredUsers.push(newUser);
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

                // Also store in sessionStorage and redirect
                sessionStorage.setItem('currentUser', JSON.stringify(newUser));
                regErrorMessage.textContent = 'Registration successful! Redirecting...';
                regErrorMessage.style.color = 'green';
                
                setTimeout(() => {
                    window.location.href = 'courses.html';
                }, 1500);
            } catch (error) {
                console.error('Error:', error);
                regErrorMessage.textContent = 'Error during registration. Please try again.';
                regErrorMessage.style.color = 'red';
            }
        });
    }

    // Add login link to register page if exists
    const loginLink = document.querySelector('a[href="index.html"]');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
});
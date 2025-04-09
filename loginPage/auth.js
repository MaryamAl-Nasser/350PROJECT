document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded"); // Check if script loads
    
    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    console.log("Login form element:", loginForm); // Should show the form element

    loginForm.addEventListener('submit', function(e) {
        console.log("Form submit triggered"); // Check if event fires
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        console.log("Username:", username, "Password:", password); // Verify values

        if (!username || !password) {
            errorMsg.textContent = 'Please enter both username and password';
            return;
        }

        console.log("Attempting login..."); // Track execution
        
        const loginBtn = loginForm.querySelector('button');
        loginBtn.disabled = true;
        loginBtn.textContent = 'Logging in...';

        fetch('data/users.json')
            .then(response => {
                console.log("Fetch response received");
                if (!response.ok) throw new Error('Network error');
                return response.json();
            })
            .then(users => {
                console.log("Users data loaded:", users);
                const user = users.find(u => u.username === username && u.password === password);
                
                if (user) {
                    console.log("Login successful, user:", user);
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    window.location.href = 'courses.html';
                } else {
                    console.log("Invalid credentials");
                    errorMsg.textContent = 'Invalid username or password';
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                errorMsg.textContent = 'Login failed. Please try again later.';
            })
            .finally(() => {
                console.log("Login attempt completed");
                loginBtn.disabled = false;
                loginBtn.textContent = 'Login';
            });
    });
    document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    // Sample user data (replace with your actual authentication)
    const sampleUser = {
        username: username,
        completedCourses: [
            { name: "Programming I", code: "CMPS151", grade: 85 },
            { name: "Calculus I", code: "MATH101", grade: 90 }
        ],
        inProgressCourses: [
            { name: "Web Development", code: "CMPS350" }
        ]
    };

    // Simple authentication check
    if (username && password) {
        sessionStorage.setItem('currentUser', JSON.stringify(sampleUser));
        window.location.href = 'courses.html';
    } else {
        errorMsg.textContent = 'Please enter both username and password';
    }
});
});
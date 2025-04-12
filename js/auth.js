document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    fetch('data/users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load users data');
            }
            return response.json();
        })
        .then(data => {
            const users = data;
            const user = users.find(user => user.username === username && user.password === password);

            const errorMessage = document.getElementById("errorMessage");

            if (user) {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                if (user.role === 'student') {
                    window.location.href = 'students.html'; 
                } else if (user.role === 'administrator') {
                    window.location.href = 'admin.html';
                } else if (user.role === 'instructor') {
                    window.location.href = 'instructor.html';
                } else {
                    errorMessage.textContent = "Unknown user role";
                    errorMessage.style.color = "skyblue";
                }
            } else {
                errorMessage.textContent = "Invalid username or password";
                errorMessage.style.color = "skyblue";
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            document.getElementById("errorMessage").textContent = "An error occurred. Please try again.";
            document.getElementById("errorMessage").style.color = "skyblue";
        });
});

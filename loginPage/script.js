document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            const users = data.users;
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                // Redirect based on user role
                if (user.role === 'student') {
                    document.location = '/mainPage/index.html'; 
                } else if (user.role === 'administrator') {
                    document.location= '/admin/index.html'; 
                } else if (user.role === 'instructor') {
                    document.location = '/gradeSubmission/index.html';
                }
            } else {
                document.getElementById("errorMsg").textContent = "Invalid username or password";
                document.getElementById("errorMsg").style.color = "red";
            }
        });
});

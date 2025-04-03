document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let response = await fetch('users.json');
    if (response.ok) {
        let users = await response.json();

   
        let user = users.users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            document.location = '/mainPage/index.html';  
        } else {
          
            document.getElementById('errorMsg').textContent = "Invalid username or password!";
        }
    } else {
        document.getElementById('errorMsg').textContent = "Failed to load user data. Please try again later.";
    }
});

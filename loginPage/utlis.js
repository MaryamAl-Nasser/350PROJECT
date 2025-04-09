/**
 * Utility functions for QU Student Management App
 */

// Format date to YYYY-MM-DD
function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

// Validate email format
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Get current semester
function getCurrentSemester() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    
    if (month >= 1 && month <= 5) {
        return `Spring ${year}`;
    } else if (month >= 8 && month <= 12) {
        return `Fall ${year}`;
    } else {
        return `Summer ${year}`;
    }
}

// Display notification message
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Debounce function for search inputs
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

// Export functions if using modules
// export { formatDate, isValidEmail, getCurrentSemester, showNotification, debounce };
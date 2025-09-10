import Notification from '../utils/notification.js';
// Toggle dark mode
const toggle = document.getElementById("modeToggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

window.onload = () => {
    const user = localStorage.getItem("sw_user") ? JSON.parse(localStorage.getItem("sw_user")) : null;
    if (user) {
        Notification.success(`Welcome back, ${user.Name}!`);
        setTimeout(() => {
            Notification.dismissAll();
        }, 2000);
    }
    else {
        window.location.href = "./login.html";
    }
};
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

const userIcon = document.getElementById("userIcon");
const userPopup = document.getElementById("userPopup");

// Toggle popup on click
userIcon.addEventListener("click", () => {
    userPopup.style.display =
        userPopup.style.display === "block" ? "none" : "block";
});

// Close popup when clicking outside
document.addEventListener("click", (event) => {
    if (!userIcon.contains(event.target) && !userPopup.contains(event.target)) {
        userPopup.style.display = "none";
    }
    if (settingsPanel.contains(event.target) || event.target === settingsPanel || event.target === document.querySelector(".user-popup a[href='#']")) {
        // Do nothing if clicking inside settings panel or on settings link
    } else {
        settingsPanel.style.display = "none";
    }
});

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
    // alert("Logging out...");
    // Yahan tum localStorage clear ya redirect kar sakte ho
    Notification.success("Logged out successfully!");
    setTimeout(() => {
        localStorage.removeItem("sw_user");
        Notification.dismissAll();
        window.location.href = "login.html";
    }, 2000);
});


const settingsPanel = document.getElementById("settingsPanel");
const themeToggle = document.getElementById("themeToggle");
const fontSelect = document.getElementById("fontSelect");
const languageSelect = document.getElementById("languageSelect");

// Open Settings when clicked in user popup
document.querySelector(".user-popup a[href='#']").addEventListener("click", (e) => {
    e.preventDefault();
    settingsPanel.style.display =
        settingsPanel.style.display === "block" ? "none" : "block";
});

// Theme toggle
themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("sw_theme", "dark");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("sw_theme", "light");
    }
});

// Font family change
fontSelect.addEventListener("change", () => {
    document.body.style.fontFamily = fontSelect.value;
    localStorage.setItem("sw_font", fontSelect.value);
});

// Restore settings on load
window.addEventListener("load", () => {
    if (localStorage.getItem("sw_theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.checked = true;
    }
    if (localStorage.getItem("sw_font")) {
        document.body.style.fontFamily = localStorage.getItem("sw_font");
        fontSelect.value = localStorage.getItem("sw_font");
    }

});

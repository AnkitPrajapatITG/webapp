import Notification from '../utils/notification.js';
const signupButton = document.querySelector("#signupButton");
const loginForm = document.querySelector("#loginForm");
const user = localStorage.getItem("sw_user") ? JSON.parse(localStorage.getItem("sw_user")) : null;
if (user) {
    window.location.href = "../html/home.html";
}

async function loginDbCall(data) {
    try {
        const loading = Notification.open({ type: 'loading', message: 'Logging in....' });
        const response = await axios.post("https://ewltest.vercel.app/api/v1/Auth/Login", data);
        if (response.data.success) {
            Notification.success(response.data.msg);
            localStorage.setItem("sw_user", JSON.stringify({ Email: data.Email, Name: "user" }))
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2000);
        } else {
            Notification.error(response.data.msg);
        }

    } catch (error) {
        Notification.error(error.message)
    } finally {
        setTimeout(() => {
            Notification.dismissAll();
        }, 2000);
    }
}
function loginHandler(event) {
    event.preventDefault(); // Prevent the default form submission
    const inputs = loginForm.getElementsByTagName("input");
    const data = {};
    Array.from(inputs).forEach((ele) => {
        data[ele.name] = ele.value;
    })
    loginDbCall(data);
}
function showSignup() {
    window.location.href = "../html/signup.html";
}
signupButton.addEventListener("click", showSignup);
loginForm.addEventListener("submit", loginHandler);
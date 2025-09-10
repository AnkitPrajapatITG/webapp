import Notification from '../utils/notification.js';
const Login = document.querySelector("#loginButton");
const SignupForm = document.querySelector("#SignupForm");
const user = localStorage.getItem("sw_user") ? JSON.parse(localStorage.getItem("sw_user")) : null;
if (user) {
    window.location.href = "../html/home.html";
}

async function signupDbCall(data) {
    try {
        const loading = Notification.open({ type: 'loading', message: 'Creating an account....' });
        const response = await axios.post("https://ewltest.vercel.app/api/v1/Auth/Signup", data);
        if (response.data.success) {
            Notification.success(response.data.msg);
            setTimeout(() => {
                window.location.href = "../html/login.html";
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
function signupHandler(event) {
    event.preventDefault(); // Prevent the default form submission
    const inputs = SignupForm.getElementsByTagName("input");
    const data = {};
    Array.from(inputs).forEach((ele) => {
        data[ele.name] = ele.value;
    })
    signupDbCall(data);
}
function showLogin() {
    window.location.href = "../html/login.html";
}
Login.addEventListener("click", showLogin);
SignupForm.addEventListener("submit", signupHandler);
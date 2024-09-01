import "../style.css";
import { login } from "../Apis/services/auth.service.js";
import { errorHandler } from '../libraries/errorHandler';
import { setSessionToken } from "../libraries/session-manager.js";

document.querySelector(".vector").addEventListener("click", () => {
  window.location.href = "index.html";
});

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('Password');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});


const loginForm = document.getElementById("login-inputs");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  

  const usernameInput = event.target.elements.userName;
    const passwordInput = event.target.elements.password;

  try {
    const response =  await login({
      username: usernameInput.value,
      password: passwordInput.value,
    });
    console.log(response);
    setSessionToken(response.token);
    window.location.href = "/home.html";
   
  } catch (error) {
    errorHandler(error);
  }
});

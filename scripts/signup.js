import "../style.css";
import { signup } from "../Apis/services/auth.service.js";
import { errorHandler } from '../libraries/errorHandler';
import { setSessionToken } from "../libraries/session-manager.js";

document.querySelector(".vector").addEventListener("click", () => {
  window.location.href = "login.html";
});

const signupForm = document.getElementById("signup-inputs");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const usernameInput = event.target.children[0];
  const passwordInput = event.target.children[1];

  try {
    const response = await signup({
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

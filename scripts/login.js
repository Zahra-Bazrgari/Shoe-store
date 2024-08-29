import '../style.css';
import { login } from "../apis/services/auth.service";
import { toast } from "../libs/toast";

const loginInputs = document.querySelector("form");
loginInputs.addEventListener("submit", (event) => {
    event.preventDefault();

    const userNameInput = event.target.children[1].value;
    const passWordInput = event.target.children[3].value;

    login({
        userName: userNameInput,
        password: passWordInput,
    });

    toast("test")
})
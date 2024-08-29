import '../style.css';
import axios from 'axios';
import Toastify from 'toastify-js'

const signUpInputs = document.querySelector('form');
signUpInputs.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const userName = event.target.children[0].value;
    const passWord = event.target.children[1].value;

    console.log('Username:', userName, 'Password:', passWord);

    // Toastify({
    //     text: "This is a toast",
    //     duration: 3000,
    //     close: true,
    //     style: {
    //       background: "linear-gradient(to right, #b00000, #c93d3d)",
    //     },
    //   }).showToast();
    
});

async function signUpFunction() {
    try{
        const response = await axios.get("");
        return response;
    } catch {
        console.log(error);
    }
}

signUpFunction();
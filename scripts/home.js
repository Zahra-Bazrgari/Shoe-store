import '../style.css';
import Swiper from 'swiper';
import 'swiper/css';
import { getUserInfo } from '../Apis/services/user.service.js';
import { errorHandler } from '../libraries/errorHandler.js';

async function main() {
    try {
        const response = await getUserInfo();
        console.log(response);
    } catch (error) {
        errorHandler(error);
    }
}

async function displayGreeting() {
    const greetingElement = document.getElementById('greeting');
    const userNameElement = document.querySelector('.username');
    const response = await getUserInfo();
    const userName = response.username;
    const currentTime = new Date();
    const hour = currentTime.getHours();
    let greeting;

    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good night";
    }

    greetingElement.textContent = `${greeting}`;
    userNameElement.textContent = `${userName}!`;
}


document.addEventListener('DOMContentLoaded', () => {
    main(); 
    displayGreeting(); 
});
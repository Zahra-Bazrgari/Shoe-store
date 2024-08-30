import '../style.css';
import Swiper from 'swiper';
import 'swiper/css';
import { getUserInfo } from '../Apis/services/user.service.js';
import { errorHandler } from '../libraries/errorHandler.js';

// document.addEventListener('DOMContentLoaded', () => {
//     const swiperContainer = document.querySelector('.swiper-container');
    
//     if (!swiperContainer) {
//         console.error('Swiper container not found');
//         return;
//     }

//     console.log('Swiper container found:', swiperContainer);

//     const swiper = new Swiper('.swiper-container', {
//         slidesPerView: 'auto',
//         spaceBetween: 10,
//         freeMode: true,
//     });

//     document.getElementById('see-all-btn').addEventListener('click', () => {
//         swiperContainer.classList.remove('overflow-x-hidden');
//         swiperContainer.classList.add('overflow-x-auto');
//         swiperContainer.scrollLeft = 0;
//     });
// });

// async function getGreeting() {
//     const hours = new Date().getHours();
//     let greeting = 'Good day';

//     if (hours < 12) {
//         greeting = 'Good morning';
//     } else if (hours < 18) {
//         greeting = 'Good afternoon';
//     } else {
//         greeting = 'Good night';
//     }

//     const sessionToken = getSessionToken(response.token);

//     try {
//         const response = await axios.get('http://localhost:3000/user', {
//             headers: {
//                 'Authorization': `Bearer ${sessionToken}`
//             }
//         });
//         document.querySelector('username').innerText = `${greeting}, ${response.data.username}`
  
//       } catch (error) {
//         console.log(error);
//       }
// }


async function main(){
    try{
        const response = await getUserInfo();
        console.log(response);
    } catch (error) {
        errorHandler(error);
    }
}

main()
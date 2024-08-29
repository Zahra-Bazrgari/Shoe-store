import '../style.css';
import Swiper from 'swiper';
import 'swiper/css';

document.addEventListener('DOMContentLoaded', () => {
    const swiperContainer = document.querySelector('.swiper-container');
    
    if (!swiperContainer) {
        console.error('Swiper container not found');
        return;
    }

    console.log('Swiper container found:', swiperContainer); // Debugging line

    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        freeMode: true,
    });

    document.getElementById('see-all-btn').addEventListener('click', () => {
        swiperContainer.classList.remove('overflow-x-hidden');
        swiperContainer.classList.add('overflow-x-auto');
        swiperContainer.scrollLeft = 0;
    });
});
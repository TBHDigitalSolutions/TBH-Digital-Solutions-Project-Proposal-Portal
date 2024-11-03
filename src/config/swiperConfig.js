// src/config/swiperConfig.js

import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Check if the device is touch-enabled
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Swiper configuration object
const swiperConfig = {
  modules: [Navigation, Pagination],
  
  // General settings
  spaceBetween: 20,
  slidesPerView: 'auto',
  centeredSlides: true,
  
  // Pagination settings
  pagination: {
    clickable: true,
  },
  
  // Navigation settings
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Breakpoints for responsive design
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 10, centeredSlides: false },
    640: { slidesPerView: 1.5, spaceBetween: 15, centeredSlides: true },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 30 },
    1280: { slidesPerView: 4, spaceBetween: 40 },
  },

  // Event handlers
  on: {
    beforeInit(swiper) {
      const viewportWidth = window.innerWidth;
      swiper.params.slidesPerView = viewportWidth < 640 ? 1 : viewportWidth < 1024 ? 1.5 : 3;
      swiper.params.spaceBetween = viewportWidth < 640 ? 10 : viewportWidth < 1024 ? 20 : 30;
    },

    resize(swiper) {
      swiper.update();
    },

    slideChange(swiper) {
      console.log('Slide changed to index:', swiper.activeIndex);
    },

    afterInit(swiper) {
      const { nextEl, prevEl } = swiper.navigation;

      // Apply Tailwind styling to navigation buttons
      [nextEl, prevEl].forEach((button) => {
        if (button) {
          button.classList.add(
            'bg-logo-blue', // Primary brand color for navigation
            'text-white',
            'p-3',
            'rounded-full',
            'shadow-lg',
            'transition-all',
            'duration-300',
            'hover:bg-blue-600'
          );
        }
      });

      // Adjust button size for mobile view
      if (isTouchDevice) {
        if (nextEl) nextEl.style.transform = 'scale(0.85)';
        if (prevEl) prevEl.style.transform = 'scale(0.85)';
      }
    },
  },
};

export default swiperConfig;

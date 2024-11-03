import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';  // Core Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import swiperConfig from '../config/swiperConfig'; // Import the Swiper configuration

// Register Swiper modules
SwiperCore.use([Navigation, Pagination]);

const MySwiperComponent = () => {
  return (
    <div className="w-full md:w-3/4 lg:w-2/3 mx-auto my-4">
      <Swiper
        {...swiperConfig}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {/* Example slides with Tailwind styling */}
        <SwiperSlide className="bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
          Slide 1
        </SwiperSlide>
        <SwiperSlide className="bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
          Slide 2
        </SwiperSlide>
        <SwiperSlide className="bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
          Slide 3
        </SwiperSlide>

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev text-logo-blue bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"></div>
        <div className="swiper-button-next text-logo-blue bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"></div>

        {/* Pagination dots */}
        <div className="swiper-pagination mt-4"></div>
      </Swiper>
    </div>
  );
};

export default MySwiperComponent;

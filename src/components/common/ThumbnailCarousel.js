// src/components/common/ThumbnailCarousel.js

import React, { useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CustomPrevArrow, CustomNextArrow } from './CustomArrows';

const ThumbnailCarousel = ({ thumbnails, onThumbnailClick }) => {
  const handleThumbnailClick = useCallback(
    (index) => {
      onThumbnailClick(index);
    },
    [onThumbnailClick]
  );

  const settings = {
    lazyLoad: 'ondemand',
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="thumbnail-carousel w-full">
      {thumbnails && thumbnails.length > 0 ? (
        <Slider {...settings}>
          {thumbnails.map((thumbnail, index) => (
            <div key={index} onClick={() => handleThumbnailClick(index)} className="px-2">
              <img
                src={thumbnail.image || thumbnail.thumbnail}
                alt={thumbnail.alt || `Thumbnail ${index + 1}`}
                loading="lazy"
                className="w-[120px] h-[120px] object-cover rounded-lg cursor-pointer shadow-md transition-transform transform hover:scale-105"
              />
            </div>
          ))}
        </Slider>
      ) : null}
    </div>
  );
};

export default React.memo(ThumbnailCarousel);

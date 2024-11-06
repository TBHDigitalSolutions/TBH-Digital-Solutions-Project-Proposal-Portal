// src/components/common/ModalPopup.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ModalPopup = ({ media, isOpen, onClose, initialIndex }) => {
  const [mainSlider, setMainSlider] = useState(null);
  const [navSlider, setNavSlider] = useState(null);

  const mainSettings = {
    asNavFor: navSlider,
    ref: (slider) => setMainSlider(slider),
    initialSlide: initialIndex,
    slidesToShow: 1,
    swipeToSlide: true,
  };

  const navSettings = {
    asNavFor: mainSlider,
    ref: (slider) => setNavSlider(slider),
    slidesToShow: 4,
    swipeToSlide: true,
    centerMode: true,
    focusOnSelect: true,
    infinite: true,
  };

  return (
    isOpen && (
      <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="modal-content bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg mx-auto overflow-auto">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">&times;</button>
          <Slider {...mainSettings} className="main-slider">
            {media.map((item, index) => (
              <div key={index}>
                {item.videoUrl ? (
                  <video src={item.videoUrl} controls className="rounded-lg shadow-lg max-h-[80vh]" />
                ) : (
                  <img src={item.image} alt={item.alt || `Media ${index + 1}`} className="rounded-lg shadow-lg max-h-[80vh]" />
                )}
              </div>
            ))}
          </Slider>
          <Slider {...navSettings} className="thumbnail-slider mt-4">
            {media.map((item, index) => (
              <div key={index}>
                <img src={item.thumbnail || item.image} alt={item.alt || `Thumbnail ${index + 1}`} className="cursor-pointer rounded-md shadow-md" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    )
  );
};

export default ModalPopup;

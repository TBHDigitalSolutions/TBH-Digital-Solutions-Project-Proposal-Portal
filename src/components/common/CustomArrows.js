// src/components/common/CustomArrows.js

import React from 'react';

export const CustomPrevArrow = (props) => (
  <button {...props} className="slick-prev custom-arrow left-arrow">
    <img src="/icons/navigate_next-24px.svg" alt="Previous" className="w-6 h-6 transform scale-x-[-1]" />
  </button>
);

export const CustomNextArrow = (props) => (
  <button {...props} className="slick-next custom-arrow">
    <img src="/icons/navigate_next-24px.svg" alt="Next" className="w-6 h-6" />
  </button>
);

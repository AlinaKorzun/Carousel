import React from 'react';

export default ({ slide, transform }) => {
    transform = Math.max(transform, 0);

    return (
        <div className="JsxCarousel__slider__active"
             style={{ transform: `translateX(${transform}px)` }}
        >{slide.el}</div>
    );
};

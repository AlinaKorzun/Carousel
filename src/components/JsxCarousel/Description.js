import React from 'react';

export default ({ slide }) => (
    <div className="JsxCarousel__description">
        <div>
            <div>{slide.description.leftTitle}</div>
            <div>{slide.description.team}</div>
        </div>
        <div>
            <div>{slide.description.rightTitle}</div>
            <div>{slide.description.appName}</div>
            <div>{slide.description.descriptionText}</div>
        </div>
    </div>
);
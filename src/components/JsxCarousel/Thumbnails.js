import React from 'react';

const Thumbnail = ({ slide, isActive, onSelect }) => (
    <li className={'JsxCarousel__thumbnails__thumbnail' + (isActive ? ' active' : '')}>
        <div style={{ background: `url(${slide.thumbnail})` }}
             onClick={onSelect}/>
        <span>{slide.description.team}</span>
    </li>
);

const Thumbnails = ({ slides, active, onSelect }) => (
    <ul>
        {
            slides.map((it, ix) =>
                <Thumbnail key={it.thumbnail} onSelect={() => onSelect(ix)} isActive={ix === active} slide={it}/>
            )
        }
    </ul>
);

export default props =>
    <div className="JsxCarousel__thumbnails">
        <Thumbnails {...props}/>
    </div>;
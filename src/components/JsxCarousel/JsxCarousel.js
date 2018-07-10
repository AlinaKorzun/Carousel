import React, {Component} from 'react';
import './JsxCarousel.css';
import Thumbnails from './Thumbnails';
import Description from './Description';
import Slide from './Slide';
import PrevSlides from './PrevSlides';
import ActiveSlide from './ActiveSlide';
import Slides from './Slides';

const PrevSlide = ({slide}) => <div className="JsxCarousel__slider__prev">{slide.el}</div>;

class JsxCarousel extends Component {

    width = 10;
    state = {
        current: 0,
        left: 0,
        initialX: null,
        inMotion: false,
        timer: null,
        swipe: false,
        velocity: 40,
        click: false,
        thumb_active: 0
    };

    componentWillMount() {
        this.props.slides.forEach(it => it.el = <Slide key={it.url} {...it}/>)
    }

    componentDidMount() {
        const slide = document.querySelector('.JsxCarousel__Slide');
        this.width = slide.offsetWidth;
    }

    handleMotionStart = (clientX) => {
        this.setState({initialX: clientX, inMotion: true, click: true});
    };

    handleTouchStart = (touchStartEvent) => {
        touchStartEvent.preventDefault();
        this.handleMotionStart(touchStartEvent.targetTouches[0].clientX);
    };

    handleMouseDown = (mouseDownEvent) => {
        mouseDownEvent.preventDefault();
        this.handleMotionStart(mouseDownEvent.clientX);
    };

    handleMove = (clientX) => {
        if (!this.state.inMotion)
            return;
        const x = clientX - this.state.initialX;

        if (x < 0) {
            this.setState({swipe: true});
        }

        this.setState({left: x});

        if (x < (-.8 * this.width)) {
            this.handleEnd();
        }

        if (x > (.8 * this.width)) {
            this.handleEnd();
        }
    };

    handleTouchMove = (touchMoveEvent) => {
        this.handleMove(touchMoveEvent.targetTouches[0].clientX);
    };

    handleMouseMove = (mouseMoveEvent) => {
        this.handleMove(mouseMoveEvent.clientX);
    };

    handleEnd = () => {
        if (!this.state.inMotion)
            return;

        if (this.state.left < (this.width * -.3)) {
            this.animateToNext();
        }

        else if (this.state.left > (this.width * .3)) {
            this.animateToPrev();
        }
        else
            this.setState({
                initialX: null,
                inMotion: false,
                click: false,
                timer: window.setInterval(this.animateSlidingToZero, 1)
            });
    };

    animateToNext = () => {
        const next = (this.state.current + 1) % this.props.slides.length;
        window.requestAnimationFrame(this.animateTo((-1 * this.width), this.state.current, next, true, next, performance.now())) ||
        window.mozRequestAnimationFrame(this.animateTo((-1 * this.width), this.state.current, next, true, next, performance.now())) ||
        window.oRequestAnimationFrame(this.animateTo((-1 * this.width), this.state.current, next, true, next, performance.now())) ||
        window.msRequestAnimationFrame(this.animateTo((-1 * this.width), this.state.current, next, true, next, performance.now()));
        this.setState({inMotion: false})
    };

    animateToNextClick = () => {
        if (!this.state.swipe && !this.state.click) {
            this.animateToNext()
        }
    };

    animateToPrev = () => {
        const prev = this.state.current === 0 ? this.props.slides.length - 1 : this.state.current - 1;
        window.requestAnimationFrame(this.animateTo(this.width, this.state.current, prev, true, prev, performance.now())) ||
        window.mozRequestAnimationFrame(this.animateTo(this.width, this.state.current, prev, true, prev, performance.now())) ||
        window.oRequestAnimationFrame(this.animateTo(this.width, this.state.current, prev, true, prev, performance.now())) ||
        window.msRequestAnimationFrame(this.animateTo(this.width, this.state.current, prev, true, prev, performance.now()))
    };

    animateSlidingToZero = () => {
        let {left, timer} = this.state;

        if (left > (-1 * this.state.velocity) && left < this.state.velocity) {
            window.clearInterval(timer);
            this.setState({left: 0, timer: null});
            return;
        }

        if (left < 0.01)
            left += this.state.velocity;
        else
            left -= this.state.velocity;

        this.setState({left});
    };

    onSlideSelect = (ix) => {
        let width = 0,
            one = true;

        let i = 0,
            max = ix;

        if (ix === this.state.current) {
            return;
        }

        if (!this.state.click) {
            this.setState({click: true});

            if ((ix > this.state.current))
                width = (-1 * this.width);

            else if (ix < this.state.current)
                width = this.width;

            i = (ix > this.state.current) ? (this.state.current + 1) : (this.state.current - 1);

            if (Math.abs(ix - this.state.current) > 1) {

                one = false;
                window.requestAnimationFrame(this.animateTo(width, this.state.current, i, one, max, performance.now())) ||
                window.mozRequestAnimationFrame(this.animateTo(width, this.state.current, i, one, max, performance.now())) ||
                window.oRequestAnimationFrame(this.animateTo(width, this.state.current, i, one, max, performance.now())) ||
                window.msRequestAnimationFrame(this.animateTo(width, this.state.current, i, one, max, performance.now()))
            } else {
                one = true;
                window.requestAnimationFrame(this.animateTo(width, this.state.current, i, one, max, performance.now())) ||
                window.mozRequestAnimationFrame(this.animateTo(width, this.state.current, i, one, max, performance.now())) ||
                window.oRequestAnimationFrame(this.animateTo(width, this.state.current, i, one, max, performance.now())) ||
                window.msRequestAnimationFrame(this.animateTo(width, this.state.current, i, one, max, performance.now()))
            }
        }
    };

    animateTo = (dst, current, next, one, final, now) => {
        return () => {
            let left = this.state.left,
                that = this;

            if (dst < 0) {
                if (left <= dst) {
                    this.setState({
                        current: next,
                        thumb_active: final,
                        left: 0,
                        initialX: null,
                        inMotion: false,
                        velocity: 40,
                        click: false
                    }, () => {
                        this.onSlideSelect(final)
                    });
                    return;
                }
            } else {
                if (left >= dst) {
                    this.setState({
                        current: next,
                        thumb_active: final,
                        left: 0,
                        initialX: null,
                        inMotion: false,
                        velocity: 40,
                        click: false
                    }, () => {
                        if (final === next + 1)
                            return;
                        this.onSlideSelect(final)
                    });
                    return;
                }
            }

            let velocity = 0,
                divide = 1;

            if (this.width < 700) {
                divide = 2
            }

            if (one) {
                velocity = (Math.abs(that.state.left) > (that.width * .6)) ? that.state.velocity = 25 / divide : that.state.velocity = 50 / divide;
            } else {
                velocity = Math.abs(final - this.state.current) > 1 ? this.state.velocity = 80 / divide : this.state.velocity = 45 / divide
            }

            if(dst < 0) {
                left = left - velocity;
                if(left < dst) {
                    left = dst
                }

            } else{
                left = left + velocity
            }

            this.setState({
                left: left,
                velocity: velocity,
                inMotion:false,
                initialX: null,
                swipe: false
            }, () => {
                window.requestAnimationFrame(that.animateTo(dst, this.state.current, next, one, final, performance.now())) ||
                window.mozRequestAnimationFrame(that.animateTo(dst, this.state.current, next, one, final, performance.now())) ||
                window.oRequestAnimationFrame(that.animateTo(dst, this.state.current, next, one, final, performance.now())) ||
                window.msRequestAnimationFrame(that.animateTo(dst, this.state.current, next, one, final, performance.now()))
            });
        }
    };

    handleTouchEnd = () => {
        this.handleEnd();
    };

    handleMouseUp = () => {
        this.handleEnd();
    };

    handleMouseLeave = () => this.handleMouseUp();

    render() {
        const {slides} = this.props;
        const {current, left, thumb_active} = this.state;
        const selected = slides[current];
        const prev = slides[current === 0 ? slides.length - 1 : current - 1];

        return (
            <div className="JsxCarousel">
                <div className="JsxCarousel__wrapper">
                    <div className="JsxCarousel__slider"
                         onTouchStart={this.handleTouchStart}
                         onTouchMove={this.handleTouchMove}
                         onTouchEnd={this.handleTouchEnd}
                         onMouseDown={this.handleMouseDown}
                         onMouseMove={this.handleMouseMove}
                         onMouseUp={this.handleMouseUp}
                         onMouseLeave={this.handleMouseLeave}
                    >
                        <PrevSlide slide={prev}/>
                        <ActiveSlide slide={selected} transform={left}/>
                        <Slides slides={slides} ix={current} transform={left} onClick={this.animateToNextClick}/>
                    </div>
                    <Description slide={selected}/>
                </div>
                <Thumbnails slides={slides} active={thumb_active} onSelect={this.onSlideSelect}/>
            </div>
        );
    }
}

export default JsxCarousel;
import React, {PureComponent} from 'react';

class Slides extends PureComponent {

    render() {
        const {slides, ix} = this.props;
        const list = [...slides];
        var myList = [];

        // console.log(list)

        for (let i = 0; i <= ix; i++) {
            const img = list.shift();

            list.push(img);
            myList = list.slice(0, 2);
        }

        return (
            <div className="JsxCarousel__slider__slides"
                 style={{transform: `translateX(${this.props.transform}px)`}}
                 onClick={this.props.onClick}
            >{myList.map(it => it.el)}</div>
        );
    }

}

export default Slides;
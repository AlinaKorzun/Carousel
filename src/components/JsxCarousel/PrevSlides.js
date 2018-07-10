import React, {PureComponent} from 'react';

class PrevSlides extends PureComponent {

    render() {
        const {slides, ix} = this.props;
        const list = [...slides];

        const list_reverce = list.reverse();

        for (let i = 0; i < ix; i++) {
            const img = list_reverce.pop();

            list_reverce.unshift(img);

        }
        // console.log(list_reverce)
        return (
            <div className="JsxCarousel__prev__slides"
                 style={{transform: `translateX(${this.props.transform}px)`}}
            >{list_reverce.map(it => it.el)}</div>
        );
    }

}

export default PrevSlides;
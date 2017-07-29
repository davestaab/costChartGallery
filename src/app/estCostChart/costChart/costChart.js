import d3 from 'd3';

export default class Chart() {

    constructor(){
        this._width = 500;
        this._height = 300;
        this._xScale = d3.scale.linear();
    }

    render(entry) {

    }

    // properties
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
    }

    get height() {
        return this._height;
    }
    set height(h) {
        this._height = h;
    }

    get xScale() {
        return this._xScale;
    }
    set xScale(x) {
        this._xScale = x;
    }

}

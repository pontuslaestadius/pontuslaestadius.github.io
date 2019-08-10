
export default class Boundry {
    x: number
    y: number
    w: number
    h: number

    constructor(
        x: number,
        y: number,
        w: number,
        h: number,
    ) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    centerPoint() {
        return {
            x: this.x + this.w / 2,
            y: this.y + this.h / 2,
        }
    }

    contains(other: Boundry) {
        let {x,y,w,h} = other
        return (x + w >= this.x &&
                x + w <= this.x + this.w &&
                y + h >= this.y &&
                y + h <= this.y + this.h)
    }

    intersects(other: Boundry) {
        let {x,y,w,h} = other
        let t = this;
        return !(x-w > t.x+t.w ||
                 x+w < t.x-t.w ||
                 y-h > t.y+t.h ||
                 y+h < t.y-t.h)
    }
}

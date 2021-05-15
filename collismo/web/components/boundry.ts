
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
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    get xw() {
        return this.x + this.w
    }

    get yh() {
        return this.y + this.h
    }

    centerPoint() {
        return {
            x: this.xw / 2,
            y: this.yh / 2,
        }
    }

    contains(other: Boundry) {
        let { x, y, w, h } = other
        return (x + w >= this.x &&
            x + w <= this.xw &&
            y + h >= this.y &&
            y + h <= this.yh)
    }

    intersectsY(other: Boundry) {
        let { y, h } = other
        let t = this
        return !(y > t.yh ||
            y + h < t.y - t.h)
    }

    intersectsX(other: Boundry) {
        let { x, w } = other
        let t = this
        return !(x - w > t.x + t.w ||
            x + w < t.x - t.w)
    }

    intersects(other: Boundry) {
        let { x, y, w, h } = other
        let t = this
        return !(x - w > t.x + t.w ||
            x + w < t.x - t.w ||
            y > t.yh ||
            y + h < t.y - t.h)
    }

    intersectValues(other: Boundry): { x: number, y: number } {
        let { x, y, w, h } = other
        let t = this
        let result: { x: number, y: number } = { x: 0, y: 0 }
        if (!this.intersects(other)) {
            return result
        }
        // if (t.x + t.w > x && t.x + t.w < x + w && !(x < t.x && x + w > t.x + t.w)) {
        //     console.log("case 1", t.x, x, t.w, w)
        //     intersectX = (t.x + t.w) - x
        // } else if (x + w > t.x && x + w < t.x - t.w) {
        //     console.log("case 2")
        //     intersectX = (t.x - t.w) - (x + w)
        // }
        if (t.y + t.h > y && t.y + t.h < y + h) {
            result.y = (t.y + t.h) - y
        } else if (false && y + h < t.y - t.h) {
            result.y = (t.y - t.h) - (y + h)
        }
        return result
    }
}

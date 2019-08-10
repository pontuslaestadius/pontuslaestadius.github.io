import Helper from './helper'
import Boundry from './boundry'

interface velocity {
    x: number,
    y: number,
}

export default class Entity extends Boundry {
    v: velocity
    duration: number
    infinite: boolean
    collisions: number[]
    id: number
    x: number
    y: number
    w: number
    h: number

    constructor(
        x: number,
        y: number,
        w: number,
        h: number,
        duration: number = -1,
    ) {
        super(x, y, w, h)
        this.duration = duration;
        this.v = {x: 0, y: 0}
        this.id =  Helper.roll(100000),
        this.infinite = this.duration === -1,
        // @ts-ignore
        window.objects.push({object: this});
    }

    timeout() {
        if (this.infinite) {
            return;
        }
        this.duration -= Helper.delta(5);
        if (this.duration < 0) {
            this.destructor();
        }
    }

    velocity() {
        if (Math.abs(this.v.x) < 0.1) {
            this.v.x = 0;
        }
        if (Math.abs(this.v.y) < 0.1) {
            this.v.y = 0;
        }
        this.x += Math.floor(this.v.x);
        this.y += Math.floor(this.v.y);
    }

    xwv() {
        return this.x + this.w + this.v.x;
    }

    yhv() {
        return this.y + this.h + this.v.y;
    }

    yh() {
        return this.y + this.h;
    }

    calc() {}

    outline() {
        // @ts-ignore
        ctx.fillStyle = "rgb(200, 200, 0)";
        // @ts-ignore
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgb(0,0,255)";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    onCollide(other: Entity) {}

    destructor() {
        // @ts-ignore
        objects.splice(objects.findIndex(x => x.id === this.id), 1);
    }

}

import Helper from './helper'
import Entity from './entity'

export default class Weather extends Entity {
    x: number
    y: number
    w: number
    h: number

    constructor() {
        // @ts-ignore
        super(Helper.roll(c.width * 1.2), Helper.roll(c.height), 2, 2, -1)
        this.v.x = -30 + Helper.roll(3)
        this.v.y = 30 + Helper.roll(3)
        this.h = 30 + Helper.roll(10);
        this.w = 20 + Helper.roll(10);
    }

    calc() {
        // @ts-ignore
        if (this.y > c.height) {
            this.reset()
        }
    }

    velocity() {
        this.x += Math.floor(this.v.x)
        this.y += Math.floor(this.v.y)
    }

    reset() {
        // @ts-ignore
        this.x = Helper.roll(c.width * 1.2)
        // @ts-ignore
        this.y = Helper.roll(c.height / 4)
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = `rgb(0, 60, 150)`
        // ctx.fillRect(this.x - this.w / 2, this.y, this.w, this.h)
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.w, this.yh);
        ctx.stroke();
    }

    onCollide(other: Entity) {
        this.reset()
    }

    debugRender(ctx: CanvasRenderingContext2D) { }

}

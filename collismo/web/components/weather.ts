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
        this.v.x = -10 + Helper.roll(3)
        this.v.y = 4 + Helper.roll(3)
    }

    calc() {
        // @ts-ignore
        if (this.y > c.height) {
            this.reset()
        }
    }

    reset() {
        // @ts-ignore
        this.x = Helper.roll(c.width * 1.2)
        // @ts-ignore
        this.y = Helper.roll(c.height / 4)
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle=`rgb(0, 40, 255)`
        ctx.fillRect(this.x - this.w/2, this.y, this.w, this.h)
    }

    onCollide(other: Entity) {
        this.reset()
    }

    debugRender(ctx: CanvasRenderingContext2D) {}

}

import Helper from './helper'
import Entity from './entity'

export default class Particle extends Entity {
    x: number
    y: number
    w: number
    h: number
    alpha: number
    maxed: boolean
    d: number

    constructor(
        x: number = 0,
        y: number = 0,
        w: number = 2,
        h: number = 2,
        duration: number = -1,
    ) {
        // @ts-ignore
        super(Helper.roll(x * 1.2), Helper.roll(y * 1.2), w, h, duration, 0.01)
        this.d = Helper.roll(1, 10) * 0.01
        this.reset(true)
    }

    calc() {
        const { alpha, maxed, duration, d } = this
        this.alpha -= maxed ? d : -d
        if (alpha > 0.8) {
            this.maxed = true
        }
        if (this.alpha <= 0.00) {
            if (duration === -1) {
                this.reset(true)
            }
        }
    }

    reset(xy: boolean) {
        if (xy) {
            // @ts-ignore
            this.x = Helper.roll(c.width * 1.2)
            // @ts-ignore
            this.y = Helper.roll(c.height) - 20
            this.v.x = Helper.roll(2) - 6
            this.v.y = Helper.roll(2) + 1
        } else {
            this.v.x = -2 + Helper.roll(4)
            this.v.y = -2 + Helper.roll(4)
        }
        this.alpha = 0.1
        this.maxed = false
    }

    render(ctx: CanvasRenderingContext2D) {
        const { alpha, x, y, w, h } = this
        ctx.fillStyle = Helper.rgb(250, 250, 220)
        ctx.globalAlpha = alpha
        ctx.fillRect(x, y, w, h)
        ctx.globalAlpha = 1
    }

    onCollideHook() {
        this.maxed = true;
        this.alpha -= this.d * 2
    }

}

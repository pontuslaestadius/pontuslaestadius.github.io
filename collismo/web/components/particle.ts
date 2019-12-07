import Helper from './helper'
import Entity from './entity'

export default class Particle extends Entity {
    x: number
    y: number
    w: number
    h: number
    alpha: number
    maxed: boolean

    constructor(
        x: number = 0,
        y: number = 0,
        w: number = 2,
        h: number = 2,
        duration: number = -1,
    ) {
        // @ts-ignore
        super(x, y, w, h, duration, 0.01)
        this.reset(false)
    }

    calc() {
        this.alpha -= this.maxed ? 0.01 : -0.01
        if (this.alpha > 0.8) {
            this.maxed = true
        }
        if (this.alpha <= 0.00) {
            if (this.duration === -1) {
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
        ctx.fillStyle=`rgb(250, 250, 220)`
        ctx.globalAlpha=this.alpha
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.globalAlpha=1
    }

    onCollide(other: Entity) {
        this.maxed = true;
        this.alpha -= 0.2
    }

}

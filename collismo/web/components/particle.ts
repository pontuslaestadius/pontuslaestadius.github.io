import Helper from './helper'
import Entity from './entity'

export default class Particle extends Entity {
    x: number
    y: number
    w: number
    h: number
    alpha: number
    maxed: boolean

    constructor() {
        // @ts-ignore
        super(0, 0, 2, 2, -1)
        this.reset()
    }

    calc() {
        this.alpha -= this.maxed ? 0.01 : -0.01
        if (this.alpha > 0.8) {
            this.maxed = true
        }
        // @ts-ignore
        if (this.y > c.height - 50 || this.x < 0) {
            this.alpha -= 0.05
        }

        if (this.alpha <= 0.00) {
            this.reset()
        }

    }

    reset() {
        // @ts-ignore
        this.x = Helper.roll(c.width * 1.2)
        // @ts-ignore
        this.y = Helper.roll(c.height) - 20
        this.v.x = Helper.roll(2) -6
        this.v.y =  Helper.roll(2) +1
        this.alpha = 0.1;
        this.maxed = false
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle=`rgb(250, 250, 220)`
        ctx.globalAlpha=this.alpha
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.globalAlpha=1
    }

    onCollide(other: Entity) {
        this.reset()
    }

}

import Helper from './helper'
import Boundry from './boundry'

interface velocity {
    x: number,
    y: number,
}

export default class Entity extends Boundry {
    collisions: number[]
    duration: number
    fixed: boolean
    h: number
    id: number
    infinite: boolean
    mass: number
    v: velocity
    w: number
    x: number
    y: number

    constructor(
        x: number = 0,
        y: number = 0,
        w: number = 10,
        h: number = 10,
        duration: number = -1,
        mass: number = 1,
        fixed: boolean = false,
    ) {
        super(x, y, w, h)
        this.duration = duration
        this.v = {x: 0, y: 0}
        this.id =  Helper.roll(100000)
        this.infinite = this.duration === -1
        this.mass = mass
        this.fixed = fixed
        // @ts-ignore
        window.objects.push({object: this})
    }

    timeout() {
        if (this.infinite) {
            return
        }
        this.duration -= Helper.delta(5);
        if (this.duration < 0) {
            this.destructor()
        }
    }

    velocity() {
        if (this.fixed) {
            return
        }

        if (!this.hasVelocity) {
            return
        }

        // this.v.y += 0.5 + 0.01 * (1 + this.mass)
        // this.v.y = Math.max(Math.min(this.v.y, 10), -10)

        this.x += Math.floor(this.v.x)
        this.y += Math.floor(this.v.y)
    }

    xwv() {
        return this.x + this.w + this.v.x
    }

    yhv() {
        return this.y + this.h + this.v.y
    }

    get xw() {
        return this.x + this.w
    }

    get yh() {
        return this.y + this.h
    }

    get vy() {
        return this.v.y
    }

    get vx() {
        return this.v.x
    }

    get hasVelocity() {
        return Math.floor(this.v.x + this.v.y) !== 0
    }

    calc() {}

    outline() {
        // @ts-ignore
        let ctx = window.ctx;
        ctx.fillStyle = "rgb(200, 200, 0)"
        // @ts-ignore
        const {x,y,w,h} = this;
        ctx.fillRect(x, y, w, 1)
        ctx.fillRect(x, y, 1, h)
        ctx.fillRect(x+w-1, y, 1, h)
        ctx.fillRect(x, y+h-1, w, 1)
    }

    impulse(other: Entity) {
        if (other.yh >= this.yh && this.vy !== 0) {
            this.v.y = -this.v.y/4
            this.v.x /= 2
            // } else if (this.vx !== 0) {
            //     // this.v.x = -this.vx/4
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        // Default render method. Yey/ney?
        // ctx.fillStyle = "rgb(0,0,255)"
        // ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    onCollideHook() {

    }

    onCollide(other: Entity) {
        this.onCollideHook()

        if (this.fixed) {
            return
        }

        // @ts-ignore
        const fn: any = (key: any, k2: any) => {
            // @ts-ignore
            const deltaMass: number =
                  Math.max(Math.min(other.mass - this.mass, 5), -5)
            // @ts-ignore
            const interSectionDistance: number =
                  // @ts-ignore
                  Math.max(Math.min(this[key] + this[k2] - other[key], 25), -25)
            // @ts-ignore
            const value: number =
                  Math.max(Math.min((deltaMass * interSectionDistance) * this.mass, 40), -40)

            console.log(this.w, value)

            // @ts-ignore
            if (this.v[key] > 0) {
                // @ts-ignore
                this.v[key] -= value
            } else {
                // @ts-ignore
                this.v[key] += value
            }
}

        if (this.intersectsY(other)) {
            fn("y", "h")
        }

        if (this.intersectsX(other)) {
            fn("x", "w")
        }

    }

    destructor() {
        // @ts-ignore
        objects.splice(objects.findIndex(x => x.id === this.id), 1)
    }

}

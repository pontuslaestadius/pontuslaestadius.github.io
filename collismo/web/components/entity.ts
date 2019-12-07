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
        x: number,
        y: number,
        w: number,
        h: number,
        duration: number = -1,
        mass: number = 1,
    ) {
        super(x, y, w, h)
        this.duration = duration
        this.v = {x: 0, y: 0}
        this.id =  Helper.roll(100000)
        this.infinite = this.duration === -1
        this.mass = mass
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

        this.v.y += 0.5 + 0.01 * (1 + this.mass)
        this.v.y = Math.max(Math.min(this.v.y, 10), -10)

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
        // ctx.fillStyle = "rgb(0,0,255)"
        // ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    onCollide(other: Entity) {

        if (this.fixed) {
            return
        }

        const fn: any = (key: any, k2: any) => {

            const deltaMass = Math.max(Math.min(other.mass - this.mass, 50), -50);
            const interSectionDistance = this[key] + this[k2] - other[key]

            this.v[key] -=
                (deltaMass * interSectionDistance) * 0.1
        }

        if (this.intersectsY(other)) {
            fn("y", "h")
        }

        if (this.intersectsX(other)) {
            fn("x", "w")
        }
        console.log(this.v)

    }

    destructor() {
        // @ts-ignore
        objects.splice(objects.findIndex(x => x.id === this.id), 1)
    }

}

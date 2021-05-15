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
        this.v = { x: 0, y: 0 }
        this.id = Helper.roll(100000)
        this.infinite = this.duration === -1
        this.mass = mass
        this.fixed = fixed
        // @ts-ignore
        window.objects.push({ object: this })
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

    apply_gravity() {
        if (this.fixed) {
            return
        }
        this.v.y += 0.5 + 0.01 * (1 + this.mass)
        this.v.y = Math.max(Math.min(this.v.y, 10), -10)
    }

    velocity() {
        if (this.fixed) {
            return
        }

        this.apply_gravity()

        if (!this.hasVelocity) {
            return
        }

        // this.v.y += 0.5 + 0.01 * (1 + this.mass)
        // this.v.y = Math.max(Math.min(this.v.y, 10), -10)

        this.v.x -= this.v.x / 7


        this.x += Math.floor(this.v.x)
        this.y += Math.floor(this.v.y)
    }

    xwv() {
        return this.xw + this.v.x
    }

    yhv() {
        return this.yh + this.v.y
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

    calc() { }

    outline() {
        // @ts-ignore
        let ctx = window.ctx;
        ctx.fillStyle = "rgb(200, 200, 0)"
        // @ts-ignore
        const { x, y, w, h } = this;
        ctx.fillRect(x, y, w, 1)
        ctx.fillRect(x, y, 1, h)
        ctx.fillRect(x + w - 1, y, 1, h)
        ctx.fillRect(x, y + h - 1, w, 1)
    }

    impulse(other: Entity) {
        if (other.yh >= this.yh && this.vy !== 0) {
            this.v.y = -this.v.y / 4
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
        // console.log("onCollideHook called for", this.constructor.name, "at", this.x, this.y);
    }

    onCollide(other: Entity) {
        if (this.fixed) {
            return
        }
        this.onCollideHook()
        // // @ts-ignore
        // const fn: any = (key: any, k2: any) => {
        //     // @ts-ignore
        //     const deltaMass: number =
        //         Math.max(Math.min(other.mass - this.mass, 5), -5)
        //     // @ts-ignore
        //     const interSectionDistanceRaw = this[key] + this[k2] - other[key];
        //     // @ts-ignore
        //     const interSectionDistance: number =
        //         // @ts-ignore
        //         Math.max(Math.min(interSectionDistanceRaw, 25), -25)
        //     // @ts-ignore
        //     const value: number =
        //         Math.max(Math.min((deltaMass * interSectionDistance) * this.mass, 40), -40)

        //     // console.log(this.w, value)
        //     // console.log(key, deltaMass, interSectionDistanceRaw, value);

        //     let hvalue = value / 2
        //     // @ts-ignore
        //     if (this.v[key] > 0) {
        //         // @ts-ignore
        //         this.v[key] -= hvalue
        //     } else {
        //         // @ts-ignore
        //         this.v[key] += hvalue
        //     }
        // }

        let values: { x: number, y: number } = this.intersectValues(other)

        if (values.y !== 0) {
            this.v.y = 0;
            this.y -= values.y
        }
        // if (values.x !== 0) {
        //     this.x -= values.x
        //     this.v.x = 0;
        // }

        // if (this.intersectsY(other)) {
        //     fn("y", "h")
        // }

        // if (this.intersectsX(other)) {
        //     fn("x", "w")
        // }

    }

    destructor() {
        // @ts-ignore
        objects.splice(objects.findIndex(x => x.id === this.id), 1)
    }

}

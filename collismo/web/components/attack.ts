import Entity from './entity'
import Helper from './helper'
import Particle from './particle'

export default class Attack extends Entity {
    duration: number
    infinite: boolean
    constructor(
        x: number,
        y: number,
        w: number,
        h: number,
        d: number,
    ) {
        super(x, y, w, h, d)

        for (var i = 0; i < w/4; i+=4) {
            for (var j = 0; j < h/4; j+=4) {
                new Particle(x+i,y+j,2,2,d*2)
            }
        }
    }
    render(ctx: CanvasRenderingContext2D) {}
    debugRender(ctx: CanvasRenderingContext2D) {}
    onCollide(other: Entity) {}
}

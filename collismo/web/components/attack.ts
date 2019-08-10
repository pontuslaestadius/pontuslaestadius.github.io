import Entity from './entity'
import Helper from './helper'

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
    }
    render(ctx: CanvasRenderingContext2D) {}
    debugRender(ctx: CanvasRenderingContext2D) {}
    onCollide(other: Entity) {}
}

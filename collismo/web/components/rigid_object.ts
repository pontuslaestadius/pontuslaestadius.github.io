import Entity from './entity'

export default class RigidObject extends Entity  {
    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h)
    }
    render(ctx: CanvasRenderingContext2D) {}
    debugRender(ctx: CanvasRenderingContext2D) {}
    onCollide(other: Entity) {}
}

import Helper from './helper'
import Entity from './entity'
import Boundry from './boundry'

export default class QuadTree extends Boundry {
    capacity: number
    points: Boundry[] = []
    quadTrees: QuadTree[] = []
    x: number
    y: number
    w: number
    h: number

    constructor(
        x: number,
        y: number,
        w: number,
        h: number,
        capacity: number,
    ) {
        super(x, y, w, h)
        this.capacity = capacity
    }

    insert(point: Boundry) {
        if (!this.intersects(point)) {
            return false
        } else if (this.points.length < this.capacity) {
            this.points.push(point)
            return true
        } else {
            if (!this.quadTrees.length) {
                this.subdivide()
            }
            for (var i = 0; i < this.quadTrees.length; i++) {
                if (this.quadTrees[i].insert(point)) {
                    return true
                }
            }
        }
    }

    subdivide() {
        const { x, y, w, h, capacity } = this
        const tw = w / h
        const iw = w / tw

        if (tw === 1) {
            this.quadTrees = [
                new QuadTree(x, y, w / 2, h / 2, capacity),
                new QuadTree(x + w / 2, y, w / 2, h / 2, capacity),
                new QuadTree(x, y + h / 2, w / 2, h / 2, capacity),
                new QuadTree(x + w / 2, y + h / 2, w / 2, h / 2, capacity)
            ]
        } else {
            for (var i = 0; i < tw; i++) {
                this.quadTrees.push(new QuadTree(x + i * iw, y, iw, h, capacity))
            }
        }
    }

    render(qt_ctx: CanvasRenderingContext2D) {
        if (!this.points.length) {
            return
        }
        const { x, y, w, h } = this
        qt_ctx.fillRect(x, y, 1, h)
        qt_ctx.fillRect(x, y, w, 1)
        qt_ctx.fillRect(x + w - 1, y, 1, h)
        qt_ctx.fillRect(x, y + h - 1, w, 1)
        this.quadTrees.forEach((qt: QuadTree) => {
            qt.render(qt_ctx)
        })
    }

    debugRender(qt_ctx: CanvasRenderingContext2D) {
        if (!this.points.length) {
            return
        }
        const { x, y, w, h } = this
        qt_ctx.fillRect(x, y, 1, h)
        qt_ctx.fillRect(x, y, w, 1)
        qt_ctx.fillRect(x + w - 1, y, 1, h)
        qt_ctx.fillRect(x, y + h - 1, w, 1)
        this.quadTrees.forEach((qt: QuadTree) => {
            qt.debugRender(qt_ctx)
        })
    }

    query(range: Boundry): Boundry[] {
        if (!this.intersects(range)) {
            return []
        }

        let found: Boundry[] = this.points.filter((point: Boundry) => {
            return range.intersects(point)
        })

        for (var i = 0; i < this.quadTrees.length; i++) {
            let sub_query = this.quadTrees[i].query(range)
            if (sub_query.length) {
                found.concat(sub_query)
                // Uncomment this if objects do not cross several subdivides.
                // break
            }
        }

        if (found.length) {
            const { x, y, w, h } = this
            // @ts-ignore
            qt_ctx.globalAlpha = 0.1
            // @ts-ignore
            qt_ctx.fillStyle = Helper.rgb(255, 255, 255)
            // @ts-ignore
            qt_ctx.fillText(`${this.points.length}/${this.capacity}`, x + w / 2 - 4, y + h / 2 + 6)
            // @ts-ignore
            qt_ctx.fillRect(x, y, w, 1)
            // @ts-ignore
            qt_ctx.fillRect(x, y, 1, h)
            // @ts-ignore
            qt_ctx.fillRect(x, y + h - 1, w, 1)
            // @ts-ignore
            qt_ctx.fillRect(x + w - 1, y, 1, h)
            // @ts-ignore
            qt_ctx.globalAlpha = 1.0
        }

        return found
    }

}

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
        super(x, y, w, h);
        this.capacity = capacity;
    }

    insert(point: Boundry) {
        if (!this.contains(point)) {
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
        const {x, y, w, h, capacity} = this;
        this.quadTrees = this.quadTrees.concat([
            new QuadTree(x,     y,     w/2, h/2, capacity),
            new QuadTree(x+w/2, y,     w/2, h/2, capacity),
            new QuadTree(x,     y+h/2, w/2, h/2, capacity),
            new QuadTree(x+w/2, y+h/2, w/2, h/2, capacity)
        ]);
    }

    render(ctx: CanvasRenderingContext2D) {
        if (!this.points.length) {
            return;
        }
        const {x, y, w, h} = this;
        ctx.fillRect(x, y, 1, h);
        ctx.fillRect(x, y, w, 1);
        ctx.fillRect(x+w-1, y, 1, h);
        ctx.fillRect(x, y+h-1, w, 1);
        this.quadTrees.forEach((qt: QuadTree) => {
            qt.render(ctx)
        })
    }

    debugRender(ctx: CanvasRenderingContext2D) {}

    query(range: Boundry): Boundry[] {
        if (!this.intersects(range)) {
            return [];
        }

        let found: Boundry[] = this.points.filter((point: Boundry) => {
            return range.contains(point);
        });

        for (var i = 0; i < this.quadTrees.length; i++) {
            let sub_query = this.quadTrees[i].query(range);
            if (sub_query.length) {
                found.concat(sub_query);
                // break; // Uncomment this if objects do not cross several subdivides.
            }
        }

        if (found.length) {
            const {x, y, w, h} = this
            // @ts-ignore
            ctx.fillStyle=`rgb(255,255,255)`
            // @ts-ignore
            ctx.fillRect(x,y,w,1)
            // @ts-ignore
            ctx.fillRect(x,y,1,h)
            // @ts-ignore
            ctx.fillRect(x,y+h,w,1)
            // @ts-ignore
            ctx.fillRect(x+w,y,1,h)
        }


        return found;
    }

}

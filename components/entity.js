let renderObjects = [];
let calcObjects = [];

class Entity {
    constructor(x, y, w, h) {
        Object.assign(this, {x, y, w, h});
        this.id = Helper.roll(1000000);
        renderObjects.push(this);
        calcObjects.push(this);
    }
    calc() {}
    render(ctx) {}
    onCollide(other) {}
    destructor() {
        let now = performance.now();
        let spl = (obj) => obj.splice(obj.findIndex(x => x.id === this.id), 1);
        spl(renderObjects);
        spl(calcObjects);
        delete this;
    }
}

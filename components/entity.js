class Entity {
    constructor(x, y, w, h) {
        Object.assign(this, {x, y, w, h});
    }
    calc() {
        console.warn(`calc not setup for ${this}`);
    }
    render() {
        console.warn(`render not setup for ${this}`);
    }
    destructor() {
        console.warn(`destructor not setup for ${this}`);
    }
}

class Weather extends Entity {
    constructor(options = {}) {
        super(Helper.roll(c.width * 1.2), Helper.roll(c.height / 3), 2, 2);
        this.collision = false;
        this.dx = -(10 + Helper.roll(5));
        this.id = Helper.roll(9999);
        this.lifetime = 0;
        this.speed = (1000/config.fps)/4;
        this.totalLifeTime = (1000/config.fps)/1;
    }
    render(ctx) {
        if (!ctx) {
            return;
        }
        ctx.fillStyle=`rgb(0, ${this.lifetime}, ${255 - this.lifetime * 2})`;
        ctx.fillRect(this.x - this.w/2, this.y, this.w, this.h);
    }
    onCollide(other) {
        this.collision = other.constructor.name;
    }
    calc() {
        if (!player ||
            this.lifetime > this.totalLifeTime ||
            this.x < 0 ||
            this.x > c.width ||
            Math.floor(this.h) === 0 ||
            Math.floor(this.h) === 0){
            super.destructor();
            return;
        }
        if (this.y > c.height - 10) {
            this.collision = true;
        }
        if (!this.collision) {
            this.y += this.speed;
            this.x += this.dx;
            let {x, y, w, h} = player;
            w -= 40;
            x += 30;
            h += 25;
            y += 5;
        } else if (this.collision == 'Player') {
            this.y -= this.speed / 10;
            this.x -= this.dx / 2;
            this.lifetime += this.speed;
        } else {
            this.w++;
            this.h -= 0.2;
            this.lifetime += this.speed;
        }
    }
};

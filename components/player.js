class Player extends Entity {
    constructor() {
        super((c.width - 50) / 2, c.height - 45, 50, 37);

        this.mheight = this.y;
        this.d = 0;
        this.flipH = 1;
        this.ani = 0;
        this.xRight = 0;
        this.xLeft = 0;
        this.falling = false;
        this.dy = 0;
        this.fallingSpeed = 0;
        this.swidth = this.w;
        this.sheight = this.h;
        this.idle_sprite = 'idle1';
        this.speed = 20 / config.fps;
        this.current_combo = [];

        const {w,h} = this;
        this.spriter = {
            idle1: this.framer(0, 0, 4),
            idle2: this.framer(3, 5, 4, () => this.idle_sprite = 'idle1'),
            duck: this.framer(4, 0, 4),
            slide: this.framer(3, 3, 5, () => this.slide = false),
            run: this.framer(1, 1, 5),
            fall: this.framer(1, 3, 2),
            jump: this.framer(0, 2, 6, () => this.jumpAni = false),
            attack1: this.framer(1, 6, 4, () => {this.attack = false; this.idle_sprite = 'idle2'}),
            attack2: this.framer(0, 7, 4, () => {this.attack = false; this.idle_sprite = 'idle2'}),
            attack3: this.framer(6, 13, 4, () => {this.attack = false; this.idle_sprite = 'idle2'}),
            attack4: this.framer(2, 14, 3, () => {this.attack = false; this.idle_sprite = 'idle2'}),
            attack5: this.framer(4, 14, 4, () => this.attack_sprite = 'attack6'),
            attack6: this.framer(5, 14, 2, () => {if (this.dy !== 0) {return;} this.attack = false; this.idle_sprite = 'idle2'}),
        };
        this.set_sprite('idle1');
    }

    render() {
        this.x = Math.min(Math.max(0, this.x), c.width - this.w);
    }
}
Player.prototype.framer = function (
    fx = 0,
    fy = 0,
    len = 0,
    play_once = false,
    speed = 0.25,
) {
    const {w,h} = this;
    let frames = [];
    let clen = 0;
    while (clen !== len) {
        frames.push({sx: w*fx, sy: h*fy});
        fx++;
        clen++;
        if (fx > 6) {
            fx = 0;
            fy++;
        }
    }
    return {frames, play_once, speed: play_once ? speed * 2 : speed};
};
Player.prototype.set_sprite = function (str) {
    if (this.current_sprite === this.spriter[str]) {
        return;
    }
    this.ani = 0;
    if (!this.spriter[str]) {
        console.warn(`Not a registered sprite: ${str}`);
        return;
    }
    this.current_sprite = this.spriter[str];
};
Player.prototype.keyUp = function ({keyCode}) {
    switch (keyCode) {
    case 16: // ->
        this.slide = false;
        break;
    case 39: // ->
        this.xRight = 0;
        break;
    case 40: // [[down arrow]]
        this.duck = false;
        break;
    case 37: // <-
        this.xLeft = 0;
        break;
    }
};
Player.prototype.keyDown = function ({keyCode}) {
    this.current_combo.push(keyCode);
    if (this.current_combo.length > 3) {
        this.current_combo.pop();
    }
    switch (keyCode) {
    case 32: // [[space]]
        if (this.attack) {
            return;
        }
        this.attack = true;
        let attack_width = this.w/2;
        let center = this.x + (this.w - attack_width) / 2;
        new Attack(center + (attack_width) * this.flipH, this.y, attack_width, this.h);
        this.d /= 10;
        if (this.dy !== 0) {
            this.attack_sprite = `attack5`;
        } else {
            this.attack_sprite = `attack${1 + Helper.roll(3)}`;
        }
        break;
    case 39: // ->
        this.xRight = 1;
        this.flipH = 1;
        break;
    case 37: // <-
        this.xLeft = -1;
        this.flipH = -1;
        break;
    case 40: // [[down arrow]]
        this.duck = true;
        this.d = 0;
        break;
    case 38: // [[up arrow]]
        if (this.collision) {
            return;
        }
        if (this.dy !== 0) {
            return;
        }
        this.dy = -11;
        this.y += 11;
        break;
    case 16: // [[shift]]
        if (Math.abs(this.d) > Math.abs(1.5)) {
            this.d *= 2;
            this.slide = true;
        }
        break;
    }
};
Player.prototype.paint = function (ctx) {
    const f = Math.floor(this.ani);
    const {sx, sy} = this.current_sprite.frames[f];
    const {flipH, x, y, w, h, swidth, sheight} = this;
    ctx.save();
    if (flipH === -1) {
        ctx.scale(flipH, 1);
        ctx.translate(flipH * w, 1);
    }
    ctx.drawImage(player_sprite, sx, sy, swidth, sheight, x * flipH, y, w, h);
    ctx.restore();

};
Player.prototype.updatePosition = function () {
    this.render();
    if (this.y > this.mheight && this.dy > -10) {
        this.dy = 0;
        this.y = this.mheight;
    }
    if (this.dy < 0) {
        this.set_sprite('jump');
    } else if (this.dy > 0) {
        if (this.attack) {
            this.set_sprite(this.attack_sprite);
        } else {
            this.set_sprite('fall');
        }
    } else if (this.attack) {
        this.set_sprite(this.attack_sprite);
    } else if (this.duck) {
        this.set_sprite('duck');
    } else if (this.slide) {
        this.set_sprite('slide');
    } else if (this.xRight + this.xLeft !== 0) {
        this.set_sprite('run');
    } else {
        this.set_sprite(this.idle_sprite);
    }
    const {speed, play_once, frames} = this.current_sprite;
    this.ani = this.ani >= frames.length - speed ? 0 : this.ani + speed;

    if (play_once && this.ani === 0) {
        play_once();
    }
    if (this.dy === 0) {
        if (this.xLeft) {
            this.d -= 0.3;
        }
        if (this.xRight) {
            this.d += 0.3;
        }
    } else {
    }
    if (this.duck) {
        this.x += this.d;
    } else {
        this.x += (this.xLeft + this.xRight + this.d) * 3;
    }
    this.d -= this.slide ? this.d/5 : this.d/10;
    if (Math.abs(this.d) > 5) {
        this.d = 5  * (this.d/Math.abs(this.d));
    }
    this.collision = this.y >= this.mheight && this.dy > -5;
    if (this.collision && this.attack_sprite === 'attack5') {
        this.attack = false;
        this.set_sprite('idle2');
    }
    if (!this.collision) {
        this.y += this.dy;
        this.dy += 0.5 + Math.abs(this.dy) / 20;
    } else {
        this.collision = false;
        this.dy = 0;
    }
    let tx = this.x;
    timeFn(updateLayers.bind(null, tx), () => config.bg_accuracy++);
};


import Entity from './entity'
import config from '../config/index.json'
import Attack from './attack'
import Helper from './helper'

export default class Player extends Entity {
    constructor() {
        super(100, 100, 25, 25, -1, 65)

        this.flipH = 1;
        this.ani = 0;
        this.keyDownList = new Array(250);
        this.swidth = 50;
        this.sheight = 37;
        this.idle_sprite = 'idle1';
        this.speed = Helper.delta(10);
        this.v.y = 1;

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
            attack6: this.framer(5, 14, 2, () => {if (this.v.y !== 0) {return;} this.attack = false; this.idle_sprite = 'idle2'}),
        };
        this.set_sprite('idle1');

        let self = this;
        window.addEventListener('keydown', e => self.keyDown(e), {passive: true});
        window.addEventListener('keyup', e => self.keyUp(e), {passive: true});
    }

    set_sprite(str) {
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

    render(ctx) {
        const f = Math.floor(this.ani);
        const {sx, sy} = this.current_sprite.frames[f] || {sx: 0, sy: 0};
        const {flipH, x, y, w, h, swidth, sheight} = this;
        ctx.save();
        if (flipH === -1) {
            ctx.scale(flipH, 1);
            ctx.translate(flipH * w, 1);
        }
        ctx.drawImage(player_sprite, sx, sy, swidth, sheight, Math.floor(x * flipH) - 10, Math.floor(y) - 7, swidth, sheight);
        ctx.restore();
    }

    calc() {
        if (this.y > c.height) {
            this.y = 100;
            this.v.y = 1;
        }
        if (this.v.y < 0 && this.jumpAni) {
            this.set_sprite('jump');
        } else if (this.v.y < 0 && !this.jumpAni) {
            this.set_sprite('fall');
        } else if (this.v.y > 0) {
            if (this.attack) {
                this.set_sprite(this.attack_sprite);
            } else {
                this.set_sprite('fall');
            }
        } else if (this.attack) {
            this.set_sprite(this.attack_sprite);
        } else if (this.keyDown[40]) {
            this.set_sprite('duck');
        } else if (this.slide) {
            this.set_sprite('slide');
        } else if (Math.floor(this.v.x)) {
            this.set_sprite('run');
        } else {
            this.set_sprite(this.idle_sprite);
        }
        const {speed, play_once, frames} = this.current_sprite;
        this.ani += speed;
        if (this.ani >= frames.length) {
            this.ani -= frames.length;
            if (play_once) {
                play_once();
            }
        }
        this.v.x -= ((this.keyDownList[39] ? -1 : 0) + (this.keyDownList[37] ? 1 : 0)) * this.speed * 2;
        if (Math.abs(this.v.x) > 5) {
            this.v.x = 5  * (this.v.x/Math.abs(this.v.x));
        }
        if (this.collision && this.attack_sprite === 'attack5') {
            this.set_sprite('idle2');
        }
        if (this.v.y !== 0) {
            this.v.y += Helper.delta(10) * 3;
        }
    }

    framer(
        fx = 0,
        fy = 0,
        len = 0,
        play_once = false,
        speed = this.speed,
    ) {
        const {swidth, sheight} = this;
        let frames = [];
        let clen = 0;
        while (clen !== len) {
            frames.push({sx: swidth * fx, sy: sheight * fy});
            fx++;
            clen++;
            if (fx > 6) {
                fx = 0;
                fy++;
            }
        }
        return {frames, play_once, speed};
    }

    keyUp({keyCode}) {
        this.keyDownList[keyCode] = false;
        switch (keyCode) {
        case 16: // ->
            this.slide = false;
            break;
        case 39: // ->
            this.v.x = 0;
            break;
        case 40: // [[down arrow]]
            break;
        case 37: // <-
            this.v.x = 0;
            break;
        }
    }

    keyDown({keyCode}) {
        this.keyDownList[keyCode] = true;

        switch (keyCode) {
        case 32: // [[space]]
            if (this.attack) {
                return;
            }
            this.attack = true;
            let attack_width = this.w/2;
            let center = this.x + (this.w - attack_width) / 2;
            new Attack(center + (attack_width) * this.flipH, this.y, attack_width, this.h, 1);
            this.v.x /= 10;
            if (this.v.y !== 0) {
                this.attack_sprite = `attack5`;
            } else {
                this.attack_sprite = `attack${1 + Helper.roll(3)}`;
            }
            break;
        case 39: // ->
            this.flipH = 1;
            this.v.x = 0;
            break;
        case 37: // <-
            this.flipH = -1;
            this.v.x = 0;
            break;
        case 40: // [[down arrow]]
            this.v.x = 0;
            break;
        case 38: // [[up arrow]]
            if (this.v.y !== 0) {
                return;
            }
            this.v.y -= Helper.delta(15) * 20;
            this.y += 5;
            this.jumpAni = true;
            break;
        case 16: // [[shift]]
            if (Math.abs(this.v.x) > Math.abs(1.5)) {
                this.v.x *= 2;
                this.slide = true;
            }
            break;
        }
    };
}

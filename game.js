/*
 * Made my Pontus Laestadius Te2K for a school assignment. Jan 2013-Feb 2013.
 *
 * Updated version was made in August of 2019.
 *
 * Player:
 * https://rvros.itch.io/animated-pixel-hero
 *
 * Background:
 * https://edermunizz.itch.io/free-pixel-art-forest
 *
 */

// Canvas
let c;

// Canvas 2d Context
let ctx;

// bg canvas
let c2;
let ctx2;

var shots = [];
var player = [];
var weather = [];
const config = {
    "bg_accuracy": 10,
    "fps": 24,
    "lang": "language.SV_SE",
    "weather": {
        "max_items": 50
    },
};
function drawI(img, x, y, w, h) {
    if (!img) {
        ctx.fillRect(x, y, w, h);
        return;
    }
    try {
        ctx.drawImage(img, x, y, w, h);
    } catch (e) {
        ctx.fillRect(x, y, w, h);
    }
}
function initalize() {
        c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");

    c2 = document.getElementById("layer2");
    ctx2 = c2.getContext("2d");

    window.setInterval(gameloop, 1000/config.fps);
    function resizeCanvas() {
        c.width = window.innerWidth;
        c.height = 180;
        c2.width = c.width;
        c2.height = c.height + 200;
        updateLayers();
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);
    player.push(new Player());
}

let pv = null;
function updateLayers(dx = 0) {
    if (Math.floor(dx / config.bg_accuracy) == Math.floor(pv / config.bg_accuracy)) {
        return;
    }
    pv = dx;
    let offset = -150;
    let h = 500;
    let w = 600;
    let drawer = (img, ratio = 1, dy = 0) => {
        for (var i = -w*2; i < c.width * 2; i += w) {
            ctx2.drawImage(img, i + (dx * ratio) % w, offset + dy, w +2, h);
        }
    }

    drawer(layer_92, 0.05);
    drawer(layer_83, 0.1);
    drawer(middle_layer, 0.12);
    drawer(top_layer, 0.15);
    drawer(layer_7L, 0.18);
    drawer(bottom_layer, 1.2);
    drawer(layer_09, 0.3, 10);
}
function timeFn(fn, onWarn = () => {}) {
    const before = performance.now();
    fn();
    const after = performance.now();
    const duration = after - before;
    if (duration > 1000 / config.fps) {
        console.warn(`${fn.name} took ${duration} ms`);
        onWarn();
    }
}
function gameloop() {
    timeFn(updatePositions);
    timeFn(repaint);
}
function clear() {
    ctx.clearRect(0, 0, c.width, c.height);
}
function updatePositions() {
    ([
        player,
        weather,
    ])
        .forEach(x => x.forEach(y => y.updatePosition()));
}
function repaint() {
    clear();
    while (weather.length < config.weather.max_items) {
        new Weather();
    }
    [
        player,
        weather,
    ]
        .forEach(x => x.forEach(y => y.paint(ctx)));
}
function keyDown(e){
    if (!player[0]) {
        return;
    }
    player[0].keyDown(e);
    switch (e.keyCode) {
    case 80: // P
        go = !go;
        theme[go ? "play" : "pause"]();
        break;
    }
}
function keyUp(e){
    if (!player[0]) {
        return;
    }
    player[0].keyUp(e);
}

class Enemy {
    constructor() {
        this.x = 100 + Helper.roll(150);
        this.y = 392;
        this.direction = Helper.roll(2);
        this.goldGiven = false;
        this.enemyGoRight = true;
        this.ani = 1;
        this.type = Helper.roll(3);
        if (this.type == 1){
            this.w = 23 / 2;
            this.h = 46 / 2;
            this.y += 46 / 2;
            this.health = 2;
            this.totalHealth = 2;
        }
        if (this.type == 3){
            this.w = 23 * 2;
            this.h = 46 * 2;
            this.y -= 46;
            this.health = 8;
            this.totalHealth = 8;
        }
        if (this.type != 3 && this.type != 1) {
            this.w = 23;
            this.h = 46;
            this.health = 4;
            this.totalHealth = 4;
            this.y = 392;
        }
        this.health += dif;
        this.totalHealth += dif;
        this.levelEnemy = level;
        this.a = 0;
        this.jumpNow = false;
        this.s = 10;
        this.n = 0;
        this.alreadyJumping = false;

        enemy.push(this);
    }
}
Enemy.prototype.updatePosition = function () {
    this.ani = this.ani >= 3.8 ? 1 : this.ani + 0.2;
    if (this.health <= 0){
        if (!this.goldGiven){
            this.goldGiven = true;
            gold += this.type * 5;
            if (Helper.roll(100) >= 20){
                drop.push(new Drop());
            }
        }
        delete this;
        return;
    }
    if (!this.goldGiven){
        this.jumpSpeed = 0.7 + (Math.pow(this.s / 5.2, 2));
        this.jumpSpeed2 = 0.7 + (Math.pow(this.n / 5.2, 2));
        if (this.jumpNow){
            if (this.s >= 0){
                this.s--;
                this.y -= this.jumpSpeed;
            } else {
                this.n++;
                this.y += this.jumpSpeed2;
            }
            if (this.n > 10){
                this.n = 0;
                this.s = 10;
                this.jumpNow = false;
                this.alreadyJumping = false;
            }
        }
        if (this.x >= player[0].x && this.x <= player[0].x + player[0].w && player[0].jumpNow
            && Helper.roll(100) >= 90 && this.type != 3 && this.alreadyJumping == false){
            this.jumpNow = true;
            this.alreadyJumping = true;
        }
        if (this.x < 0 - this.w || this.x > c.width){
            delete this;
            return;
        }
        this.enemyGoRight = Helper.roll(100) > 80;
        this.x += (this.type == 1 ? 4 : 2) * (this.enemyGoRight ? 1 : -1);
    }
    this.a++;
    if (this.a > 30 + Helper.roll(40) && this.health > this.totalHealth - 1 && this.type > 1) {
        this.enemyGoRight = !this.enemyGoRight;
        this.a = 0;
    } else if (this.a > 10 + Helper.roll(40) && this.health > this.totalHealth - 1 && this.type == 1) {
        this.enemyGoRight = !this.enemyGoRight;
        this.a = 0;
    }
};
Enemy.prototype.paint = function (ctx) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.x - 4, this.y - 10, 31 / 4 * this.totalHealth, 7);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.x - 2, this.y - 8, 7 * this.health, 3);
    this.oldD = this.enemyGoRight ? "R" : "L";
    drawI(eval(`enemy1_${Math.floor(this.ani)}${this.oldD}`), this.x, this.y, this.w, this.h);
};
class Weather {
    constructor(options = {}) {
        this.collision = false;
        this.dx = -(10 + Helper.roll(5));
        this.h = 1 + Helper.roll(2);
        this.w = this.h -1;
        this.x = Helper.roll(c.width);
        this.y = Helper.roll(c.height/2);
        this.id = Helper.roll(9999);
        this.lifetime = 0;
        this.speed = (1000/config.fps)/2;
        this.totalLifeTime = (1000/config.fps)/1;
        weather.push(this);
    }
}
Weather.prototype.updatePosition = function () {
    if (this.lifetime > this.totalLifeTime ||
        Math.floor(this.h) === 0 ||
        Math.floor(this.h) === 0){
        weather.splice(weather.findIndex(x => x.id === this.id), 1);
        delete this;
        return;
    }
    if (this.y > c.height - 10) {
        this.collision = true;
    }
    if (!this.collision) {
        this.y += this.speed;
        this.x += this.dx;
        let {x, y, w, h} = player[0];
        w -= 40;
        x += 30;
        h += 25;
        y += 5;

        if (this.y > y && this.y < y+h && this.x > x && this.x  < x + w) {
            this.collision = 'player';
        }
    } else if (this.collision == 'player') {
        this.y -= this.speed / 10;
        this.x -= this.dx / 2;
        this.lifetime += this.speed;
    } else {
        this.w *= 1.2;
        this.h -= 0.3;
        this.lifetime += this.speed;
    }
};
Weather.prototype.paint = function (ctx) {
    ctx.fillStyle=`rgb(0, 0, ${200 - this.lifetime * 2})`;
    ctx.fillRect(this.x - this.w/2, this.y, this.w, this.h);
};

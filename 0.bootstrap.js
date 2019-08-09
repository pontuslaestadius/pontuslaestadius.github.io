(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./components/attack.ts":
/*!******************************!*\
  !*** ./components/attack.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Attack; });
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./components/entity.ts");

class Attack extends _entity__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y, w, h, d) {
        super(x, y, w, h, d);
    }
    render(ctx) { }
    debugRender(ctx) { }
    onCollide(other) { }
}


/***/ }),

/***/ "./components/background.js":
/*!**********************************!*\
  !*** ./components/background.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return background; });

let w = 600;
const resources = {};

function background(ctx, width = w, dx = 0) {
    let drawer = (id, ratio = 1, dy = 0) => {
        if (!resources[id]) {
            resources[id] = document.getElementById(id);
        }
        for (var i = -w; i < width + w*2; i += w) {
            ctx.drawImage(
                resources[id],
                Math.floor(i + (dx * ratio) % w),
                Math.floor(dy - 400, w + 1)
            );
        }
    };

    [
        'L11',
        'L92',
        'L83',
        'L7L',
        'L64',
        'L55',
        'L4L',
        'L36',
        'L27',
        'L18',
        'L09',
    ].forEach((x) => drawer(x));
};


/***/ }),

/***/ "./components/boundry.ts":
/*!*******************************!*\
  !*** ./components/boundry.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Boundry; });
class Boundry {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    centerPoint() {
        return {
            x: this.x + this.w / 2,
            y: this.y + this.h / 2,
        };
    }
    contains(other) {
        let { x, y, w, h } = other;
        return (x + w >= this.x &&
            x + w <= this.x + this.w &&
            y + h >= this.y &&
            y + h <= this.y + this.h);
    }
    intersects(other) {
        let { x, y, w, h } = other;
        let t = this;
        return !(x - w > t.x + t.w ||
            x + w < t.x - t.w ||
            y - h > t.y + t.h ||
            y + h < t.y - t.h);
    }
}


/***/ }),

/***/ "./components/entity.ts":
/*!******************************!*\
  !*** ./components/entity.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Entity; });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./components/helper.js");
/* harmony import */ var _boundry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boundry */ "./components/boundry.ts");


class Entity extends _boundry__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(x, y, w, h, duration = -1) {
        super(x, y, w, h);
        this.duration = duration;
        this.v = { x: 0, y: 0 };
        this.id = _helper__WEBPACK_IMPORTED_MODULE_0__["default"].roll(100000),
            this.infinite = this.duration === -1,
            // @ts-ignore
            window.objects.push({ object: this });
    }
    timeout() {
        if (this.infinite) {
            return;
        }
        this.duration -= _helper__WEBPACK_IMPORTED_MODULE_0__["default"].delta(5);
        if (this.duration < 0) {
            this.destructor();
        }
    }
    velocity() {
        if (Math.abs(this.v.x) < 0.1) {
            this.v.x = 0;
        }
        if (Math.abs(this.v.y) < 0.1) {
            this.v.y = 0;
        }
        this.x += Math.floor(this.v.x);
        this.y += Math.floor(this.v.y);
    }
    xwv() {
        return this.x + this.w + this.v.x;
    }
    yhv() {
        return this.y + this.h + this.v.y;
    }
    yh() {
        return this.y + this.h;
    }
    calc() { }
    outline() {
        // @ts-ignore
        ctx.fillStyle = "rgb(200, 200, 0)";
        // @ts-ignore
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    render(ctx) {
        ctx.fillStyle = "rgb(0,0,255)";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    onCollide(other) { }
    destructor() {
        // @ts-ignore
        objects.splice(objects.findIndex(x => x.id === this.id), 1);
    }
}


/***/ }),

/***/ "./components/helper.js":
/*!******************************!*\
  !*** ./components/helper.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_index_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/index.json */ "./config/index.json");
var _config_index_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../config/index.json */ "./config/index.json", 1);



function roll(max = 1) {
    return Math.round(Math.random() * max);
}

function delta(d = 1) {
    return ((1000 / _config_index_json__WEBPACK_IMPORTED_MODULE_0__.fps) * d) / 1000
}

/* harmony default export */ __webpack_exports__["default"] = ({roll, delta});


/***/ }),

/***/ "./components/particle.ts":
/*!********************************!*\
  !*** ./components/particle.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Particle; });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./components/helper.js");
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity */ "./components/entity.ts");


class Particle extends _entity__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        // @ts-ignore
        super(0, 0, 2, 2, -1);
        this.reset();
    }
    calc() {
        this.alpha -= this.maxed ? 0.01 : -0.01;
        if (this.alpha > 0.8) {
            this.maxed = true;
        }
        // @ts-ignore
        if (this.y > c.height - 50 || this.x < 0) {
            this.alpha -= 0.05;
        }
        if (this.alpha <= 0.00) {
            this.reset();
        }
    }
    reset() {
        // @ts-ignore
        this.x = _helper__WEBPACK_IMPORTED_MODULE_0__["default"].roll(c.width * 1.2);
        // @ts-ignore
        this.y = _helper__WEBPACK_IMPORTED_MODULE_0__["default"].roll(c.height) - 20;
        this.v.x = _helper__WEBPACK_IMPORTED_MODULE_0__["default"].roll(2) - 6;
        this.v.y = _helper__WEBPACK_IMPORTED_MODULE_0__["default"].roll(2) + 1;
        this.alpha = 0.1;
        this.maxed = false;
    }
    render(ctx) {
        ctx.fillStyle = `rgb(250, 250, 220)`;
        ctx.globalAlpha = this.alpha;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.globalAlpha = 1;
    }
    onCollide(other) {
        this.reset();
    }
}


/***/ }),

/***/ "./components/player.js":
/*!******************************!*\
  !*** ./components/player.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./components/entity.ts");
/* harmony import */ var _config_index_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/index.json */ "./config/index.json");
var _config_index_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../config/index.json */ "./config/index.json", 1);
/* harmony import */ var _attack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attack */ "./components/attack.ts");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper */ "./components/helper.js");






class Player extends _entity__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(100, 100, 50, 37, -1);

        this.flipH = 1;
        this.ani = 0;
        this.keyDownList = new Array(250);
        this.swidth = this.w;
        this.sheight = this.h;
        this.idle_sprite = 'idle1';
        this.speed = _helper__WEBPACK_IMPORTED_MODULE_3__["default"].delta(10);
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
        window.addEventListener('keydown', (e) => self.keyDown(e), {passive: true});
        window.addEventListener('keyup', (e) => self.keyUp(e), {passive: true});
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
        ctx.drawImage(player_sprite, sx, sy, swidth, sheight, Math.floor(x * flipH), Math.floor(y), w, h);
        ctx.restore();
    }

    onCollide(other) {
        if (other.constructor.name === "RigidObject") {
            let c1 = this.centerPoint();
            let c2 = other.centerPoint();

            if (other.y < this.yh()) {
                this.v.y = Math.floor((this.yh() - other.y) / 10);
                this.v.x /= 2;
            }
            this.attack = false;
        }
    }

    calc() {
        console.log(this.collisions);
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
        this.v.x -= this.slide ? this.v.x/5 : this.v.x/10;
        if (Math.abs(this.v.x) > 5) {
            this.v.x = 5  * (this.v.x/Math.abs(this.v.x));
        }
        if (this.collision && this.attack_sprite === 'attack5') {
            this.set_sprite('idle2');
        }
        if (this.v.y !== 0) {
            this.v.y += _helper__WEBPACK_IMPORTED_MODULE_3__["default"].delta(10) * 3;
        }
    }

    framer(
        fx = 0,
        fy = 0,
        len = 0,
        play_once = false,
        speed = this.speed,
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
        return {frames, play_once, speed};
    }

    keyUp({keyCode}) {
        this.keyDownList[keyCode] = false;
        switch (keyCode) {
        case 16: // ->
            this.slide = false;
            break;
        case 39: // ->
            break;
        case 40: // [[down arrow]]
            break;
        case 37: // <-
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
            new _attack__WEBPACK_IMPORTED_MODULE_2__["default"](center + (attack_width) * this.flipH, this.y, attack_width, this.h, 1);
            this.v.x /= 10;
            if (this.v.y !== 0) {
                this.attack_sprite = `attack5`;
            } else {
                this.attack_sprite = `attack${1 + _helper__WEBPACK_IMPORTED_MODULE_3__["default"].roll(3)}`;
            }
            break;
        case 39: // ->
            this.flipH = 1;
            break;
        case 37: // <-
            this.flipH = -1;
            break;
        case 40: // [[down arrow]]
            this.v.x = 0;
            break;
        case 38: // [[up arrow]]
            if (this.v.y !== 0) {
                return;
            }
            this.v.y -= _helper__WEBPACK_IMPORTED_MODULE_3__["default"].delta(15) * 20;
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


/***/ }),

/***/ "./components/quad_tree.ts":
/*!*********************************!*\
  !*** ./components/quad_tree.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QuadTree; });
/* harmony import */ var _boundry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boundry */ "./components/boundry.ts");

class QuadTree extends _boundry__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y, w, h, capacity) {
        super(x, y, w, h);
        this.points = [];
        this.quadTrees = [];
        this.capacity = capacity;
    }
    insert(point) {
        if (!this.contains(point)) {
            return false;
        }
        else if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        else {
            if (!this.quadTrees.length) {
                this.subdivide();
            }
            for (var i = 0; i < this.quadTrees.length; i++) {
                if (this.quadTrees[i].insert(point)) {
                    return true;
                }
            }
        }
    }
    subdivide() {
        const { x, y, w, h, capacity } = this;
        this.quadTrees = this.quadTrees.concat([
            new QuadTree(x, y, w / 2, h / 2, capacity),
            new QuadTree(x + w / 2, y, w / 2, h / 2, capacity),
            new QuadTree(x, y + h / 2, w / 2, h / 2, capacity),
            new QuadTree(x + w / 2, y + h / 2, w / 2, h / 2, capacity)
        ]);
    }
    render(ctx) {
        if (!this.points.length) {
            return;
        }
        const { x, y, w, h } = this;
        ctx.fillRect(x, y, 1, h);
        ctx.fillRect(x, y, w, 1);
        ctx.fillRect(x + w - 1, y, 1, h);
        ctx.fillRect(x, y + h - 1, w, 1);
        this.quadTrees.forEach((qt) => {
            qt.render(ctx);
        });
    }
    debugRender(ctx) { }
    query(range) {
        if (!this.intersects(range)) {
            return [];
        }
        let found = this.points.filter((point) => {
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
            const { x, y, w, h } = this;
            // @ts-ignore
            ctx.fillStyle = `rgb(255,255,255)`;
            // @ts-ignore
            ctx.fillRect(x, y, w, 1);
            // @ts-ignore
            ctx.fillRect(x, y, 1, h);
            // @ts-ignore
            ctx.fillRect(x, y + h, w, 1);
            // @ts-ignore
            ctx.fillRect(x + w, y, 1, h);
        }
        return found;
    }
}


/***/ }),

/***/ "./components/rigid_object.ts":
/*!************************************!*\
  !*** ./components/rigid_object.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RigidObject; });
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./components/entity.ts");

class RigidObject extends _entity__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }
    render(ctx) { }
    debugRender(ctx) { }
    onCollide(other) { }
}


/***/ }),

/***/ "./components/weather.ts":
/*!*******************************!*\
  !*** ./components/weather.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Weather; });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./components/helper.js");
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity */ "./components/entity.ts");


class Weather extends _entity__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        // @ts-ignore
        super(_helper__WEBPACK_IMPORTED_MODULE_0__["default"].roll(c.width * 1.2), _helper__WEBPACK_IMPORTED_MODULE_0__["default"].roll(c.height), 2, 2, -1);
        this.v.x = -10 + _helper__WEBPACK_IMPORTED_MODULE_0__["default"].roll(3);
        this.v.y = 4 + _helper__WEBPACK_IMPORTED_MODULE_0__["default"].roll(3);
    }
    calc() {
        // @ts-ignore
        if (this.y > c.height) {
            this.reset();
        }
    }
    reset() {
        // @ts-ignore
        this.x = _helper__WEBPACK_IMPORTED_MODULE_0__["default"].roll(c.width * 1.2);
        // @ts-ignore
        this.y = _helper__WEBPACK_IMPORTED_MODULE_0__["default"].roll(c.height / 4);
    }
    render(ctx) {
        ctx.fillStyle = `rgb(0, 40, 255)`;
        ctx.fillRect(this.x - this.w / 2, this.y, this.w, this.h);
    }
    onCollide(other) {
        this.reset();
    }
    debugRender(ctx) { }
}


/***/ }),

/***/ "./config/globals.js":
/*!***************************!*\
  !*** ./config/globals.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.objects = [];

// these are set when we initialize the canvas
window.c;
window.ctx;


/***/ }),

/***/ "./config/index.json":
/*!***************************!*\
  !*** ./config/index.json ***!
  \***************************/
/*! exports provided: fps, weather, particles, debug, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"fps\":30,\"weather\":{\"max_items\":0},\"particles\":{\"max_items\":200},\"debug\":false}");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/helper */ "./components/helper.js");
/* harmony import */ var _components_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/player */ "./components/player.js");
/* harmony import */ var _components_rigid_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/rigid_object */ "./components/rigid_object.ts");
/* harmony import */ var _components_background__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/background */ "./components/background.js");
/* harmony import */ var _components_weather__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/weather */ "./components/weather.ts");
/* harmony import */ var _components_particle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/particle */ "./components/particle.ts");
/* harmony import */ var _components_quad_tree__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/quad_tree */ "./components/quad_tree.ts");
/* harmony import */ var _style_index_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style/index.css */ "./style/index.css");
/* harmony import */ var _style_index_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_style_index_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _config_index_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./config/index.json */ "./config/index.json");
var _config_index_json__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./config/index.json */ "./config/index.json", 1);
/* harmony import */ var _config_globals__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./config/globals */ "./config/globals.js");
/* harmony import */ var _config_globals__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_config_globals__WEBPACK_IMPORTED_MODULE_9__);
/*
 *
 * Player:
 * https://rvros.itch.io/animated-pixel-hero
 *
 * Background:
 * https://edermunizz.itch.io/free-pixel-art-forest
 *
 */














function init() {
    window.c = document.getElementById("myCanvas");
    window.ctx = c.getContext("2d");

    const c2 = document.getElementById("layer2");
    const ctx2 = c2.getContext("2d", {alpha: false});

    if (!c || !c2 || !ctx || !ctx2) {
        console.error("Could not set up canvas.");
        return;
    }

    c.width = window.innerWidth;

    c2.width = c.width;
    c2.height = c.height + 130;
    Object(_components_background__WEBPACK_IMPORTED_MODULE_3__["default"])(ctx2, c.width);

    new _components_player__WEBPACK_IMPORTED_MODULE_1__["default"]();

    let size = 10;
    for (var i = 2; i < c.width; i+=size) {
        new _components_rigid_object__WEBPACK_IMPORTED_MODULE_2__["default"](i, 0, size, size);
        new _components_rigid_object__WEBPACK_IMPORTED_MODULE_2__["default"](i, c.height-size, size, size);
        new _components_rigid_object__WEBPACK_IMPORTED_MODULE_2__["default"](0, i, size, size);
        new _components_rigid_object__WEBPACK_IMPORTED_MODULE_2__["default"](c.width-size, i, size, size);
    }

    for (var i = 0; i < _config_index_json__WEBPACK_IMPORTED_MODULE_8__.weather.max_items; i++) {
        new _components_weather__WEBPACK_IMPORTED_MODULE_4__["default"](c.width, c.height/4);
    }
    for (var i = 0; i < _config_index_json__WEBPACK_IMPORTED_MODULE_8__.particles.max_items; i++) {
        new _components_particle__WEBPACK_IMPORTED_MODULE_5__["default"](c.width, c.height);
    }
    window.requestAnimationFrame(gameloop);
}

function gameloop() {
    const start = performance.now();
    ctx.clearRect(0, 0, c.width, c.height);
    let qt = new _components_quad_tree__WEBPACK_IMPORTED_MODULE_6__["default"](0, 0, c.width, c.height, Math.floor(objects.length / 100));
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i].object;
        object.timeout();
        object.calc();
        object.render(ctx);
        object.velocity();
        qt.insert(object);
    }

    for (let i = objects.length -1; i > -1; i--) {
        const object = objects[i].object;
        object.collisions = [];
        const a = qt.query(object);
        for (let j = 0; j < a.length; j++) {
            const b = a[j];
            if (b.id !== object.id && object.intersects(b) && object.v.x + object.v.y + b.v.x + b.v.y !== 0) {
                object.onCollide(b)
                b.onCollide(object);
            }
        }
    }
    const end = performance.now();
    const next_frame_timer = (1000/_config_index_json__WEBPACK_IMPORTED_MODULE_8__.fps) - (end - start);
    window.setTimeout(() => {
        window.requestAnimationFrame(gameloop);
    }, next_frame_timer)
}

init();


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style/index.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style/index.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "img {\n    display: none;\n}\n\n/* to remove the top and left whitespace */\n* {\n    margin:0; padding:0;\n}\n\n/* just to be sure these are full screen*/\nhtml, body {\n    width:100%;\n    height:100%;\n}\n\n/* To remove the scrollbars */\ncanvas {\n    display:block;\n    position: absolute;\n}\n\nbody {\n    background-color: rgb(12, 17, 34);\n};\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),

/***/ "./style/index.css":
/*!*************************!*\
  !*** ./style/index.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./style/index.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2F0dGFjay50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9ib3VuZHJ5LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvZW50aXR5LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvaGVscGVyLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvcGFydGljbGUudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9xdWFkX3RyZWUudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9yaWdpZF9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy93ZWF0aGVyLnRzIiwid2VicGFjazovLy8uL2NvbmZpZy9nbG9iYWxzLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3N0eWxlL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly8vLi9zdHlsZS9pbmRleC5jc3M/ZWRjOCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQTZCO0FBR2QsTUFBTSxNQUFPLFNBQVEsK0NBQU07SUFHdEMsWUFDSSxDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUztRQUVULEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxNQUFNLENBQUMsR0FBNkIsSUFBRyxDQUFDO0lBQ3hDLFdBQVcsQ0FBQyxHQUE2QixJQUFHLENBQUM7SUFDN0MsU0FBUyxDQUFDLEtBQWEsSUFBRyxDQUFDO0NBQzlCOzs7Ozs7Ozs7Ozs7Ozs7O0FDakJEO0FBQ0E7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlCQTtBQUFBO0FBQWUsTUFBTSxPQUFPO0lBTXhCLFlBQ0ksQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUztRQUVULElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPO1lBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3RCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBYztRQUNuQixJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsS0FBSztRQUNyQixPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUNmLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFjO1FBQ3JCLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxLQUFLO1FBQ3JCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNiLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLENBQUMsR0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLENBQUMsR0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLENBQUMsR0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQzFDRDtBQUFBO0FBQUE7QUFBQTtBQUE2QjtBQUNFO0FBT2hCLE1BQU0sTUFBTyxTQUFRLGdEQUFPO0lBV3ZDLFlBQ0ksQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNULFdBQW1CLENBQUMsQ0FBQztRQUVyQixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUM7UUFDckIsSUFBSSxDQUFDLEVBQUUsR0FBSSwrQ0FBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQztZQUNwQyxhQUFhO1lBQ2IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsT0FBTztRQUNILElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLElBQUksK0NBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRTtZQUMxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDaEI7UUFDRCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEdBQUc7UUFDQyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsR0FBRztRQUNDLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxFQUFFO1FBQ0UsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksS0FBSSxDQUFDO0lBRVQsT0FBTztRQUNILGFBQWE7UUFDYixHQUFHLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDO1FBQ25DLGFBQWE7UUFDYixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQTZCO1FBQ2hDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYSxJQUFHLENBQUM7SUFFM0IsVUFBVTtRQUNOLGFBQWE7UUFDYixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBRUo7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEZ3Qzs7QUFFekM7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLCtDQUFNO0FBQzFCOztBQUVlLGdFQUFDLFlBQVk7Ozs7Ozs7Ozs7Ozs7QUNYNUI7QUFBQTtBQUFBO0FBQUE7QUFBNkI7QUFDQTtBQUVkLE1BQU0sUUFBUyxTQUFRLCtDQUFNO0lBUXhDO1FBQ0ksYUFBYTtRQUNiLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssRUFBRTtJQUNoQixDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDdkMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRTtZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUk7U0FDcEI7UUFDRCxhQUFhO1FBQ2IsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSTtTQUNyQjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDcEIsSUFBSSxDQUFDLEtBQUssRUFBRTtTQUNmO0lBRUwsQ0FBQztJQUVELEtBQUs7UUFDRCxhQUFhO1FBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRywrQ0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNuQyxhQUFhO1FBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRywrQ0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNuQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRywrQ0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFJLCtDQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBNkI7UUFDaEMsR0FBRyxDQUFDLFNBQVMsR0FBQyxvQkFBb0I7UUFDbEMsR0FBRyxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsS0FBSztRQUMxQixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLFdBQVcsR0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFO0lBQ2hCLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEQ0QjtBQUNZO0FBQ1o7QUFDQTs7QUFFZCxxQkFBcUIsK0NBQU07QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsK0NBQU07QUFDM0I7O0FBRUEsZUFBZSxJQUFJO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsb0JBQW9CLDRCQUE0QjtBQUNqRyxpREFBaUQsb0JBQW9CLDRCQUE0QjtBQUNqRyxrREFBa0Qsb0JBQW9CLDRCQUE0QjtBQUNsRyxrREFBa0Qsb0JBQW9CLDRCQUE0QjtBQUNsRztBQUNBLGtEQUFrRCxxQkFBcUIsUUFBUSxxQkFBcUIsNEJBQTRCO0FBQ2hJO0FBQ0E7O0FBRUE7QUFDQSxvRUFBb0UsY0FBYztBQUNsRixnRUFBZ0UsY0FBYztBQUM5RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsSUFBSTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPLHFDQUFxQztBQUMzRCxlQUFlLG1DQUFtQztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxlQUFlLHlCQUF5QjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwrQ0FBTTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxJQUFJO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixtQkFBbUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUEsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsUUFBUTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLCtDQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYiw4Q0FBOEMsSUFBSSwrQ0FBTSxTQUFTO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwrQ0FBTTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvTUE7QUFBQTtBQUFBO0FBQStCO0FBRWhCLE1BQU0sUUFBUyxTQUFRLGdEQUFPO0lBU3pDLFlBQ0ksQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNULFFBQWdCO1FBRWhCLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQWR0QixXQUFNLEdBQWMsRUFBRTtRQUN0QixjQUFTLEdBQWUsRUFBRTtRQWN0QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWM7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsT0FBTyxLQUFLO1NBQ2Y7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3ZCLE9BQU8sSUFBSTtTQUNkO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUU7YUFDbkI7WUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2pDLE9BQU8sSUFBSTtpQkFDZDthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsU0FBUztRQUNMLE1BQU0sRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDbkMsSUFBSSxRQUFRLENBQUMsQ0FBQyxFQUFNLENBQUMsRUFBTSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDO1lBQzlDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBTSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDO1lBQzlDLElBQUksUUFBUSxDQUFDLENBQUMsRUFBTSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDO1lBQzlDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxRQUFRLENBQUM7U0FDakQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUE2QjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDckIsT0FBTztTQUNWO1FBQ0QsTUFBTSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxHQUFHLElBQUksQ0FBQztRQUMxQixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQVksRUFBRSxFQUFFO1lBQ3BDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2xCLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBNkIsSUFBRyxDQUFDO0lBRTdDLEtBQUssQ0FBQyxLQUFjO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxJQUFJLEtBQUssR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQWMsRUFBRSxFQUFFO1lBQ3pELE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hCLHVFQUF1RTthQUMxRTtTQUNKO1FBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2QsTUFBTSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxHQUFHLElBQUk7WUFDekIsYUFBYTtZQUNiLEdBQUcsQ0FBQyxTQUFTLEdBQUMsa0JBQWtCO1lBQ2hDLGFBQWE7WUFDYixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUNyQixhQUFhO1lBQ2IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7WUFDckIsYUFBYTtZQUNiLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUN2QixhQUFhO1lBQ2IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1NBQzFCO1FBR0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUVKOzs7Ozs7Ozs7Ozs7O0FDdkdEO0FBQUE7QUFBQTtBQUE2QjtBQUVkLE1BQU0sV0FBWSxTQUFRLCtDQUFNO0lBQzNDLFlBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUNsRCxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxHQUE2QixJQUFHLENBQUM7SUFDeEMsV0FBVyxDQUFDLEdBQTZCLElBQUcsQ0FBQztJQUM3QyxTQUFTLENBQUMsS0FBYSxJQUFHLENBQUM7Q0FDOUI7Ozs7Ozs7Ozs7Ozs7QUNURDtBQUFBO0FBQUE7QUFBQTtBQUE2QjtBQUNBO0FBRWQsTUFBTSxPQUFRLFNBQVEsK0NBQU07SUFNdkM7UUFDSSxhQUFhO1FBQ2IsS0FBSyxDQUFDLCtDQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsK0NBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsK0NBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRywrQ0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELElBQUk7UUFDQSxhQUFhO1FBQ2IsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRTtTQUNmO0lBQ0wsQ0FBQztJQUVELEtBQUs7UUFDRCxhQUFhO1FBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRywrQ0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNuQyxhQUFhO1FBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRywrQ0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQTZCO1FBQ2hDLEdBQUcsQ0FBQyxTQUFTLEdBQUMsaUJBQWlCO1FBQy9CLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRTtJQUNoQixDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQTZCLElBQUcsQ0FBQztDQUVoRDs7Ozs7Ozs7Ozs7O0FDekNEOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFeUM7QUFDQTtBQUNXO0FBQ0g7QUFDTjtBQUNFO0FBQ0M7O0FBRW5CO0FBQ2M7O0FBRWY7O0FBRTFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQyxhQUFhOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxzRUFBVTs7QUFFZCxRQUFRLDBEQUFNOztBQUVkO0FBQ0EsbUJBQW1CLGFBQWE7QUFDaEMsWUFBWSxnRUFBVztBQUN2QixZQUFZLGdFQUFXO0FBQ3ZCLFlBQVksZ0VBQVc7QUFDdkIsWUFBWSxnRUFBVztBQUN2Qjs7QUFFQSxtQkFBbUIsS0FBSywrQ0FBTSxtQkFBbUI7QUFDakQsWUFBWSwyREFBTztBQUNuQjtBQUNBLG1CQUFtQixLQUFLLCtDQUFNLHFCQUFxQjtBQUNuRCxZQUFZLDREQUFRO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsNkRBQVE7QUFDekIsbUJBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUMsUUFBUTtBQUMzQztBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsY0FBYztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLCtDQUFNO0FBQ3pDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7Ozs7Ozs7Ozs7OztBQzVGQSwyQkFBMkIsbUJBQU8sQ0FBQyxxR0FBZ0Q7QUFDbkY7QUFDQSxjQUFjLFFBQVMsUUFBUSxvQkFBb0IsR0FBRyxvREFBb0QsZUFBZSxXQUFXLEdBQUcsNERBQTRELGlCQUFpQixrQkFBa0IsR0FBRyw0Q0FBNEMsb0JBQW9CLHlCQUF5QixHQUFHLFVBQVUsd0NBQXdDLElBQUk7Ozs7Ozs7Ozs7Ozs7QUNGOVc7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQyxxQkFBcUI7QUFDaEU7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IscUJBQXFCO0FBQ3pDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDhCQUE4Qjs7QUFFOUI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsY0FBYztBQUNuRTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ3pGYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxZQUFZLDJCQUEyQjtBQUN2QztBQUNBOztBQUVBLFlBQVksdUJBQXVCO0FBQ25DO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsWUFBWSx1QkFBdUI7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxTQUFJOztBQUVuRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxrQ0FBa0M7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsR0FBRzs7QUFFSDs7O0FBR0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0ZBQXdGO0FBQ3hGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsdUJBQXVCO0FBQzNDOztBQUVBO0FBQ0EsdUJBQXVCLDRCQUE0QjtBQUNuRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUN6UkEsY0FBYyxtQkFBTyxDQUFDLG9IQUFzRDs7QUFFNUU7QUFDQSxjQUFjLFFBQVM7QUFDdkI7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsbUpBQXdFOztBQUU3RjtBQUNBO0FBQ0EiLCJmaWxlIjoiMC5ib290c3RyYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW50aXR5IGZyb20gJy4vZW50aXR5J1xuaW1wb3J0IEhlbHBlciBmcm9tICcuL2hlbHBlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXR0YWNrIGV4dGVuZHMgRW50aXR5IHtcbiAgICBkdXJhdGlvbjogbnVtYmVyXG4gICAgaW5maW5pdGU6IGJvb2xlYW5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICB5OiBudW1iZXIsXG4gICAgICAgIHc6IG51bWJlcixcbiAgICAgICAgaDogbnVtYmVyLFxuICAgICAgICBkOiBudW1iZXIsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIHcsIGgsIGQpXG4gICAgfVxuICAgIHJlbmRlcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge31cbiAgICBkZWJ1Z1JlbmRlcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge31cbiAgICBvbkNvbGxpZGUob3RoZXI6IEVudGl0eSkge31cbn1cbiIsIlxubGV0IHcgPSA2MDA7XG5jb25zdCByZXNvdXJjZXMgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmFja2dyb3VuZChjdHgsIHdpZHRoID0gdywgZHggPSAwKSB7XG4gICAgbGV0IGRyYXdlciA9IChpZCwgcmF0aW8gPSAxLCBkeSA9IDApID0+IHtcbiAgICAgICAgaWYgKCFyZXNvdXJjZXNbaWRdKSB7XG4gICAgICAgICAgICByZXNvdXJjZXNbaWRdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAtdzsgaSA8IHdpZHRoICsgdyoyOyBpICs9IHcpIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzW2lkXSxcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGkgKyAoZHggKiByYXRpbykgJSB3KSxcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGR5IC0gNDAwLCB3ICsgMSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgW1xuICAgICAgICAnTDExJyxcbiAgICAgICAgJ0w5MicsXG4gICAgICAgICdMODMnLFxuICAgICAgICAnTDdMJyxcbiAgICAgICAgJ0w2NCcsXG4gICAgICAgICdMNTUnLFxuICAgICAgICAnTDRMJyxcbiAgICAgICAgJ0wzNicsXG4gICAgICAgICdMMjcnLFxuICAgICAgICAnTDE4JyxcbiAgICAgICAgJ0wwOScsXG4gICAgXS5mb3JFYWNoKCh4KSA9PiBkcmF3ZXIoeCkpO1xufTtcbiIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm91bmRyeSB7XG4gICAgeDogbnVtYmVyXG4gICAgeTogbnVtYmVyXG4gICAgdzogbnVtYmVyXG4gICAgaDogbnVtYmVyXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICB5OiBudW1iZXIsXG4gICAgICAgIHc6IG51bWJlcixcbiAgICAgICAgaDogbnVtYmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLncgPSB3O1xuICAgICAgICB0aGlzLmggPSBoO1xuICAgIH1cblxuICAgIGNlbnRlclBvaW50KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy54ICsgdGhpcy53IC8gMixcbiAgICAgICAgICAgIHk6IHRoaXMueSArIHRoaXMuaCAvIDIsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb250YWlucyhvdGhlcjogQm91bmRyeSkge1xuICAgICAgICBsZXQge3gseSx3LGh9ID0gb3RoZXJcbiAgICAgICAgcmV0dXJuICh4ICsgdyA+PSB0aGlzLnggJiZcbiAgICAgICAgICAgICAgICB4ICsgdyA8PSB0aGlzLnggKyB0aGlzLncgJiZcbiAgICAgICAgICAgICAgICB5ICsgaCA+PSB0aGlzLnkgJiZcbiAgICAgICAgICAgICAgICB5ICsgaCA8PSB0aGlzLnkgKyB0aGlzLmgpXG4gICAgfVxuXG4gICAgaW50ZXJzZWN0cyhvdGhlcjogQm91bmRyeSkge1xuICAgICAgICBsZXQge3gseSx3LGh9ID0gb3RoZXJcbiAgICAgICAgbGV0IHQgPSB0aGlzO1xuICAgICAgICByZXR1cm4gISh4LXcgPiB0LngrdC53IHx8XG4gICAgICAgICAgICAgICAgIHgrdyA8IHQueC10LncgfHxcbiAgICAgICAgICAgICAgICAgeS1oID4gdC55K3QuaCB8fFxuICAgICAgICAgICAgICAgICB5K2ggPCB0LnktdC5oKVxuICAgIH1cbn1cbiIsImltcG9ydCBIZWxwZXIgZnJvbSAnLi9oZWxwZXInXG5pbXBvcnQgQm91bmRyeSBmcm9tICcuL2JvdW5kcnknXG5cbmludGVyZmFjZSB2ZWxvY2l0eSB7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IGV4dGVuZHMgQm91bmRyeSB7XG4gICAgdjogdmVsb2NpdHlcbiAgICBkdXJhdGlvbjogbnVtYmVyXG4gICAgaW5maW5pdGU6IGJvb2xlYW5cbiAgICBjb2xsaXNpb25zOiBudW1iZXJbXVxuICAgIGlkOiBudW1iZXJcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICB3OiBudW1iZXJcbiAgICBoOiBudW1iZXJcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICB4OiBudW1iZXIsXG4gICAgICAgIHk6IG51bWJlcixcbiAgICAgICAgdzogbnVtYmVyLFxuICAgICAgICBoOiBudW1iZXIsXG4gICAgICAgIGR1cmF0aW9uOiBudW1iZXIgPSAtMSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgdywgaClcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICB0aGlzLnYgPSB7eDogMCwgeTogMH1cbiAgICAgICAgdGhpcy5pZCA9ICBIZWxwZXIucm9sbCgxMDAwMDApLFxuICAgICAgICB0aGlzLmluZmluaXRlID0gdGhpcy5kdXJhdGlvbiA9PT0gLTEsXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgd2luZG93Lm9iamVjdHMucHVzaCh7b2JqZWN0OiB0aGlzfSk7XG4gICAgfVxuXG4gICAgdGltZW91dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5maW5pdGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmR1cmF0aW9uIC09IEhlbHBlci5kZWx0YSg1KTtcbiAgICAgICAgaWYgKHRoaXMuZHVyYXRpb24gPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RydWN0b3IoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZlbG9jaXR5KCkge1xuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy52LngpIDwgMC4xKSB7XG4gICAgICAgICAgICB0aGlzLnYueCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMudi55KSA8IDAuMSkge1xuICAgICAgICAgICAgdGhpcy52LnkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueCArPSBNYXRoLmZsb29yKHRoaXMudi54KTtcbiAgICAgICAgdGhpcy55ICs9IE1hdGguZmxvb3IodGhpcy52LnkpO1xuICAgIH1cblxuICAgIHh3digpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCArIHRoaXMudyArIHRoaXMudi54O1xuICAgIH1cblxuICAgIHlodigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueSArIHRoaXMuaCArIHRoaXMudi55O1xuICAgIH1cblxuICAgIHloKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55ICsgdGhpcy5oO1xuICAgIH1cblxuICAgIGNhbGMoKSB7fVxuXG4gICAgb3V0bGluZSgpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMjAwLCAyMDAsIDApXCI7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLncsIHRoaXMuaCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYigwLDAsMjU1KVwiO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMudywgdGhpcy5oKTtcbiAgICB9XG5cbiAgICBvbkNvbGxpZGUob3RoZXI6IEVudGl0eSkge31cblxuICAgIGRlc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgb2JqZWN0cy5zcGxpY2Uob2JqZWN0cy5maW5kSW5kZXgoeCA9PiB4LmlkID09PSB0aGlzLmlkKSwgMSk7XG4gICAgfVxuXG59XG4iLCJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnL2luZGV4Lmpzb24nXG5cbmZ1bmN0aW9uIHJvbGwobWF4ID0gMSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xufVxuXG5mdW5jdGlvbiBkZWx0YShkID0gMSkge1xuICAgIHJldHVybiAoKDEwMDAgLyBjb25maWcuZnBzKSAqIGQpIC8gMTAwMFxufVxuXG5leHBvcnQgZGVmYXVsdCB7cm9sbCwgZGVsdGF9XG4iLCJpbXBvcnQgSGVscGVyIGZyb20gJy4vaGVscGVyJ1xuaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljbGUgZXh0ZW5kcyBFbnRpdHkge1xuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxuICAgIHc6IG51bWJlclxuICAgIGg6IG51bWJlclxuICAgIGFscGhhOiBudW1iZXJcbiAgICBtYXhlZDogYm9vbGVhblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgc3VwZXIoMCwgMCwgMiwgMiwgLTEpXG4gICAgICAgIHRoaXMucmVzZXQoKVxuICAgIH1cblxuICAgIGNhbGMoKSB7XG4gICAgICAgIHRoaXMuYWxwaGEgLT0gdGhpcy5tYXhlZCA/IDAuMDEgOiAtMC4wMVxuICAgICAgICBpZiAodGhpcy5hbHBoYSA+IDAuOCkge1xuICAgICAgICAgICAgdGhpcy5tYXhlZCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmICh0aGlzLnkgPiBjLmhlaWdodCAtIDUwIHx8IHRoaXMueCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuYWxwaGEgLT0gMC4wNVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYWxwaGEgPD0gMC4wMCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMueCA9IEhlbHBlci5yb2xsKGMud2lkdGggKiAxLjIpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy55ID0gSGVscGVyLnJvbGwoYy5oZWlnaHQpIC0gMjBcbiAgICAgICAgdGhpcy52LnggPSBIZWxwZXIucm9sbCgyKSAtNlxuICAgICAgICB0aGlzLnYueSA9ICBIZWxwZXIucm9sbCgyKSArMVxuICAgICAgICB0aGlzLmFscGhhID0gMC4xO1xuICAgICAgICB0aGlzLm1heGVkID0gZmFsc2VcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZT1gcmdiKDI1MCwgMjUwLCAyMjApYFxuICAgICAgICBjdHguZ2xvYmFsQWxwaGE9dGhpcy5hbHBoYVxuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMudywgdGhpcy5oKVxuICAgICAgICBjdHguZ2xvYmFsQWxwaGE9MVxuICAgIH1cblxuICAgIG9uQ29sbGlkZShvdGhlcjogRW50aXR5KSB7XG4gICAgICAgIHRoaXMucmVzZXQoKVxuICAgIH1cblxufVxuIiwiXG5pbXBvcnQgRW50aXR5IGZyb20gJy4vZW50aXR5J1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcvaW5kZXguanNvbidcbmltcG9ydCBBdHRhY2sgZnJvbSAnLi9hdHRhY2snXG5pbXBvcnQgSGVscGVyIGZyb20gJy4vaGVscGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigxMDAsIDEwMCwgNTAsIDM3LCAtMSk7XG5cbiAgICAgICAgdGhpcy5mbGlwSCA9IDE7XG4gICAgICAgIHRoaXMuYW5pID0gMDtcbiAgICAgICAgdGhpcy5rZXlEb3duTGlzdCA9IG5ldyBBcnJheSgyNTApO1xuICAgICAgICB0aGlzLnN3aWR0aCA9IHRoaXMudztcbiAgICAgICAgdGhpcy5zaGVpZ2h0ID0gdGhpcy5oO1xuICAgICAgICB0aGlzLmlkbGVfc3ByaXRlID0gJ2lkbGUxJztcbiAgICAgICAgdGhpcy5zcGVlZCA9IEhlbHBlci5kZWx0YSgxMCk7XG4gICAgICAgIHRoaXMudi55ID0gMTtcblxuICAgICAgICBjb25zdCB7dyxofSA9IHRoaXM7XG4gICAgICAgIHRoaXMuc3ByaXRlciA9IHtcbiAgICAgICAgICAgIGlkbGUxOiB0aGlzLmZyYW1lcigwLCAwLCA0KSxcbiAgICAgICAgICAgIGlkbGUyOiB0aGlzLmZyYW1lcigzLCA1LCA0LCAoKSA9PiB0aGlzLmlkbGVfc3ByaXRlID0gJ2lkbGUxJyksXG4gICAgICAgICAgICBkdWNrOiB0aGlzLmZyYW1lcig0LCAwLCA0KSxcbiAgICAgICAgICAgIHNsaWRlOiB0aGlzLmZyYW1lcigzLCAzLCA1LCAoKSA9PiB0aGlzLnNsaWRlID0gZmFsc2UpLFxuICAgICAgICAgICAgcnVuOiB0aGlzLmZyYW1lcigxLCAxLCA1KSxcbiAgICAgICAgICAgIGZhbGw6IHRoaXMuZnJhbWVyKDEsIDMsIDIpLFxuICAgICAgICAgICAganVtcDogdGhpcy5mcmFtZXIoMCwgMiwgNiwgKCkgPT4gdGhpcy5qdW1wQW5pID0gZmFsc2UpLFxuICAgICAgICAgICAgYXR0YWNrMTogdGhpcy5mcmFtZXIoMSwgNiwgNCwgKCkgPT4ge3RoaXMuYXR0YWNrID0gZmFsc2U7IHRoaXMuaWRsZV9zcHJpdGUgPSAnaWRsZTInfSksXG4gICAgICAgICAgICBhdHRhY2syOiB0aGlzLmZyYW1lcigwLCA3LCA0LCAoKSA9PiB7dGhpcy5hdHRhY2sgPSBmYWxzZTsgdGhpcy5pZGxlX3Nwcml0ZSA9ICdpZGxlMid9KSxcbiAgICAgICAgICAgIGF0dGFjazM6IHRoaXMuZnJhbWVyKDYsIDEzLCA0LCAoKSA9PiB7dGhpcy5hdHRhY2sgPSBmYWxzZTsgdGhpcy5pZGxlX3Nwcml0ZSA9ICdpZGxlMid9KSxcbiAgICAgICAgICAgIGF0dGFjazQ6IHRoaXMuZnJhbWVyKDIsIDE0LCAzLCAoKSA9PiB7dGhpcy5hdHRhY2sgPSBmYWxzZTsgdGhpcy5pZGxlX3Nwcml0ZSA9ICdpZGxlMid9KSxcbiAgICAgICAgICAgIGF0dGFjazU6IHRoaXMuZnJhbWVyKDQsIDE0LCA0LCAoKSA9PiB0aGlzLmF0dGFja19zcHJpdGUgPSAnYXR0YWNrNicpLFxuICAgICAgICAgICAgYXR0YWNrNjogdGhpcy5mcmFtZXIoNSwgMTQsIDIsICgpID0+IHtpZiAodGhpcy52LnkgIT09IDApIHtyZXR1cm47fSB0aGlzLmF0dGFjayA9IGZhbHNlOyB0aGlzLmlkbGVfc3ByaXRlID0gJ2lkbGUyJ30pLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldF9zcHJpdGUoJ2lkbGUxJyk7XG5cbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiBzZWxmLmtleURvd24oZSksIHtwYXNzaXZlOiB0cnVlfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiBzZWxmLmtleVVwKGUpLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgIH1cblxuICAgIHNldF9zcHJpdGUoc3RyKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRfc3ByaXRlID09PSB0aGlzLnNwcml0ZXJbc3RyXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYW5pID0gMDtcbiAgICAgICAgaWYgKCF0aGlzLnNwcml0ZXJbc3RyXSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBOb3QgYSByZWdpc3RlcmVkIHNwcml0ZTogJHtzdHJ9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50X3Nwcml0ZSA9IHRoaXMuc3ByaXRlcltzdHJdO1xuICAgIH07XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGNvbnN0IGYgPSBNYXRoLmZsb29yKHRoaXMuYW5pKTtcbiAgICAgICAgY29uc3Qge3N4LCBzeX0gPSB0aGlzLmN1cnJlbnRfc3ByaXRlLmZyYW1lc1tmXSB8fCB7c3g6IDAsIHN5OiAwfTtcbiAgICAgICAgY29uc3Qge2ZsaXBILCB4LCB5LCB3LCBoLCBzd2lkdGgsIHNoZWlnaHR9ID0gdGhpcztcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgaWYgKGZsaXBIID09PSAtMSkge1xuICAgICAgICAgICAgY3R4LnNjYWxlKGZsaXBILCAxKTtcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoZmxpcEggKiB3LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBjdHguZHJhd0ltYWdlKHBsYXllcl9zcHJpdGUsIHN4LCBzeSwgc3dpZHRoLCBzaGVpZ2h0LCBNYXRoLmZsb29yKHggKiBmbGlwSCksIE1hdGguZmxvb3IoeSksIHcsIGgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIG9uQ29sbGlkZShvdGhlcikge1xuICAgICAgICBpZiAob3RoZXIuY29uc3RydWN0b3IubmFtZSA9PT0gXCJSaWdpZE9iamVjdFwiKSB7XG4gICAgICAgICAgICBsZXQgYzEgPSB0aGlzLmNlbnRlclBvaW50KCk7XG4gICAgICAgICAgICBsZXQgYzIgPSBvdGhlci5jZW50ZXJQb2ludCgpO1xuXG4gICAgICAgICAgICBpZiAob3RoZXIueSA8IHRoaXMueWgoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudi55ID0gTWF0aC5mbG9vcigodGhpcy55aCgpIC0gb3RoZXIueSkgLyAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy52LnggLz0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYXR0YWNrID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbGxpc2lvbnMpO1xuICAgICAgICBpZiAodGhpcy55ID4gYy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueSA9IDEwMDtcbiAgICAgICAgICAgIHRoaXMudi55ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52LnkgPCAwICYmIHRoaXMuanVtcEFuaSkge1xuICAgICAgICAgICAgdGhpcy5zZXRfc3ByaXRlKCdqdW1wJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52LnkgPCAwICYmICF0aGlzLmp1bXBBbmkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0X3Nwcml0ZSgnZmFsbCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudi55ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXR0YWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRfc3ByaXRlKHRoaXMuYXR0YWNrX3Nwcml0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0X3Nwcml0ZSgnZmFsbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXR0YWNrKSB7XG4gICAgICAgICAgICB0aGlzLnNldF9zcHJpdGUodGhpcy5hdHRhY2tfc3ByaXRlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmtleURvd25bNDBdKSB7XG4gICAgICAgICAgICB0aGlzLnNldF9zcHJpdGUoJ2R1Y2snKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNsaWRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldF9zcHJpdGUoJ3NsaWRlJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoTWF0aC5mbG9vcih0aGlzLnYueCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0X3Nwcml0ZSgncnVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldF9zcHJpdGUodGhpcy5pZGxlX3Nwcml0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qge3NwZWVkLCBwbGF5X29uY2UsIGZyYW1lc30gPSB0aGlzLmN1cnJlbnRfc3ByaXRlO1xuICAgICAgICB0aGlzLmFuaSArPSBzcGVlZDtcbiAgICAgICAgaWYgKHRoaXMuYW5pID49IGZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pIC09IGZyYW1lcy5sZW5ndGg7XG4gICAgICAgICAgICBpZiAocGxheV9vbmNlKSB7XG4gICAgICAgICAgICAgICAgcGxheV9vbmNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52LnggLT0gKCh0aGlzLmtleURvd25MaXN0WzM5XSA/IC0xIDogMCkgKyAodGhpcy5rZXlEb3duTGlzdFszN10gPyAxIDogMCkpICogdGhpcy5zcGVlZCAqIDI7XG4gICAgICAgIHRoaXMudi54IC09IHRoaXMuc2xpZGUgPyB0aGlzLnYueC81IDogdGhpcy52LngvMTA7XG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnYueCkgPiA1KSB7XG4gICAgICAgICAgICB0aGlzLnYueCA9IDUgICogKHRoaXMudi54L01hdGguYWJzKHRoaXMudi54KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29sbGlzaW9uICYmIHRoaXMuYXR0YWNrX3Nwcml0ZSA9PT0gJ2F0dGFjazUnKSB7XG4gICAgICAgICAgICB0aGlzLnNldF9zcHJpdGUoJ2lkbGUyJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudi55ICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnYueSArPSBIZWxwZXIuZGVsdGEoMTApICogMztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZyYW1lcihcbiAgICAgICAgZnggPSAwLFxuICAgICAgICBmeSA9IDAsXG4gICAgICAgIGxlbiA9IDAsXG4gICAgICAgIHBsYXlfb25jZSA9IGZhbHNlLFxuICAgICAgICBzcGVlZCA9IHRoaXMuc3BlZWQsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHt3LGh9ID0gdGhpcztcbiAgICAgICAgbGV0IGZyYW1lcyA9IFtdO1xuICAgICAgICBsZXQgY2xlbiA9IDA7XG4gICAgICAgIHdoaWxlIChjbGVuICE9PSBsZW4pIHtcbiAgICAgICAgICAgIGZyYW1lcy5wdXNoKHtzeDogdypmeCwgc3k6IGgqZnl9KTtcbiAgICAgICAgICAgIGZ4Kys7XG4gICAgICAgICAgICBjbGVuKys7XG4gICAgICAgICAgICBpZiAoZnggPiA2KSB7XG4gICAgICAgICAgICAgICAgZnggPSAwO1xuICAgICAgICAgICAgICAgIGZ5Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtmcmFtZXMsIHBsYXlfb25jZSwgc3BlZWR9O1xuICAgIH1cblxuICAgIGtleVVwKHtrZXlDb2RlfSkge1xuICAgICAgICB0aGlzLmtleURvd25MaXN0W2tleUNvZGVdID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgICBjYXNlIDE2OiAvLyAtPlxuICAgICAgICAgICAgdGhpcy5zbGlkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzk6IC8vIC0+XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0MDogLy8gW1tkb3duIGFycm93XV1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM3OiAvLyA8LVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBrZXlEb3duKHtrZXlDb2RlfSkge1xuICAgICAgICB0aGlzLmtleURvd25MaXN0W2tleUNvZGVdID0gdHJ1ZTtcblxuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAzMjogLy8gW1tzcGFjZV1dXG4gICAgICAgICAgICBpZiAodGhpcy5hdHRhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmF0dGFjayA9IHRydWU7XG4gICAgICAgICAgICBsZXQgYXR0YWNrX3dpZHRoID0gdGhpcy53LzI7XG4gICAgICAgICAgICBsZXQgY2VudGVyID0gdGhpcy54ICsgKHRoaXMudyAtIGF0dGFja193aWR0aCkgLyAyO1xuICAgICAgICAgICAgbmV3IEF0dGFjayhjZW50ZXIgKyAoYXR0YWNrX3dpZHRoKSAqIHRoaXMuZmxpcEgsIHRoaXMueSwgYXR0YWNrX3dpZHRoLCB0aGlzLmgsIDEpO1xuICAgICAgICAgICAgdGhpcy52LnggLz0gMTA7XG4gICAgICAgICAgICBpZiAodGhpcy52LnkgIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja19zcHJpdGUgPSBgYXR0YWNrNWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrX3Nwcml0ZSA9IGBhdHRhY2skezEgKyBIZWxwZXIucm9sbCgzKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzk6IC8vIC0+XG4gICAgICAgICAgICB0aGlzLmZsaXBIID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM3OiAvLyA8LVxuICAgICAgICAgICAgdGhpcy5mbGlwSCA9IC0xO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDA6IC8vIFtbZG93biBhcnJvd11dXG4gICAgICAgICAgICB0aGlzLnYueCA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzODogLy8gW1t1cCBhcnJvd11dXG4gICAgICAgICAgICBpZiAodGhpcy52LnkgIT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnYueSAtPSBIZWxwZXIuZGVsdGEoMTUpICogMjA7XG4gICAgICAgICAgICB0aGlzLnkgKz0gNTtcbiAgICAgICAgICAgIHRoaXMuanVtcEFuaSA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxNjogLy8gW1tzaGlmdF1dXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy52LngpID4gTWF0aC5hYnMoMS41KSkge1xuICAgICAgICAgICAgICAgIHRoaXMudi54ICo9IDI7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG59XG4iLCJpbXBvcnQgSGVscGVyIGZyb20gJy4vaGVscGVyJ1xuaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSdcbmltcG9ydCBCb3VuZHJ5IGZyb20gJy4vYm91bmRyeSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVhZFRyZWUgZXh0ZW5kcyBCb3VuZHJ5IHtcbiAgICBjYXBhY2l0eTogbnVtYmVyXG4gICAgcG9pbnRzOiBCb3VuZHJ5W10gPSBbXVxuICAgIHF1YWRUcmVlczogUXVhZFRyZWVbXSA9IFtdXG4gICAgeDogbnVtYmVyXG4gICAgeTogbnVtYmVyXG4gICAgdzogbnVtYmVyXG4gICAgaDogbnVtYmVyXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICB5OiBudW1iZXIsXG4gICAgICAgIHc6IG51bWJlcixcbiAgICAgICAgaDogbnVtYmVyLFxuICAgICAgICBjYXBhY2l0eTogbnVtYmVyLFxuICAgICkge1xuICAgICAgICBzdXBlcih4LCB5LCB3LCBoKTtcbiAgICAgICAgdGhpcy5jYXBhY2l0eSA9IGNhcGFjaXR5O1xuICAgIH1cblxuICAgIGluc2VydChwb2ludDogQm91bmRyeSkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGFpbnMocG9pbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBvaW50cy5sZW5ndGggPCB0aGlzLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKHBvaW50KVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5xdWFkVHJlZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJkaXZpZGUoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1YWRUcmVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnF1YWRUcmVlc1tpXS5pbnNlcnQocG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3ViZGl2aWRlKCkge1xuICAgICAgICBjb25zdCB7eCwgeSwgdywgaCwgY2FwYWNpdHl9ID0gdGhpcztcbiAgICAgICAgdGhpcy5xdWFkVHJlZXMgPSB0aGlzLnF1YWRUcmVlcy5jb25jYXQoW1xuICAgICAgICAgICAgbmV3IFF1YWRUcmVlKHgsICAgICB5LCAgICAgdy8yLCBoLzIsIGNhcGFjaXR5KSxcbiAgICAgICAgICAgIG5ldyBRdWFkVHJlZSh4K3cvMiwgeSwgICAgIHcvMiwgaC8yLCBjYXBhY2l0eSksXG4gICAgICAgICAgICBuZXcgUXVhZFRyZWUoeCwgICAgIHkraC8yLCB3LzIsIGgvMiwgY2FwYWNpdHkpLFxuICAgICAgICAgICAgbmV3IFF1YWRUcmVlKHgrdy8yLCB5K2gvMiwgdy8yLCBoLzIsIGNhcGFjaXR5KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7eCwgeSwgdywgaH0gPSB0aGlzO1xuICAgICAgICBjdHguZmlsbFJlY3QoeCwgeSwgMSwgaCk7XG4gICAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCB3LCAxKTtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgrdy0xLCB5LCAxLCBoKTtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHkraC0xLCB3LCAxKTtcbiAgICAgICAgdGhpcy5xdWFkVHJlZXMuZm9yRWFjaCgocXQ6IFF1YWRUcmVlKSA9PiB7XG4gICAgICAgICAgICBxdC5yZW5kZXIoY3R4KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRlYnVnUmVuZGVyKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7fVxuXG4gICAgcXVlcnkocmFuZ2U6IEJvdW5kcnkpOiBCb3VuZHJ5W10ge1xuICAgICAgICBpZiAoIXRoaXMuaW50ZXJzZWN0cyhyYW5nZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3VuZDogQm91bmRyeVtdID0gdGhpcy5wb2ludHMuZmlsdGVyKChwb2ludDogQm91bmRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJhbmdlLmNvbnRhaW5zKHBvaW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1YWRUcmVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHN1Yl9xdWVyeSA9IHRoaXMucXVhZFRyZWVzW2ldLnF1ZXJ5KHJhbmdlKTtcbiAgICAgICAgICAgIGlmIChzdWJfcXVlcnkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm91bmQuY29uY2F0KHN1Yl9xdWVyeSk7XG4gICAgICAgICAgICAgICAgLy8gYnJlYWs7IC8vIFVuY29tbWVudCB0aGlzIGlmIG9iamVjdHMgZG8gbm90IGNyb3NzIHNldmVyYWwgc3ViZGl2aWRlcy5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb3VuZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHt4LCB5LCB3LCBofSA9IHRoaXNcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGU9YHJnYigyNTUsMjU1LDI1NSlgXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoeCx5LHcsMSlcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4LHksMSxoKVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHgseStoLHcsMSlcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4K3cseSwxLGgpXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJpZ2lkT2JqZWN0IGV4dGVuZHMgRW50aXR5ICB7XG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIHcsIGgpO1xuICAgIH1cbiAgICByZW5kZXIoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHt9XG4gICAgZGVidWdSZW5kZXIoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHt9XG4gICAgb25Db2xsaWRlKG90aGVyOiBFbnRpdHkpIHt9XG59XG4iLCJpbXBvcnQgSGVscGVyIGZyb20gJy4vaGVscGVyJ1xuaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VhdGhlciBleHRlbmRzIEVudGl0eSB7XG4gICAgeDogbnVtYmVyXG4gICAgeTogbnVtYmVyXG4gICAgdzogbnVtYmVyXG4gICAgaDogbnVtYmVyXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBzdXBlcihIZWxwZXIucm9sbChjLndpZHRoICogMS4yKSwgSGVscGVyLnJvbGwoYy5oZWlnaHQpLCAyLCAyLCAtMSlcbiAgICAgICAgdGhpcy52LnggPSAtMTAgKyBIZWxwZXIucm9sbCgzKVxuICAgICAgICB0aGlzLnYueSA9IDQgKyBIZWxwZXIucm9sbCgzKVxuICAgIH1cblxuICAgIGNhbGMoKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKHRoaXMueSA+IGMuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMueCA9IEhlbHBlci5yb2xsKGMud2lkdGggKiAxLjIpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy55ID0gSGVscGVyLnJvbGwoYy5oZWlnaHQgLyA0KVxuICAgIH1cblxuICAgIHJlbmRlcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlPWByZ2IoMCwgNDAsIDI1NSlgXG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnggLSB0aGlzLncvMiwgdGhpcy55LCB0aGlzLncsIHRoaXMuaClcbiAgICB9XG5cbiAgICBvbkNvbGxpZGUob3RoZXI6IEVudGl0eSkge1xuICAgICAgICB0aGlzLnJlc2V0KClcbiAgICB9XG5cbiAgICBkZWJ1Z1JlbmRlcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge31cblxufVxuIiwid2luZG93Lm9iamVjdHMgPSBbXTtcblxuLy8gdGhlc2UgYXJlIHNldCB3aGVuIHdlIGluaXRpYWxpemUgdGhlIGNhbnZhc1xud2luZG93LmM7XG53aW5kb3cuY3R4O1xuIiwiLypcbiAqXG4gKiBQbGF5ZXI6XG4gKiBodHRwczovL3J2cm9zLml0Y2guaW8vYW5pbWF0ZWQtcGl4ZWwtaGVyb1xuICpcbiAqIEJhY2tncm91bmQ6XG4gKiBodHRwczovL2VkZXJtdW5penouaXRjaC5pby9mcmVlLXBpeGVsLWFydC1mb3Jlc3RcbiAqXG4gKi9cblxuaW1wb3J0IEhlbHBlciBmcm9tIFwiLi9jb21wb25lbnRzL2hlbHBlclwiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9jb21wb25lbnRzL3BsYXllclwiO1xuaW1wb3J0IFJpZ2lkT2JqZWN0IGZyb20gXCIuL2NvbXBvbmVudHMvcmlnaWRfb2JqZWN0XCI7XG5pbXBvcnQgYmFja2dyb3VuZCBmcm9tIFwiLi9jb21wb25lbnRzL2JhY2tncm91bmRcIjtcbmltcG9ydCBXZWF0aGVyIGZyb20gXCIuL2NvbXBvbmVudHMvd2VhdGhlclwiO1xuaW1wb3J0IFBhcnRpY2xlIGZyb20gXCIuL2NvbXBvbmVudHMvcGFydGljbGVcIjtcbmltcG9ydCBRdWFkVHJlZSBmcm9tICcuL2NvbXBvbmVudHMvcXVhZF90cmVlJztcblxuaW1wb3J0ICcuL3N0eWxlL2luZGV4LmNzcyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnL2luZGV4Lmpzb24nO1xuXG5pbXBvcnQgJy4vY29uZmlnL2dsb2JhbHMnO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIHdpbmRvdy5jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNhbnZhc1wiKTtcbiAgICB3aW5kb3cuY3R4ID0gYy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjb25zdCBjMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGF5ZXIyXCIpO1xuICAgIGNvbnN0IGN0eDIgPSBjMi5nZXRDb250ZXh0KFwiMmRcIiwge2FscGhhOiBmYWxzZX0pO1xuXG4gICAgaWYgKCFjIHx8ICFjMiB8fCAhY3R4IHx8ICFjdHgyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZCBub3Qgc2V0IHVwIGNhbnZhcy5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cbiAgICBjMi53aWR0aCA9IGMud2lkdGg7XG4gICAgYzIuaGVpZ2h0ID0gYy5oZWlnaHQgKyAxMzA7XG4gICAgYmFja2dyb3VuZChjdHgyLCBjLndpZHRoKTtcblxuICAgIG5ldyBQbGF5ZXIoKTtcblxuICAgIGxldCBzaXplID0gMTA7XG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCBjLndpZHRoOyBpKz1zaXplKSB7XG4gICAgICAgIG5ldyBSaWdpZE9iamVjdChpLCAwLCBzaXplLCBzaXplKTtcbiAgICAgICAgbmV3IFJpZ2lkT2JqZWN0KGksIGMuaGVpZ2h0LXNpemUsIHNpemUsIHNpemUpO1xuICAgICAgICBuZXcgUmlnaWRPYmplY3QoMCwgaSwgc2l6ZSwgc2l6ZSk7XG4gICAgICAgIG5ldyBSaWdpZE9iamVjdChjLndpZHRoLXNpemUsIGksIHNpemUsIHNpemUpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnLndlYXRoZXIubWF4X2l0ZW1zOyBpKyspIHtcbiAgICAgICAgbmV3IFdlYXRoZXIoYy53aWR0aCwgYy5oZWlnaHQvNCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnLnBhcnRpY2xlcy5tYXhfaXRlbXM7IGkrKykge1xuICAgICAgICBuZXcgUGFydGljbGUoYy53aWR0aCwgYy5oZWlnaHQpO1xuICAgIH1cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVsb29wKTtcbn1cblxuZnVuY3Rpb24gZ2FtZWxvb3AoKSB7XG4gICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KTtcbiAgICBsZXQgcXQgPSBuZXcgUXVhZFRyZWUoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQsIE1hdGguZmxvb3Iob2JqZWN0cy5sZW5ndGggLyAxMDApKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gb2JqZWN0c1tpXS5vYmplY3Q7XG4gICAgICAgIG9iamVjdC50aW1lb3V0KCk7XG4gICAgICAgIG9iamVjdC5jYWxjKCk7XG4gICAgICAgIG9iamVjdC5yZW5kZXIoY3R4KTtcbiAgICAgICAgb2JqZWN0LnZlbG9jaXR5KCk7XG4gICAgICAgIHF0Lmluc2VydChvYmplY3QpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSBvYmplY3RzLmxlbmd0aCAtMTsgaSA+IC0xOyBpLS0pIHtcbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gb2JqZWN0c1tpXS5vYmplY3Q7XG4gICAgICAgIG9iamVjdC5jb2xsaXNpb25zID0gW107XG4gICAgICAgIGNvbnN0IGEgPSBxdC5xdWVyeShvYmplY3QpO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGIgPSBhW2pdO1xuICAgICAgICAgICAgaWYgKGIuaWQgIT09IG9iamVjdC5pZCAmJiBvYmplY3QuaW50ZXJzZWN0cyhiKSAmJiBvYmplY3Qudi54ICsgb2JqZWN0LnYueSArIGIudi54ICsgYi52LnkgIT09IDApIHtcbiAgICAgICAgICAgICAgICBvYmplY3Qub25Db2xsaWRlKGIpXG4gICAgICAgICAgICAgICAgYi5vbkNvbGxpZGUob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBlbmQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBjb25zdCBuZXh0X2ZyYW1lX3RpbWVyID0gKDEwMDAvY29uZmlnLmZwcykgLSAoZW5kIC0gc3RhcnQpO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lbG9vcCk7XG4gICAgfSwgbmV4dF9mcmFtZV90aW1lcilcbn1cblxuaW5pdCgpO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJpbWcge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKiB0byByZW1vdmUgdGhlIHRvcCBhbmQgbGVmdCB3aGl0ZXNwYWNlICovXFxuKiB7XFxuICAgIG1hcmdpbjowOyBwYWRkaW5nOjA7XFxufVxcblxcbi8qIGp1c3QgdG8gYmUgc3VyZSB0aGVzZSBhcmUgZnVsbCBzY3JlZW4qL1xcbmh0bWwsIGJvZHkge1xcbiAgICB3aWR0aDoxMDAlO1xcbiAgICBoZWlnaHQ6MTAwJTtcXG59XFxuXFxuLyogVG8gcmVtb3ZlIHRoZSBzY3JvbGxiYXJzICovXFxuY2FudmFzIHtcXG4gICAgZGlzcGxheTpibG9jaztcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEyLCAxNywgMzQpO1xcbn07XFxuXCIsIFwiXCJdKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwie1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBtb2R1bGVzW19pXTsgLy8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuICAgICAgLy8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcbiAgICAgIC8vIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cbiAgICAgIC8vIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblxuICAgICAgaWYgKGl0ZW1bMF0gPT0gbnVsbCB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBpZiAobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2UgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCIoXCIuY29uY2F0KGl0ZW1bMl0sIFwiKSBhbmQgKFwiKS5jb25jYXQobWVkaWFRdWVyeSwgXCIpXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJzsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG5cbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuXG5cbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gIHJldHVybiBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXIgaXNPbGRJRSA9IGZ1bmN0aW9uIGlzT2xkSUUoKSB7XG4gIHZhciBtZW1vO1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUoKSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3NcbiAgICAgIC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcbiAgICAgIC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcbiAgICAgIC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuICAgICAgLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG4gICAgICBtZW1vID0gQm9vbGVhbih3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59KCk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiBnZXRUYXJnZXQoKSB7XG4gIHZhciBtZW1vID0ge307XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlcyA9IFtdO1xuICB2YXIgbmV3U3R5bGVzID0ge307XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjc3MgPSBpdGVtWzFdO1xuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl07XG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBjc3M6IGNzcyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwXG4gICAgfTtcblxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBwYXJ0czogW3BhcnRdXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldO1xuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuICAgIHZhciBqID0gMDtcblxuICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgZG9tU3R5bGUucmVmcysrO1xuXG4gICAgICBmb3IgKDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG4gICAgICB9XG5cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge1xuICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgcmVmczogMSxcbiAgICAgICAgcGFydHM6IHBhcnRzXG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5hdHRyaWJ1dGVzLm5vbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgICBpZiAobm9uY2UpIHtcbiAgICAgIG9wdGlvbnMuYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKG9wdGlvbnMuYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKGtleSwgb3B0aW9ucy5hdHRyaWJ1dGVzW2tleV0pO1xuICB9KTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucy5pbnNlcnQoc3R5bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQob3B0aW9ucy5pbnNlcnQgfHwgJ2hlYWQnKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICAgIH1cblxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICByZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbnZhciByZXBsYWNlVGV4dCA9IGZ1bmN0aW9uIHJlcGxhY2VUZXh0KCkge1xuICB2YXIgdGV4dFN0b3JlID0gW107XG4gIHJldHVybiBmdW5jdGlvbiByZXBsYWNlKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3M7IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIGJ0b2EpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlO1xuICB2YXIgdXBkYXRlO1xuICB2YXIgcmVtb3ZlO1xuXG4gIGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuICAgIHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUgPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMuYXR0cmlidXRlcyA9IHR5cGVvZiBvcHRpb25zLmF0dHJpYnV0ZXMgPT09ICdvYmplY3QnID8gb3B0aW9ucy5hdHRyaWJ1dGVzIDoge307IC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuICAvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cbiAgaWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09ICdib29sZWFuJykge1xuICAgIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuICB9XG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgdmFyIG1heVJlbW92ZSA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc3R5bGVzW2ldO1xuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cbiAgICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgICBkb21TdHlsZS5yZWZzLS07XG4gICAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgdmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcbiAgICAgIGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1heVJlbW92ZS5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfZG9tU3R5bGUgPSBtYXlSZW1vdmVbX2ldO1xuXG4gICAgICBpZiAoX2RvbVN0eWxlLnJlZnMgPT09IDApIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBfZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBfZG9tU3R5bGUucGFydHNbal0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtfZG9tU3R5bGUuaWRdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn07IiwidmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiKTtcblxuaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG59XG5cbnZhciBvcHRpb25zID0ge31cblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYgKGNvbnRlbnQubG9jYWxzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
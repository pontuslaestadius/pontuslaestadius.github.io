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

let player;
var weather = [];
const config = {
    "bg_accuracy": 5,
    "fps": 24,
    "weather": {
        "max_items": 100
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
    ctx2 = c2.getContext("2d", {alpha: false});

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
    player = new Player();
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

    drawer(layer_92, 0.03);
    drawer(layer_83, 0.05);
    drawer(middle_layer, 0.08);
    drawer(top_layer, 0.05);
    drawer(layer_7L, 0.10);
    drawer(bottom_layer, 0.2);
    drawer(layer_09, 0.1, 30);
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
    ctx.clearRect(0, 0, c.width, c.height);
    while (Helper.roll(100) < 50) {
        new Weather();
    }
    calcObjects.forEach(x => x.calc());
    renderObjects.forEach(x => x.render(ctx));
}
function keyDown(e){
    if (!player) {
        return;
    }
    player.keyDown(e);
}
function keyUp(e){
    if (!player) {
        return;
    }
    player.keyUp(e);
}

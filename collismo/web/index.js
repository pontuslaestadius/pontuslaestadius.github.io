/*
 *
 * Player:
 * https://rvros.itch.io/animated-pixel-hero
 *
 * Background:
 * https://edermunizz.itch.io/free-pixel-art-forest
 *
 */

import Helper from "./components/helper";
import Player from "./components/player";
import RigidObject from "./components/rigid_object";
import background from "./components/background";
import Weather from "./components/weather";
import Particle from "./components/particle";
import QuadTree from './components/quad_tree';

import './style/index.css';
import config from './config/index.json';

import './config/globals';

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
    background(ctx2, c.width);

    new Player();

    let size = 10;
    for (var i = 2; i < c.width; i+=size) {
        new RigidObject(i, 0, size, size);
        new RigidObject(i, c.height-size, size, size);
        new RigidObject(0, i, size, size);
        new RigidObject(c.width-size, i, size, size);
    }

    for (var i = 0; i < config.weather.max_items; i++) {
        new Weather(c.width, c.height/4);
    }
    for (var i = 0; i < config.particles.max_items; i++) {
        new Particle(c.width, c.height);
    }
    window.requestAnimationFrame(gameloop);
}

function gameloop() {
    const start = performance.now();
    ctx.clearRect(0, 0, c.width, c.height);
    let qt = new QuadTree(0, 0, c.width, c.height, Math.floor(objects.length / 100));
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
    const next_frame_timer = (1000/config.fps) - (end - start);
    window.setTimeout(() => {
        window.requestAnimationFrame(gameloop);
    }, next_frame_timer)
}

init();

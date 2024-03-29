import Helper from './components/helper'
import Player from './components/player'
import Entity from './components/entity'
import background from './components/background'
import Weather from './components/weather'
import Particle from './components/particle'
import QuadTree from './components/quad_tree'

import './style/index.css'
import config from './config/index.json'

import './config/globals'

// import * as wasm from 'collismo'

let player;

function gameloop() {
    const start = performance.now()
    const {
        width,
        height
    } = c
    ctx.clearRect(0, 0, width, height)
    let qt = new QuadTree(0, 0, width, height, 2 + Math.floor(objects.length / 500))
    objects
        .map(o => o.object)
        .map(o => {
            o.timeout()
            o.calc()
            o.render(ctx)
            o.velocity()
            qt.insert(o)
            return o
        })
        .filter(o => o.hasVelocity)
        .forEach(o => {
            o.collisions = []
            qt.query(o)
                .forEach(b => {
                    if (b.id !== o.id && o.intersects(b)) {
                        // b.outline()
                        // o.outline()
                        o.onCollide(b)
                        b.onCollide(o)
                    }
                })
        })

    window.setTimeout(() => {
        window.requestAnimationFrame(gameloop);
    }, (1000 / config.fps) - (performance.now() - start))
}

function skyboxloop() {
    const start = performance.now()
    const {
        width,
        height
    } = c2
    ctx2.clearRect(0, 0, width, height)
    background(ctx2, c2.width, player.x / 40)

    window.setTimeout(() => {
        window.requestAnimationFrame(skyboxloop);
    }, (2000 / config.fps) - (performance.now() - start))
}

(() => {
    window.c = document.getElementById('myCanvas')
    window.ctx = c.getContext('2d')

    window.qt_c = document.getElementById('quadTreeLayer')
    window.qt_ctx = c.getContext('2d')

    window.c2 = document.getElementById('layer2')
    window.ctx2 = c2.getContext('2d', {
        alpha: false
    })

    if (!c || !c2 || !ctx || !ctx2) {
        return console.error('Could not set up canvas.')
    }

    c.width = window.innerWidth

    c2.width = c.width
    c2.height = c.height + 130

    player = new Player();

    let size = 20
    new Entity(0, c.height - size, c.width, size, -1, 100, true)
    new Entity(0, 0, size, c.height - size, -1, 100, true)

    for (var i = 0; i < config.weather.max_items; i++) {
        new Weather(c.width, c.height / 4)
    }

    for (var i = 0; i < config.particles.max_items; i++) {
        new Particle(c.width, c.height)
    }

    window.requestAnimationFrame(skyboxloop)
    window.requestAnimationFrame(gameloop)
})()
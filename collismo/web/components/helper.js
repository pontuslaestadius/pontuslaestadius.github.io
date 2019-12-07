
import config from '../config/index.json'

function roll(max = 1) {
    return Math.round(Math.random() * max)
}

function delta(d = 1) {
    return d / config.fps
}

export default {roll, delta}

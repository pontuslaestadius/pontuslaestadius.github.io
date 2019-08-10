
import config from '../config/index.json'

function roll(max = 1) {
    return Math.round(Math.random() * max);
}

function delta(d = 1) {
    return ((1000 / config.fps) * d) / 1000
}

export default {roll, delta}

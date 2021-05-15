import config from '../config/index.json'

function roll(from = 0, to) {
    if (!to) {
        to = from
        from = 0
    }
    return from + Math.round(Math.random() * to)
}

function delta(d = 1) {
    return d / config.fps
}

function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`
}

function minmax(value, min, max) {
    if (value < min) {
        return min
    } else if (value > max) {
        return max
    }
    return value
}

export default {
    roll,
    delta,
    rgb,
    minmax,
}
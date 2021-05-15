
let w = 600;
const resources = {};

export default function background(ctx, width = w, dx = 0) {
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
    ].forEach((x, i) => drawer(x, i));
};

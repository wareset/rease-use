/* eslint-disable */
/*
dester builds:
index.ts
*/
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("rease");

exports.getNodeAfterCreated = e => () => ({
    created: t => {
        e.$ = t.node;
    },
    destroy: () => {
        e.$ = null;
    }
}), exports.getNodeBeforeCreated = e => t => (e.$ = t.node, {
    destroy: () => {
        e.$ = null;
    }
}), exports.onPan = (t, o) => d => {
    const n = d.node, l = {
        ctx: d,
        is: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0
    }, r = [ e.listenGlobal(n, "pointerdown", ((e, d) => {
        d.is = !0, d.ox = d.oy = 0, d.dx = e.clientX, d.dy = e.clientY, t({
            type: "start",
            event: e,
            detail: o,
            delta: {
                x: 0,
                y: 0
            },
            offset: {
                x: 0,
                y: 0
            }
        }, d.ctx);
    }), l), e.listenGlobal(document, "pointermove", ((e, d) => {
        if (d.is) {
            const n = e.clientX, l = e.clientY, r = n - d.dx, x = l - d.dy;
            d.ox += r, d.oy += x, t({
                type: "move",
                event: e,
                detail: o,
                delta: {
                    x: r,
                    y: x
                },
                offset: {
                    x: d.ox,
                    y: d.oy
                }
            }, d.ctx), d.dx = n, d.dy = l;
        }
    }), l), e.listenGlobal(document, "pointerup", ((e, d) => {
        d.is && (d.is = !1, t({
            type: "end",
            event: e,
            detail: o,
            delta: {
                x: 0,
                y: 0
            },
            offset: {
                x: d.ox,
                y: d.oy
            }
        }, d.ctx));
    }), l) ];
    return () => {
        for (let e = r.length; e--; ) r[e]();
    };
};

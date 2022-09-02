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
    var l = d.node, n = {
        ctx: d,
        is: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0
    }, r = [ //! FIX FOR MOBILES
    e.listenGlobal(l, "touchstart-prevent", []), e.listenGlobal(l, "pointerdown", ((e, d) => {
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
    }), n), e.listenGlobal(document, "pointermove", ((e, d) => {
        if (d.is) {
            var l = e.clientX, n = e.clientY, r = l - d.dx, x = n - d.dy;
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
            }, d.ctx), d.dx = l, d.dy = n;
        }
    }), n), e.listenGlobal(document, "pointerup", ((e, d) => {
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
    }), n) ];
    return () => {
        for (var e = r.length; e--; ) r[e]();
    };
};

/* eslint-disable */
/*
dester builds:
index.ts
*/
import { listenGlobal as e } from "rease";

var t = e => t => (e.$ = t.node, {
    destroy: () => {
        e.$ = null;
    }
}), o = e => () => ({
    created: t => {
        e.$ = t.node;
    },
    destroy: () => {
        e.$ = null;
    }
}), d = (t, o) => d => {
    var n = d.node, r = {
        ctx: d,
        is: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0
    }, x = [ //! FIX FOR MOBILES
    e(n, "touchstart-prevent", []), e(n, "pointerdown", ((e, d) => {
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
    }), r), e(document, "pointermove", ((e, d) => {
        if (d.is) {
            var n = e.clientX, r = e.clientY, x = n - d.dx, y = r - d.dy;
            d.ox += x, d.oy += y, t({
                type: "move",
                event: e,
                detail: o,
                delta: {
                    x: x,
                    y: y
                },
                offset: {
                    x: d.ox,
                    y: d.oy
                }
            }, d.ctx), d.dx = n, d.dy = r;
        }
    }), r), e(document, "pointerup", ((e, d) => {
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
    }), r) ];
    return () => {
        for (var e = x.length; e--; ) x[e]();
    };
};

export { o as getNodeAfterCreated, t as getNodeBeforeCreated, d as onPan };

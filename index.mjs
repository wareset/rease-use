/* eslint-disable */
/*
dester builds:
index.ts
*/
import { listenGlobal as e } from "rease";

const t = e => t => (e.$ = t.node, {
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
    const n = d.node, x = {
        ctx: d,
        is: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0
    }, y = [ e(n, "pointerdown", ((e, d) => {
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
    }), x), e(document, "pointermove", ((e, d) => {
        if (d.is) {
            const n = e.clientX, x = e.clientY, y = n - d.dx, i = x - d.dy;
            d.ox += y, d.oy += i, t({
                type: "move",
                event: e,
                detail: o,
                delta: {
                    x: y,
                    y: i
                },
                offset: {
                    x: d.ox,
                    y: d.oy
                }
            }, d.ctx), d.dx = n, d.dy = x;
        }
    }), x), e(document, "pointerup", ((e, d) => {
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
    }), x) ];
    return () => {
        for (let e = y.length; e--; ) y[e]();
    };
};

export { o as getNodeAfterCreated, t as getNodeBeforeCreated, d as onPan };

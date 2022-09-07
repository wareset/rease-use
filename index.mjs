/* eslint-disable */
/*
dester builds:
index.ts
*/
import { listenGlobal as e } from "rease";

var o = e => o => (e.$ = o.node, {
    destroy: () => {
        e.$ = null;
    }
}), t = e => () => ({
    created: o => {
        e.$ = o.node;
    },
    destroy: () => {
        e.$ = null;
    }
}), n = (e, o) => {
    e.stopPropagation(), o.isMove && e.cancelable && e.preventDefault();
}, i = (o, t) => i => {
    var d = i.node, s = {
        ctx: i,
        isDown: !1,
        isMove: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0
    }, r = [ //! FIX FOR MOBILES
    e(d, "touchstart", n, s), e(d, "touchmove", n, s), e(d, "touchend", n, s), e(d, "pointerdown", ((e, o) => {
        o.isDown = !0, o.isMove = !1, o.ox = o.oy = 0, o.dx = e.clientX, o.dy = e.clientY;
    }), s), e(document, "pointermove", ((e, n) => {
        if (n.isMove) {
            var i = e.clientX, d = e.clientY, s = i - n.dx, r = d - n.dy;
            n.ox += s, n.oy += r, o({
                type: "move",
                event: e,
                detail: t,
                delta: {
                    x: s,
                    y: r
                },
                offset: {
                    x: n.ox,
                    y: n.oy
                }
            }, n.ctx), n.dx = i, n.dy = d;
        } else n.isDown && (n.isDown = !1, n.isMove = !0, o({
            type: "start",
            event: e,
            detail: t,
            delta: {
                x: 0,
                y: 0
            },
            offset: {
                x: 0,
                y: 0
            }
        }, n.ctx));
    }), s), e(document, "pointerup", ((e, n) => {
        n.isMove ? (n.isDown = n.isMove = !1, o({
            type: "end",
            event: e,
            detail: t,
            delta: {
                x: 0,
                y: 0
            },
            offset: {
                x: n.ox,
                y: n.oy
            }
        }, n.ctx)) : n.isDown && (n.isDown = !1);
    }), s) ];
    return () => {
        for (var e = r.length; e-- > 0; ) r[e]();
    };
};

export { t as getNodeAfterCreated, o as getNodeBeforeCreated, i as onPan };

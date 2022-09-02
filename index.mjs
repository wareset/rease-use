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
}), n = (o, t) => n => {
    var d = n.node, i = {
        ctx: n,
        isDown: !1,
        isMove: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0
    }, s = [ //! FIX FOR MOBILES
    e(d, "touchstart-prevent-stop", []), e(d, "touchmove-prevent-stop", []), e(d, "pointerdown", ((e, o) => {
        o.isDown = !0, o.isMove = !1, o.ox = o.oy = 0, o.dx = e.clientX, o.dy = e.clientY;
    }), i), e(document, "pointermove", ((e, n) => {
        if (n.isMove) {
            var d = e.clientX, i = e.clientY, s = d - n.dx, r = i - n.dy;
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
            }, n.ctx), n.dx = d, n.dy = i;
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
    }), i), e(document, "pointerup", ((e, n) => {
        n.isMove && (n.isDown = n.isMove = !1, o({
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
        }, n.ctx));
    }), i) ];
    return () => {
        for (var e = s.length; e--; ) s[e]();
    };
};

export { t as getNodeAfterCreated, o as getNodeBeforeCreated, n as onPan };

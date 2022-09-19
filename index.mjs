/* eslint-disable */
/*
dester builds:
index.ts
*/
import { listenEventGlobal as e } from "rease";

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
}), a = e => {
    e.stopPropagation(), e.cancelable && e.preventDefault();
}, n = e => {
    var t = 0, o = 0;
    if ("touches" in e) {
        var a = e.touches[0];
        a && (t = a.clientX, o = a.clientY);
    } else t = e.clientX, o = e.clientY;
    return [ t, o ];
}, i = (t, o) => i => {
    var r = i.node, d = {
        ctx: i,
        isDown: !1,
        isMove: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0
    }, s = [ e(r, "tapstart-capture", ((e, t) => {
        var o = e.detail.event;
        t.isDown = !0, t.isMove = !1, t.ox = t.oy = 0, [t.dx, t.dy] = n(o);
    }), d), e(document, "tapmove-capture", ((e, i) => {
        var r = e.detail.event;
        if (i.isMove) {
            var [d, s] = n(r), l = d - i.dx, v = s - i.dy;
            i.ox += l, i.oy += v, a(r), t({
                type: "move",
                event: r,
                detail: o,
                delta: {
                    x: l,
                    y: v
                },
                offset: {
                    x: i.ox,
                    y: i.oy
                }
            }, i.ctx), i.dx = d, i.dy = s;
        } else i.isDown && (i.isDown = !1, i.isMove = !0, a(r), t({
            type: "start",
            event: r,
            detail: o,
            delta: {
                x: 0,
                y: 0
            },
            offset: {
                x: 0,
                y: 0
            }
        }, i.ctx));
    }), d), e(document, "tapend-capture", ((e, n) => {
        if (n.isMove) {
            var i = e.detail.event;
            n.isDown = n.isMove = !1, a(i), t({
                type: "end",
                event: i,
                detail: o,
                delta: {
                    x: 0,
                    y: 0
                },
                offset: {
                    x: n.ox,
                    y: n.oy
                }
            }, n.ctx);
        } else n.isDown && (n.isDown = !1);
    }), d) ];
    return () => {
        for (var e = s.length; e-- > 0; ) s[e]();
    };
};

export { o as getNodeAfterCreated, t as getNodeBeforeCreated, i as onPan };

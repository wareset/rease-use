/* eslint-disable */
/*
dester builds:
index.ts
*/
import { listenOnEventGlobal as e } from "rease";

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
}), {abs: a} = Math, n = e => {
    e.stopPropagation(), e.cancelable && e.preventDefault();
}, d = e => {
    var t = 0, o = 0;
    if ("touches" in e) {
        var a = e.touches[0];
        a && (t = a.clientX, o = a.clientY);
    } else t = e.clientX, o = e.clientY;
    return [ t, o ];
}, l = (t, o, l = 10) => r => {
    var s = r.node, v = {
        ctx: r,
        isMove: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0,
        es: null
    }, i = [];
    return i.push(e(s, "tapstart", ((r, s) => {
        var x = v.es = r.detail.event;
        s.isMove = !1, s.ox = s.oy = 0, [s.dx, s.dy] = d(x), i.push(e(document, "tapmove", ((e, r) => {
            var s = e.detail.event, [v, i] = d(s), x = v - r.dx, y = i - r.dy;
            r.ox += x, r.oy += y, r.isMove ? (n(s), t({
                type: "move",
                event: s,
                detail: o,
                delta: {
                    x: x,
                    y: y
                },
                offset: {
                    x: r.ox,
                    y: r.oy
                }
            }, r.ctx), r.dx = v, r.dy = i) : a(r.ox) + a(r.oy) > l && (r.isMove = !0, n(s), 
            t({
                type: "start",
                event: r.es,
                detail: o,
                delta: {
                    x: 0,
                    y: 0
                },
                offset: {
                    x: 0,
                    y: 0
                }
            }, r.ctx));
        }), v), e(document, "tapend", ((e, a) => {
            for (;i.length > 1; ) i.pop()();
            if (a.isMove) {
                a.isMove = !1;
                var d = e.detail.event;
                n(d), t({
                    type: "end",
                    event: d,
                    detail: o,
                    delta: {
                        x: 0,
                        y: 0
                    },
                    offset: {
                        x: a.ox,
                        y: a.oy
                    }
                }, a.ctx);
            }
        }), v));
    }), v)), () => {
        for (;i.length > 0; ) i.pop()();
    };
};

export { o as getNodeAfterCreated, t as getNodeBeforeCreated, l as onPan };

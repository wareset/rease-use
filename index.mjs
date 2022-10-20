/* eslint-disable */
/*
dester builds:
index.ts
*/
import { listenOnEventGlobal as e } from "rease";

var {abs: t} = Math, o = e => {
    e.stopPropagation(), e.cancelable && e.preventDefault();
}, a = e => {
    var t = 0, o = 0;
    if ("touches" in e) {
        var a = e.touches[0];
        a && (t = a.clientX, o = a.clientY);
    } else t = e.clientX, o = e.clientY;
    return [ t, o ];
}, d = (d, n, s = 10) => l => {
    var i = {
        ctx: l,
        d: n,
        t: s,
        is: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0,
        es: null,
        u: []
    };
    return i.u.push(e(l.node, "tapstart", ((n, s) => {
        var l = s.es = n.detail.event;
        s.is = !1, s.ox = s.oy = 0, [s.dx, s.dy] = a(l), s.u.push(e(document, "tapmove", ((e, n) => {
            var s = e.detail.event, [l, i] = a(s), r = l - n.dx, x = i - n.dy;
            n.ox += r, n.oy += x, n.is ? (o(s), d({
                type: "move",
                event: s,
                detail: n.d,
                delta: {
                    x: r,
                    y: x
                },
                offset: {
                    x: n.ox,
                    y: n.oy
                }
            }, n.ctx), n.dx = l, n.dy = i) : t(n.ox) + t(n.oy) > n.t && (n.is = !0, o(s), d({
                type: "start",
                event: n.es,
                detail: n.d,
                delta: {
                    x: 0,
                    y: 0
                },
                offset: {
                    x: 0,
                    y: 0
                }
            }, n.ctx));
        }), s), e(document, "tapend", ((e, t) => {
            for (;t.u.length > 1; ) t.u.pop()();
            if (t.is) {
                t.is = !1;
                var a = e.detail.event;
                o(a), d({
                    type: "end",
                    event: a,
                    detail: t.d,
                    delta: {
                        x: 0,
                        y: 0
                    },
                    offset: {
                        x: t.ox,
                        y: t.oy
                    }
                }, t.ctx);
            }
        }), s));
    }), i)), () => {
        for (;i.u.length > 0; ) i.u.pop()();
    };
};

export { d as default };

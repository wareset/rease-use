/* eslint-disable */
/*
dester builds:
index.ts
*/
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("rease"), {abs: t} = Math, o = e => {
    e.stopPropagation(), e.cancelable && e.preventDefault();
}, a = e => {
    var t = 0, o = 0;
    if ("touches" in e) {
        var a = e.touches[0];
        a && (t = a.clientX, o = a.clientY);
    } else t = e.clientX, o = e.clientY;
    return [ t, o ];
};

exports.default = (n, l, d = 10) => s => {
    var i = {
        ctx: s,
        d: l,
        t: d,
        is: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0,
        es: null,
        u: []
    };
    return i.u.push(e.listenOnEventGlobal(s.node, "tapstart", ((l, d) => {
        var s = d.es = l.detail.event;
        d.is = !1, d.ox = d.oy = 0, [d.dx, d.dy] = a(s), d.u.push(e.listenOnEventGlobal(document, "tapmove", ((e, l) => {
            var d = e.detail.event, [s, i] = a(d), r = s - l.dx, x = i - l.dy;
            l.ox += r, l.oy += x, l.is ? (o(d), n({
                type: "move",
                event: d,
                detail: l.d,
                delta: {
                    x: r,
                    y: x
                },
                offset: {
                    x: l.ox,
                    y: l.oy
                }
            }, l.ctx), l.dx = s, l.dy = i) : t(l.ox) + t(l.oy) > l.t && (l.is = !0, o(d), n({
                type: "start",
                event: l.es,
                detail: l.d,
                delta: {
                    x: 0,
                    y: 0
                },
                offset: {
                    x: 0,
                    y: 0
                }
            }, l.ctx));
        }), d), e.listenOnEventGlobal(document, "tapend", ((e, t) => {
            for (;t.u.length > 1; ) t.u.pop()();
            if (t.is) {
                t.is = !1;
                var a = e.detail.event;
                o(a), n({
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
        }), d));
    }), i)), () => {
        for (;i.u.length > 0; ) i.u.pop()();
    };
};

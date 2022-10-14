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
}, n = e => {
    var t = 0, o = 0;
    if ("touches" in e) {
        var n = e.touches[0];
        n && (t = n.clientX, o = n.clientY);
    } else t = e.clientX, o = e.clientY;
    return [ t, o ];
};

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
}), exports.onPan = (a, l, d = 10) => r => {
    var s = r.node, v = {
        ctx: r,
        isMove: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0,
        es: null
    }, i = [];
    return i.push(e.listenOnEventGlobal(s, "tapstart", ((r, s) => {
        var x = v.es = r.detail.event;
        s.isMove = !1, s.ox = s.oy = 0, [s.dx, s.dy] = n(x), i.push(e.listenOnEventGlobal(document, "tapmove", ((e, r) => {
            var s = e.detail.event, [v, i] = n(s), x = v - r.dx, y = i - r.dy;
            r.ox += x, r.oy += y, r.isMove ? (o(s), a({
                type: "move",
                event: s,
                detail: l,
                delta: {
                    x: x,
                    y: y
                },
                offset: {
                    x: r.ox,
                    y: r.oy
                }
            }, r.ctx), r.dx = v, r.dy = i) : t(r.ox) + t(r.oy) > d && (r.isMove = !0, o(s), 
            a({
                type: "start",
                event: r.es,
                detail: l,
                delta: {
                    x: 0,
                    y: 0
                },
                offset: {
                    x: 0,
                    y: 0
                }
            }, r.ctx));
        }), v), e.listenOnEventGlobal(document, "tapend", ((e, t) => {
            for (;i.length > 1; ) i.pop()();
            if (t.isMove) {
                t.isMove = !1;
                var n = e.detail.event;
                o(n), a({
                    type: "end",
                    event: n,
                    detail: l,
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
        }), v));
    }), v)), () => {
        for (;i.length > 0; ) i.pop()();
    };
};

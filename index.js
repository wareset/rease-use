/* eslint-disable */
/*
dester builds:
index.ts
*/
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("rease"), t = e => {
    e.stopPropagation(), e.cancelable && e.preventDefault();
}, o = e => {
    var t = 0, o = 0;
    if ("touches" in e) {
        var a = e.touches[0];
        a && (t = a.clientX, o = a.clientY);
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
}), exports.onPan = (a, n) => r => {
    var l = r.node, s = {
        ctx: r,
        isDown: !1,
        isMove: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0
    }, d = [ e.listenGlobal(l, "tapstart-capture", ((e, t) => {
        var a = e.detail.event;
        t.isDown = !0, t.isMove = !1, t.ox = t.oy = 0, [t.dx, t.dy] = o(a);
    }), s), e.listenGlobal(document, "tapmove-capture", ((e, r) => {
        var l = e.detail.event;
        if (r.isMove) {
            var [s, d] = o(l), i = s - r.dx, v = d - r.dy;
            r.ox += i, r.oy += v, t(l), a({
                type: "move",
                event: l,
                detail: n,
                delta: {
                    x: i,
                    y: v
                },
                offset: {
                    x: r.ox,
                    y: r.oy
                }
            }, r.ctx), r.dx = s, r.dy = d;
        } else r.isDown && (r.isDown = !1, r.isMove = !0, t(l), a({
            type: "start",
            event: l,
            detail: n,
            delta: {
                x: 0,
                y: 0
            },
            offset: {
                x: 0,
                y: 0
            }
        }, r.ctx));
    }), s), e.listenGlobal(document, "tapend-capture", ((e, o) => {
        if (o.isMove) {
            var r = e.detail.event;
            o.isDown = o.isMove = !1, t(r), a({
                type: "end",
                event: r,
                detail: n,
                delta: {
                    x: 0,
                    y: 0
                },
                offset: {
                    x: o.ox,
                    y: o.oy
                }
            }, o.ctx);
        } else o.isDown && (o.isDown = !1);
    }), s) ];
    return () => {
        for (var e = d.length; e-- > 0; ) d[e]();
    };
};

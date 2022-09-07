/* eslint-disable */
/*
dester builds:
index.ts
*/
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("rease"), o = (e, o) => {
    e.stopPropagation(), o.isMove && e.cancelable && e.preventDefault();
};

exports.getNodeAfterCreated = e => () => ({
    created: o => {
        e.$ = o.node;
    },
    destroy: () => {
        e.$ = null;
    }
}), exports.getNodeBeforeCreated = e => o => (e.$ = o.node, {
    destroy: () => {
        e.$ = null;
    }
}), exports.onPan = (t, n) => l => {
    var s = l.node, i = {
        ctx: l,
        isDown: !1,
        isMove: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0
    }, d = [ //! FIX FOR MOBILES
    e.listenGlobal(s, "touchstart", o, i), e.listenGlobal(s, "touchmove", o, i), e.listenGlobal(s, "touchend", o, i), e.listenGlobal(s, "pointerdown", ((e, o) => {
        o.isDown = !0, o.isMove = !1, o.ox = o.oy = 0, o.dx = e.clientX, o.dy = e.clientY;
    }), i), e.listenGlobal(document, "pointermove", ((e, o) => {
        if (o.isMove) {
            var l = e.clientX, s = e.clientY, i = l - o.dx, d = s - o.dy;
            o.ox += i, o.oy += d, t({
                type: "move",
                event: e,
                detail: n,
                delta: {
                    x: i,
                    y: d
                },
                offset: {
                    x: o.ox,
                    y: o.oy
                }
            }, o.ctx), o.dx = l, o.dy = s;
        } else o.isDown && (o.isDown = !1, o.isMove = !0, t({
            type: "start",
            event: e,
            detail: n,
            delta: {
                x: 0,
                y: 0
            },
            offset: {
                x: 0,
                y: 0
            }
        }, o.ctx));
    }), i), e.listenGlobal(document, "pointerup", ((e, o) => {
        o.isMove ? (o.isDown = o.isMove = !1, t({
            type: "end",
            event: e,
            detail: n,
            delta: {
                x: 0,
                y: 0
            },
            offset: {
                x: o.ox,
                y: o.oy
            }
        }, o.ctx)) : o.isDown && (o.isDown = !1);
    }), i) ];
    return () => {
        for (var e = d.length; e-- > 0; ) d[e]();
    };
};

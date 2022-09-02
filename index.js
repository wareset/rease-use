/* eslint-disable */
/*
dester builds:
index.ts
*/
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("rease");

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
}), exports.onPan = (t, o) => n => {
    var l = n.node, s = {
        ctx: n,
        isDown: !1,
        isMove: !1,
        dx: 0,
        dy: 0,
        ox: 0,
        oy: 0
    }, d = [ //! FIX FOR MOBILES
    e.listenGlobal(l, "touchstart-prevent-stop", []), e.listenGlobal(l, "touchmove-prevent-stop", []), e.listenGlobal(l, "pointerdown", ((e, t) => {
        t.isDown = !0, t.isMove = !1, t.ox = t.oy = 0, t.dx = e.clientX, t.dy = e.clientY;
    }), s), e.listenGlobal(document, "pointermove", ((e, n) => {
        if (n.isMove) {
            var l = e.clientX, s = e.clientY, d = l - n.dx, r = s - n.dy;
            n.ox += d, n.oy += r, t({
                type: "move",
                event: e,
                detail: o,
                delta: {
                    x: d,
                    y: r
                },
                offset: {
                    x: n.ox,
                    y: n.oy
                }
            }, n.ctx), n.dx = l, n.dy = s;
        } else n.isDown && (n.isDown = !1, n.isMove = !0, t({
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
        }, n.ctx));
    }), s), e.listenGlobal(document, "pointerup", ((e, n) => {
        n.isMove && (n.isDown = n.isMove = !1, t({
            type: "end",
            event: e,
            detail: o,
            delta: {
                x: 0,
                y: 0
            },
            offset: {
                x: n.ox,
                y: n.oy
            }
        }, n.ctx));
    }), s) ];
    return () => {
        for (var e = d.length; e--; ) d[e]();
    };
};

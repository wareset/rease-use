import { TypeReaseContext, TypeReaseUse } from 'rease'
import { TypeReaseContextElement, ReaseSubject } from 'rease'
import { listenGlobal } from 'rease'

export const getNodeBeforeCreated = (
  storeForNode: ReaseSubject<any>
) => (ctx: TypeReaseContext) =>
  (storeForNode.$ = ctx.node,
  { destroy: (): void => { storeForNode.$ = null } })

export const getNodeAfterCreated = (
  storeForNode: ReaseSubject<any>
): TypeReaseUse => () => ({
  created: (ctx): void => { storeForNode.$ = ctx.node },
  destroy: (): void => { storeForNode.$ = null },
})

const fix = (e: TouchEvent, c: any): void => {
  e.stopPropagation()
  if (c.isMove && e.cancelable) e.preventDefault()
}

export const onPan = <C extends readonly [] | {} | undefined = undefined>(
  cb: (
    pan: {
      event: PointerEvent
      type: 'start' | 'move' | 'end'
      delta: { x: number, y: number }
      offset: { x: number, y: number }
      detail: C
   },
    ctx: TypeReaseContextElement
  ) => void,
  detail?: C
): TypeReaseUse => (ctx) => {
    const node = ctx.node as HTMLElement
    const context = { ctx, isDown: false, isMove: false, dx: 0, dy: 0, ox: 0, oy: 0 }
    const unlisteners = [
      //! FIX FOR MOBILES
      listenGlobal(node, 'touchstart', fix, context),
      listenGlobal(node, 'touchmove', fix, context),
      listenGlobal(node, 'touchend', fix, context),
      
      listenGlobal(node, 'pointerdown', (e: PointerEvent, c) => {
        c.isDown = true, c.isMove = false
        c.ox = c.oy = 0
        c.dx = e.clientX, c.dy = e.clientY
      }, context),
      listenGlobal(document, 'pointermove', (e: PointerEvent, c) => {
        if (c.isMove) {
          const cx = e.clientX, cy = e.clientY
          const dx = cx - c.dx, dy = cy - c.dy
          c.ox += dx, c.oy += dy
          cb({
            type  : 'move',
            event : e,
            detail: detail!,
            delta : { x: dx, y: dy },
            offset: { x: c.ox, y: c.oy }
          }, c.ctx)
          c.dx = cx, c.dy = cy
        } else if (c.isDown) {
          c.isDown = false, c.isMove = true
          cb({
            type  : 'start',
            event : e,
            detail: detail!,
            delta : { x: 0, y: 0 },
            offset: { x: 0, y: 0 }
          }, c.ctx)
        }
      }, context),
      listenGlobal(document, 'pointerup', (e: PointerEvent, c) => {
        if (c.isMove) {
          c.isDown = c.isMove = false
          cb({
            type  : 'end',
            event : e,
            detail: detail!,
            delta : { x: 0, y: 0 },
            offset: { x: c.ox, y: c.oy }
          }, c.ctx)
        } else if (c.isDown) c.isDown = false
      }, context)
    ]

    return (): void => {
      for (let i = unlisteners.length; i-- > 0;) unlisteners[i]()
    }
  }

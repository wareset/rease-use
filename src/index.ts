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

// const fix = (e: TouchEvent, c: any): void => {
//   e.stopPropagation()
//   if (c.isMove && e.cancelable) e.preventDefault()
// }

const fix = (e: TouchEvent | MouseEvent): void => {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
}

const getClientXY = (evt: TouchEvent | MouseEvent): [number, number] => {
  let cx = 0, cy = 0
  if ('touches' in evt) {
    const touch = evt.touches[0]
    if (touch) cx = touch.clientX, cy = touch.clientY
  } else cx = evt.clientX, cy = evt.clientY
  return [cx, cy]
}

export const onPan = <C extends readonly [] | {} | undefined = undefined>(
  cb: (
    pan: {
      event: TouchEvent | MouseEvent
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
      listenGlobal(node, 'tapstart-capture', (e: CustomEvent, c) => {
        const evt: TouchEvent | MouseEvent = e.detail.event

        c.isDown = true, c.isMove = false
        c.ox = c.oy = 0
        ;[c.dx, c.dy] = getClientXY(evt)
      }, context),
      listenGlobal(document, 'tapmove-capture', (e: CustomEvent, c) => {
        const evt: TouchEvent | MouseEvent = e.detail.event
        
        if (c.isMove) {
          const [cx, cy] = getClientXY(evt)
          const dx = cx - c.dx, dy = cy - c.dy
          
          c.ox += dx, c.oy += dy
          fix(evt)
          cb({
            type  : 'move',
            event : evt,
            detail: detail!,
            delta : { x: dx, y: dy },
            offset: { x: c.ox, y: c.oy }
          }, c.ctx)
          c.dx = cx, c.dy = cy
        } else if (c.isDown) {
          c.isDown = false, c.isMove = true
          fix(evt)
          cb({
            type  : 'start',
            event : evt,
            detail: detail!,
            delta : { x: 0, y: 0 },
            offset: { x: 0, y: 0 }
          }, c.ctx)
        }
      }, context),
      listenGlobal(document, 'tapend-capture', (e: CustomEvent, c) => {
        if (c.isMove) {
          const evt: TouchEvent | MouseEvent = e.detail.event

          c.isDown = c.isMove = false
          fix(evt)
          cb({
            type  : 'end',
            event : evt,
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

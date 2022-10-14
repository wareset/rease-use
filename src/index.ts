import { TypeReaseContext, TypeReaseUse } from 'rease'
import { TypeReaseContextElement, ReaseSubject } from 'rease'
import { listenOnEventGlobal } from 'rease'

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

const { abs } = Math

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
  detail?: C,
  threshold = 10
): TypeReaseUse => (ctx) => {
    const node = ctx.node as HTMLElement
    const context = { ctx, isMove: false, dx: 0, dy: 0, ox: 0, oy: 0, es: null as any }
    const unlisteners: any[] = []
    unlisteners.push(
      listenOnEventGlobal(node, 'tapstart', (e: CustomEvent, c) => {
        const evt: TouchEvent | MouseEvent = context.es = e.detail.event

        c.isMove = false
        c.ox = c.oy = 0
        ;[c.dx, c.dy] = getClientXY(evt)

        // console.log('tapstart')

        unlisteners.push(
          listenOnEventGlobal(document, 'tapmove', (e: CustomEvent, c) => {
            const evt: TouchEvent | MouseEvent = e.detail.event
          
            const [cx, cy] = getClientXY(evt)
            const dx = cx - c.dx, dy = cy - c.dy
          
            c.ox += dx, c.oy += dy
            // console.log('tapmove', c.isMove, abs(c.ox) + abs(c.oy))
            if (c.isMove) {
              fix(evt)
              cb({
                type  : 'move',
                event : evt,
                detail: detail!,
                delta : { x: dx, y: dy },
                offset: { x: c.ox, y: c.oy }
              }, c.ctx)
              c.dx = cx, c.dy = cy
            } else if (abs(c.ox) + abs(c.oy) > threshold) {
              c.isMove = true
              fix(evt)
              cb({
                type  : 'start',
                event : c.es,
                detail: detail!,
                delta : { x: 0, y: 0 },
                offset: { x: 0, y: 0 }
              }, c.ctx)
            }
          }, context),
          listenOnEventGlobal(document, 'tapend', (e: CustomEvent, c) => {
            for (;unlisteners.length > 1;) unlisteners.pop()()
            // console.log('tapend')
            if (c.isMove) {
              c.isMove = false
              const evt: TouchEvent | MouseEvent = e.detail.event
              fix(evt)
              cb({
                type  : 'end',
                event : evt,
                detail: detail!,
                delta : { x: 0, y: 0 },
                offset: { x: c.ox, y: c.oy }
              }, c.ctx)
            }
          }, context)
        )
      }, context)
    )

    return (): void => {
      for (;unlisteners.length > 0;) unlisteners.pop()()
    }
  }

import { TypeReaseUse } from 'rease'
import { TypeReaseContextElement } from 'rease'
import { listenOnEventGlobal } from 'rease'

// export const getNodeBeforeCreated = (
//   storeForNode: ReaseSubject<any>
// ) => (ctx: TypeReaseContext) =>
//   (storeForNode.$ = ctx.node,
//   { destroy: (): void => { storeForNode.$ = null } })

// export const getNodeAfterCreated = (
//   storeForNode: ReaseSubject<any>
// ): TypeReaseUse => () => ({
//   created: (ctx): void => { storeForNode.$ = ctx.node },
//   destroy: (): void => { storeForNode.$ = null },
// })

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

const onPan = <C extends readonly [] | {} | null | undefined = undefined>(
  cb: (
    evt: {
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
    const context =
      { ctx, d: detail, t: threshold, is: false, dx: 0, dy: 0, ox: 0, oy: 0, es: null as any, u: [] as Function[] }
    context.u.push(
      listenOnEventGlobal(ctx.node as HTMLElement, 'tapstart', (e: CustomEvent, c) => {
        const evt: TouchEvent | MouseEvent = c.es = e.detail.event

        c.is = false
        c.ox = c.oy = 0
        ;[c.dx, c.dy] = getClientXY(evt)

        // console.log('tapstart')

        c.u.push(
          listenOnEventGlobal(document, 'tapmove', (e: CustomEvent, c) => {
            const evt: TouchEvent | MouseEvent = e.detail.event
          
            const [cx, cy] = getClientXY(evt)
            const dx = cx - c.dx, dy = cy - c.dy
          
            c.ox += dx, c.oy += dy
            // console.log('tapmove', c.isMove, abs(c.ox) + abs(c.oy))
            if (c.is) {
              fix(evt)
              cb({
                type  : 'move',
                event : evt,
                detail: c.d!,
                delta : { x: dx, y: dy },
                offset: { x: c.ox, y: c.oy }
              }, c.ctx)
              c.dx = cx, c.dy = cy
            } else if (abs(c.ox) + abs(c.oy) > c.t) {
              c.is = true
              fix(evt)
              cb({
                type  : 'start',
                event : c.es,
                detail: c.d!,
                delta : { x: 0, y: 0 },
                offset: { x: 0, y: 0 }
              }, c.ctx)
            }
          }, c),
          listenOnEventGlobal(document, 'tapend', (e: CustomEvent, c) => {
            for (;c.u.length > 1;) c.u.pop()!()
            // console.log('tapend')
            if (c.is) {
              c.is = false
              const evt: TouchEvent | MouseEvent = e.detail.event
              fix(evt)
              cb({
                type  : 'end',
                event : evt,
                detail: c.d!,
                delta : { x: 0, y: 0 },
                offset: { x: c.ox, y: c.oy }
              }, c.ctx)
            }
          }, c)
        )
      }, context)
    )

    return (): void => {
      for (;context.u.length > 0;) context.u.pop()!()
    }
  }

export default onPan

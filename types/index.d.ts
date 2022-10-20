import { TypeReaseUse } from 'rease';
import { TypeReaseContextElement } from 'rease';
declare const onPan: <C extends {} | readonly [] = undefined>(cb: (evt: {
    event: TouchEvent | MouseEvent;
    type: 'start' | 'move' | 'end';
    delta: {
        x: number;
        y: number;
    };
    offset: {
        x: number;
        y: number;
    };
    detail: C;
}, ctx: TypeReaseContextElement) => void, detail?: C, threshold?: number) => TypeReaseUse;
export default onPan;

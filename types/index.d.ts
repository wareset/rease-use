import { TypeReaseContext, TypeReaseUse } from 'rease';
import { TypeReaseContextElement, ReaseStorage } from 'rease';
export declare const getNodeBeforeCreated: (storeForNode: ReaseStorage<any>) => (ctx: TypeReaseContext) => {
    destroy: () => void;
};
export declare const getNodeAfterCreated: (storeForNode: ReaseStorage<any>) => TypeReaseUse;
export declare const onPan: <C extends {} | readonly [] = undefined>(cb: (pan: {
    event: PointerEvent;
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
}, ctx: TypeReaseContextElement) => void, detail?: C) => TypeReaseUse;

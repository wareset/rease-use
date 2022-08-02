import { TypeReaseContext, TypeReaseUse } from 'rease';
import { TypeReaseContextElement, ReaseStore } from 'rease';
export declare const getNodeBeforeCreated: (storeForNode: ReaseStore<any>) => (ctx: TypeReaseContext) => {
    destroy: () => void;
};
export declare const getNodeAfterCreated: (storeForNode: ReaseStore<any>) => TypeReaseUse;
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

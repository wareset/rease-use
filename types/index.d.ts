import { TypeReaseContext, TypeReaseUse } from 'rease';
import { TypeReaseContextElement, ReaseSubject } from 'rease';
export declare const getNodeBeforeCreated: (storeForNode: ReaseSubject<any>) => (ctx: TypeReaseContext) => {
    destroy: () => void;
};
export declare const getNodeAfterCreated: (storeForNode: ReaseSubject<any>) => TypeReaseUse;
export declare const onPan: <C extends {} | readonly [] = undefined>(cb: (pan: {
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

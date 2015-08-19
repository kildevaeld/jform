import { EventEmitter } from 'views/lib/events';
import { ICollection, IModel } from 'views/lib/types';
export declare class Collection<U extends IModel> extends EventEmitter implements ICollection {
    private _items;
    length: number;
    constructor(items?: U[]);
    indexOf(value: U): number;
    forEach(fn: (value: U, index?: number) => void, ctx?: any): any;
    add(items: U | U[]): U | U[];
    remove(item: U): any;
    has(item: U): boolean;
    reset(items?: U[]): void;
    clear(): void;
    toJSON(): any;
}

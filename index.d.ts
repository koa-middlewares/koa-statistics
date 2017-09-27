/// <reference types="koa" />
import * as Koa from 'koa';
export interface IRequest {
    count: number;
    max: number;
    min: number;
    total: number;
    avg: number;
}
export interface IOptions {
    ignore404?: boolean;
    responseTime?: boolean;
}
export declare const data: {
    [url: string]: IRequest;
};
export declare const middleware: (options?: IOptions) => (ctx: Koa.Context, next: () => void) => Promise<void>;

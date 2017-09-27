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

export const data: { [url: string]: IRequest } = {};

export const middleware = (options: IOptions = {ignore404: true, responseTime: true}) => {
    return async (ctx: Koa.Context, next: () => void) => {
        const path = ctx.path;
        const begin = Date.now();
        await next();
        const time = Date.now() - begin;
        options.responseTime && ctx.set('x-response-time', `${time}ms`);
        if (options.ignore404 && ctx.status === 404) {
            return;
        }
        if (!data[path]) {
            data[path] = {count: 0, max: 0, min: 0, avg: 0, total: 0};
        }
        data[path].count++;
        data[path].min = Math.min(data[path].min, time);
        data[path].max = Math.max(data[path].max, time);
        data[path].total += time;
        data[path].avg = data[path].total / data[path].count;
    };
};

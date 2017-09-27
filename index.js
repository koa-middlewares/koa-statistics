"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = {};
exports.middleware = (options = { ignore404: true, responseTime: true }) => {
    return async (ctx, next) => {
        const path = ctx.path;
        const begin = Date.now();
        await next();
        const time = Date.now() - begin;
        options.responseTime && ctx.set('x-response-time', `${time}ms`);
        if (options.ignore404 && ctx.status === 404) {
            return;
        }
        if (!exports.data[path]) {
            exports.data[path] = { count: 0, max: 0, min: 0, avg: 0, total: 0 };
        }
        exports.data[path].count++;
        exports.data[path].min = Math.min(exports.data[path].min, time);
        exports.data[path].max = Math.max(exports.data[path].max, time);
        exports.data[path].total += time;
        exports.data[path].avg = exports.data[path].total / exports.data[path].count;
    };
};
//# sourceMappingURL=index.js.map
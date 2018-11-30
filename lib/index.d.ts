import * as winston from 'winston';
export declare const createLogger: CreateLogger;
interface CreateLogger {
    (props: {
        logPath: string;
    }): winston.Logger & EnhancedLogger;
}
interface EnhancedLogger {
    with(arg: {
        colorFunction: Function;
        tag: string;
    }): winston.Logger;
}
export {};
//# sourceMappingURL=index.d.ts.map
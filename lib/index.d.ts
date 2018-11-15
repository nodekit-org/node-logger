import * as winston from 'winston';
declare const createLogger: CreateLogger;
export { createLogger, };
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
//# sourceMappingURL=index.d.ts.map
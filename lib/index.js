"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("winston-daily-rotate-file");
const chalk_1 = require("chalk");
const fs = require("fs");
const triple_beam_1 = require("triple-beam");
const util = require("util");
const winston = require("winston");
const logTag = chalk_1.default.cyan('[node-logger]');
exports.createLogger = function ({ logPath, }) {
    (function logPathShouldBeValid() {
        if (!fs.existsSync(logPath)) {
            fs.mkdirSync(logPath);
        }
    })();
    const consoleLogger = new winston.transports.Console({
        format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), printf),
        level: 'debug',
    });
    const dailyRotateFileLogger = new winston.transports['DailyRotateFile']({
        datePattern: 'YYYY-MM-DD',
        dirname: logPath,
        filename: 'app-%DATE%.log',
        format: winston.format.combine(ignoreConsoleOnly(), winston.format.timestamp(), winston.format.json()),
        level: 'error',
        prepend: false,
    });
    const winstonLogger = winston.createLogger({
        transports: [
            consoleLogger,
            dailyRotateFileLogger,
        ],
    });
    const enhancedLogger = withWith(winstonLogger);
    printLevels(enhancedLogger);
    return enhancedLogger;
};
const printf = winston.format.printf(({ colorFunction, level, tag = 'default', timestamp, message, [triple_beam_1.SPLAT]: splat = [], }) => {
    try {
        let translatedMessage = '';
        if (isArray(message)) {
            const [format, ...params] = message;
            translatedMessage = util.format(format, ...params);
        }
        else {
            translatedMessage = util.format(message, ...splat);
        }
        const coloredTag = colorFunction ? colorFunction(tag) : tag;
        return `${timestamp} ${level}: [${coloredTag}] ${translatedMessage}`;
    }
    catch (err) {
        console.error(err);
        return `${timestamp} ${level}: [ERROR_ON_LOGGING] ${message}`;
    }
});
const ignoreConsoleOnly = winston.format((info, opts) => {
    return info.consoleOnly ? false : info;
});
function withWith(logger) {
    if (logger.with !== undefined) {
        console.warn(`${logTag} winston.with is overwritten by custom with(). Contact the author to either rename the props or remove it.`);
    }
    Object.defineProperty(logger, 'with', {
        enumerable: true,
        value: function ({ colorFunction, tag, }) {
            console.log(`${logTag} logger is regitered with tag: %s, having colorFunction: %s`, tag, !!colorFunction);
            const that = this;
            const obj = {};
            Object.keys(that.levels)
                .forEach((level) => {
                obj[level] = function (...args) {
                    that[level]({
                        colorFunction,
                        message: args,
                        tag,
                    });
                };
            });
            return obj;
        },
    });
    return logger;
}
function isArray(src) {
    return src.constructor === Array;
}
function printLevels(logger) {
    const levels = Object.keys(logger.levels).join(' ');
    console.log(`${logTag} default levels: %s`, levels);
}

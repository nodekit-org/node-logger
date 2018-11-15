const chalk = require('chalk');
const NodeLogger = require('../lib/index');

const LOG_PATH = __dirname + '/logs';

const nodeLogger = NodeLogger.createLogger({
  logPath: LOG_PATH,
});

const gulpLog = nodeLogger.with({
  colorFunction: chalk.gray,
  tag: 'gulp',
});

const httpLog = nodeLogger.with({
  colorFunction: chalk.green,
  tag: 'http',
});

nodeLogger.debug('debug - single string');
nodeLogger.debug('debug - splat without with(): %s', 123);

gulpLog.info('gulpLog - single string');
gulpLog.debug('gulpLog - single splat string %s %o', 123, { a: 1 });

httpLog.debug('httpLog - single string');

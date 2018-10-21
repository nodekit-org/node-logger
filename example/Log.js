const NodeLogger = require('../lib/NodeLogger');

const LOG_PATH = __dirname + '/logs';

const nodeLogger = NodeLogger.createLogger({
  logPath: LOG_PATH,
});

const gulpLog = nodeLogger.with({
  color: 'gray',
  tag: 'gulp',
});

const httpLog = nodeLogger.with({
  color: 'black',
  tag: 'http',
});

gulpLog.info('gulp');
httpLog.debug('http');

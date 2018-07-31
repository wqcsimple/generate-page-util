let winston = require('winston');
let date = require('locutus/php/datetime/date');

let logger;

function initLogger() {
    if (!logger)
    {
        logger = new (winston.Logger)({
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    colorize: true,
                    timestamp: function () {
                        return date('Y-m-d H:i:s O', new Date().getTime() / 1000);
                    },
                })
            ]
        });
    }
}

function log(level, arguments)
{
    // args.unshift(date('Y-m-d H:i:s O', new Date().getTime() / 1000));
    // console.log.apply(null, args);

    initLogger();
    arguments.unshift(level);
    logger.log.apply(logger, arguments);
}

function debug(){
    let args = Array.prototype.slice.call(arguments);
    log('debug', args)
}

function info(){
    let args = Array.prototype.slice.call(arguments);
    log('info', args)
}

function warn(){
    let args = Array.prototype.slice.call(arguments);
    log('warn', args)
}

function error(){
    let args = Array.prototype.slice.call(arguments);
    log('error', args)
}

function trace(){
    let args = Array.prototype.slice.call(arguments);
    log('trace', args)
}

module.exports = {
    log: log,

    debug: debug,
    d: debug,

    info: info,
    i: info,

    warn: warn,
    w: warn,

    error: error,
    e: error,

    trace: trace,
    t: trace
};

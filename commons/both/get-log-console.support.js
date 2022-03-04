const moment = require("moment-timezone");

const info = (request) => {

    const logLevelType = process.env.LEVEL_LOG_TYPE || 'info';

    if (process.env.LEVEL_LOG < 1 || logLevelType != 'info') { return }

    const res = {
        level: '[INFO]',                                    // Level of the logging message  
        placedAt: moment().format("YYYY-MM-DDTHH:mm:ss"),
        message: request.message,                           // Descriptive message being logged.
        data: request.data || null
    };

    return console.info(res);
}

const log = (request) => {

    const logLevelType = process.env.LEVEL_LOG_TYPE || 'log';

    if (process.env.LEVEL_LOG < 2 || logLevelType != 'log') { return }

    const res = {
        level: '[LOG]',                                    // Level of the logging message  
        placedAt: moment().format("YYYY-MM-DDTHH:mm:ss"),
        message: request.message,                           // Descriptive message being logged.
        data: request.data || null
    };

    return console.log(res);
}

const warn = (request) => {

    const logLevelType = process.env.LEVEL_LOG_TYPE || 'warn';

    if (process.env.LEVEL_LOG < 3 || logLevelType != 'warn') { return }

    const res = {
        level: '[WARN]',                                    // Level of the logging message  
        placedAt: moment().format("YYYY-MM-DDTHH:mm:ss"),
        message: request.message,                           // Descriptive message being logged.
        data: request.data || null
    };

    return console.warn(res);
}

const error = (request) => {

    const logLevelType = process.env.LEVEL_LOG_TYPE || 'error';

    if (process.env.LEVEL_LOG < 4 || logLevelType != 'error') { return }

    const res = {
        level: '[ERROR]',                                    // Level of the logging message  
        placedAt: moment().format("YYYY-MM-DDTHH:mm:ss"),
        message: request.message,                           // Descriptive message being logged.
        data: request.data || null
    };

    return console.error(res);
}

const functionTypesLogs = {
    info,
    error,
    warn,
    log
}

const getLogConsole = (params) => {

    if (!console[params.consoleType]) { return }

    const getFunctionTypesLogs = functionTypesLogs[params.consoleType];

    getFunctionTypesLogs(params);
}

module.exports = getLogConsole;

/*
const _ = require('./');

const consoleTypeList = [
    {
        type: "info",
        message: "cai aqui :"
    },
    {
        type: "error",
        message: "ops... err",
        data: {
            err: "err"
        }
    },
    {
        type: "warn",
        message: "ops... warn",
        data: {
            warn: "warn"
        }
    },
    {
        type: "log",
        message: "teste ..."
    }
]

for (const iterator of consoleTypeList) {

    const getConsole = global.files.utils.getConsoleLog;

    getConsole({ consoleType: iterator.type, message: iterator.message, data: iterator.data });
};
*/
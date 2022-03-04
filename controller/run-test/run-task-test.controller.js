const path = require('path');
const shell = require('shelljs');
const fs = require('fs');
const moment = require("moment-timezone");

const appAutomation = process.env.APP_AUTO || 'production';

const routesAutomation = {
    production: 'https://test-automated.omniplat.io',
    dev: 'http://localhost:5000'
}

let json;
let uri;
let testScope;
let testRequester;

const year = moment().format("YYYY");
const month = moment().format("MM");

const getStatsTestFront = (json) => {
    let pass = 0;
    let fail = 0;
    let pending = 0;
    let duration = 0;

    for (const iterator of json) {

        duration += iterator.duration

        if (iterator.pending) { pending++ }

        else if (iterator.passed) { pass++ }

        else { fail++ }
    }

    const res = {
        "end": null,
        "other": 0,
        "start": null,
        "tests": pass + fail + pending,
        "passes": pass,
        "suites": null,
        "pending": null,
        "skipped": pending,
        "duration": duration,
        "failures": fail,
        "hasOther": false,
        "hasSkipped": false,
        "passPercent": null,
        "pendingPercent": null,
        "testsRegistered": pass + fail + pending
    }

    return res;
}

const invokeHttp = async (options) => {
    return new Promise((resolve, reject) => {

        const http = require('request');

        /**
         * Abstract Function That Queries The Jira
         * @param options : { uri, method, auth: { user, password } };
         * @resolve body
         */

        const response = { sucess: {}, error: {}, params: options }

        http(options, function (error, res, body) {

            if (res.statusCode >= 400) {

                response.error = {
                    status: true,
                    body: res
                }

                resolve(response);
            }
            else {

                response.sucess = {
                    status: true,
                    body: res.body
                }
                resolve(response);
            }
        });
    });
}

const uploadFilesS3 = async (request) => {

    const directoryPath = request.directoryPath;
    const file = request.file;
    const bucket = request.bucket;

    let flag = true;
    let count = 0;

    const ffTimeout = request.ffTimeout || 60;

    let res;

    while (flag && count < ffTimeout) {

        res = await invokeHttp({
            uri: `${routesAutomation[appAutomation]}/private/v1/aws/s3/upload-files`,
            method: 'POST',
            auth: { user: 'testing', password: 'ucMEKVW8v9CuxvLK' },
            formData: {
                'sampleFile': {
                    'value': fs.createReadStream(directoryPath + file),
                    'options': {
                        filename: file,
                        'contentType': null
                    }
                },
                bucket
            }
        });

        if (res.sucess) {
            flag = false;
        } else {
            setTimeout(() => { }, 500);

            count++;
        }
    }
}

const writingTestRunHistory = async (request) => {

    switch (request.writingType) {
    case 'POST':

        testScope = request.msgSqs.test;
        testRequester = request.msgSqs.test.testRequester;

        let env;

        if (testScope.environment.substr(-4) === '-new') {

            env = testScope.environment.slice(0, -4);
        }
        else if (testScope.environment == 'internal') {

            env = 'int';
        }
        else {
            env = testScope.environment;
        }

        const getResVersionsApi = await invokeHttp({
            uri: `https://versions.omniplat.io/envs/${env}`,
            method: 'GET'
        });

        const test_started_at = moment().format("YYYY-MM-DDTHH:mm:ss");

        if (testScope.testRequester) {

            delete testScope.testRequester;
        }

        json = {
            "stage_ind": testScope.stageType,
            "key_test": testScope.keyTest.toString(),
            "test_requester": testRequester,
            "test_scope": testScope,
            "test_returned": {
                "reports": null,
                test_started_at,
                "test_finished_at": null,
                "test_execution_status": "running",
                "verions": JSON.parse(getResVersionsApi.sucess.body)
            }
        };

        uri = `${routesAutomation[appAutomation]}/private/v1/mysql/history-test`;

        break;
    case 'PUT':

        const getResHistoryTest = await invokeHttp({
            auth: {
                user: 'testing', password: 'ucMEKVW8v9CuxvLK'
            },
            uri: `${routesAutomation[appAutomation]}/private/v1/mysql/history-test/${testScope.keyTest}`, method: 'GET'
        });

        json = JSON.parse(getResHistoryTest.sucess.body);

        let jsonStats;

        if (testScope.stageType != 'performance') {

            const getResHistoryTestStats = await invokeHttp({
                auth: {
                    user: 'testing', password: 'ucMEKVW8v9CuxvLK'
                },
                uri: `${routesAutomation[appAutomation]}/private/v1/mysql/history-test/${testScope.keyTest}/stats`, method: 'GET'
            });

            jsonStats = JSON.parse(getResHistoryTestStats.sucess.body);

            jsonStats.current = {
                "totalFail": request.stats.failures,
                "totalPass": request.stats.passes,
                "totalTest": request.stats.tests,
                "totalDuration": request.stats.duration
            }
        }

        const year = moment().format("YYYY");
        const month = moment().format("MM");

        json.test_returned.stats = request.stats;

        json.test_returned.stats_compiled = jsonStats;

        json.test_returned.reports = {
            "html": {
                "fileName": `${testScope.keyTest}.html`,
                "urlPublic": `${routesAutomation[appAutomation]}/v1/reports/${testScope.stageType}/${testScope.keyTest}/html`
            },
            "json": {
                "fileName": `${testScope.keyTest}.json`,
                "urlPublic": `${routesAutomation[appAutomation]}/v1/reports/${testScope.stageType}/${testScope.keyTest}/json`
            },
            "logs": {
                "fileName": `${testScope.keyTest}.log`,
                "urlPublic": `${routesAutomation[appAutomation]}/v1/reports/${testScope.stageType}/${testScope.keyTest}/logs`
            },
            "stats": {
                "fileName": "",
                "urlPublic": `${routesAutomation[appAutomation]}/v1/reports/${testScope.stageType}/${testScope.keyTest}/stats`
            },
            "bucketPath": null
        }

        if (testScope.stageType == 'backend' || testScope.stageType == 'frontend') {

            json.test_returned.reports.bucketPath = `test-automation/reports/${testScope.stageType}/${year}/${month}/${testScope.keyTest}`
        }
        else {

            json.test_returned.reports.html.fileName = `index.html`,
            json.test_returned.reports.html.urlPublic = `${routesAutomation[appAutomation]}/v1/reports/${testScope.stageType}/${testScope.keyTest}/index.html`

            json.test_returned.reports.json.fileName = null;
            json.test_returned.reports.json.urlPublic = null;

            json.test_returned.reports.bucketPath = `performance/reports/${year}/${month}/${testScope.keyTest}`

            json.test_returned.stats_compiled = {
                "old": {
                    "totalFail": null,
                    "totalPass": null,
                    "totalTest": null,
                    "totalDuration": null
                },
                "current": {
                    "totalFail": null,
                    "totalPass": null,
                    "totalTest": null,
                    "totalDuration": null
                },
                "averages": {
                    "general": {
                        "totalFail": null,
                        "totalPass": null,
                        "totalTest": null,
                        "totalDuration": null
                    },
                    "environment": {
                        "totalFail": null,
                        "totalPass": null,
                        "totalTest": null,
                        "totalDuration": null
                    }
                }
            }
        }

        if (testScope.stageType == 'frontend') {

            json.test_returned.reports.json.fileName = "combined.json";
        }

        json.test_returned.test_finished_at = moment().format("YYYY-MM-DDTHH:mm:ss");

        json.test_returned.test_execution_status = "finished";

        delete json.id;
        delete json.received_at;
        delete json.ind_status_logical;

        uri = `${routesAutomation[appAutomation]}/private/v1/mysql/history-test/${testScope.keyTest}`;

        break;
    }

    await invokeHttp({
        uri,
        json,
        method: request.writingType,
        auth: {
            user: 'testing', password: 'ucMEKVW8v9CuxvLK'
        },
    });
}

const taskBackendRun = () => {

    const command = testScope.commandContainer;
    const directoryPath = path.resolve() + `/reports/backend/`;
    const logs = `>${directoryPath}${testScope.keyTest}.log 2> ${directoryPath}${testScope.keyTest}.err`;
    const run = `mkdir -p ${directoryPath} && REPORT_NAME="${testScope.keyTest}" LEVEL_LOG=3 ${command} ${logs}`;

    shell.exec(run);

    [".err", ".log", ".json", ".html"].forEach(async extension => {

        let file = testScope.keyTest + extension;
        const bucket = `linx-digital-qa/test-automation/reports/${testScope.stageType}/${year}/${month}/${testScope.keyTest}`;

        await uploadFilesS3({ directoryPath, file, bucket });
    });

    const result = require(directoryPath + testScope.keyTest + ".json");

    return result.stats;
}

const taskFrontendRun = async () => {

    const command = testScope.commandContainer;
    const directoryPath = path.resolve() + `/reports/frontend/${testScope.keyTest}/`;
    const logs = `>${directoryPath}${testScope.keyTest}.log 2> ${directoryPath}${testScope.keyTest}.err`;
    const run = `mkdir -p ${directoryPath} && FILE_NAME=${testScope.keyTest} ${command} ${logs}`;

    shell.exec(run);

    const bucket = `linx-digital-qa/test-automation/reports/${testScope.stageType}/${year}/${month}/${testScope.keyTest}`;

    const dirents = fs.readdirSync(directoryPath, { withFileTypes: true });
    const files = dirents
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);

    for (const file of files) {

        await uploadFilesS3({ directoryPath, file, bucket });
    }

    const getCombineJson = require(directoryPath + 'combined.json');

    const stats = await getStatsTestFront(JSON.parse(getCombineJson));

    return stats;
}

const functionTypeTaskStageRun = {
    backend: taskBackendRun,
    frontend: taskFrontendRun
}

const runTest = async () => {

    const getFuncionTypeTaskStageRun = functionTypeTaskStageRun[testScope.stageType];

    return await getFuncionTypeTaskStageRun();
}

const notifier = async () => {

    return await invokeHttp({
        auth: {
            user: 'testing', password: 'ucMEKVW8v9CuxvLK'
        },
        uri: `${routesAutomation[appAutomation]}/private/v1/notifier/gmail/${testScope.stageType}/${testScope.keyTest}`, method: 'POST'
    });
}

module.exports = { writingTestRunHistory, runTest, notifier };
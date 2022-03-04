const configBaseUrl = require("../config").baseUrl;
const protractorBrowserConfig = require("../config").protractorBrowserConfig;
const controller = require("../controller");

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

const HtmlReporter = require('protractor-beautiful-reporter');

// This is the configuration file showing how a suite of tests might
const config = { jasmineNodeOpts: {} };
const timeout = 300000;

const env = controller.env;
const browserName = controller.browser || 'chrome';
const app = controller.app;
const clientFilter = controller.client;
const squad = controller.squad;
const testLevel = controller.testLevel;

const fileName = process.env.FILE_NAME;

config.directConnect = true;
config.baseUrl = configBaseUrl[app][env];
config.allScriptsTimeout = timeout;
config.getPageTimeout = timeout;
config.framework = 'jasmine';
config.SELENIUM_PROMISE_MANAGER = true;

config.jasmineNodeOpts = {
    isVerbose: false,               // If true, display spec names.
    showColors: true,               // Use colors in the command line report.
    includeStackTrace: false,       // If true, include stack traces in failures.
    defaultTimeoutInterval: timeout,// Default time to wait in ms before a test fails.
    showTiming: true,               // If true, print timestamps for failures
    realtimeFailure: true           // Print failures in real time.
}

let specs = [`../e2e/frontend/${app}/${testLevel}/*.js`];

config.specs = specs;

config.capabilities = protractorBrowserConfig[browserName];

// handle log-in using the onPrepare field.
config.onPrepare = () => {

    browser.waitForAngularEnabled(true);
    browser.ignoreSynchronization = true;
    browser.manage().timeouts().implicitlyWait(0);

    if (fileName) {

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: `reports/frontend/${fileName}`,
            //screenshotsSubfolder: 'images',
            //jsonsSubfolder: 'jsons',
            excludeSkippedSpecs: true,
            takeScreenShotsOnlyForFailedSpecs: true,
            docTitle: `Linx QA Control -> in [${app}]`,
            docName: `${process.env.FILE_NAME}.html`,
            clientDefaults: {
                showTotalDurationIn: "header",
                totalDurationFormat: "hms",
                searchSettings: {
                    allselected: false,
                    passed: false,
                    failed: true,
                    pending: true,
                    withLog: true
                },
                columnSettings: {
                    displayTime: true,
                    displayBrowser: false,
                    displaySessionId: false,
                    displayOS: false,
                    inlineScreenshots: false
                }
            }
        }).getJasmine2Reporter());
    }

    jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));

    global.frontend = {};

    global.frontend.baseUrl = process.env.URL || configBaseUrl[app][env];
}

config.afterLaunch = function (exitCode) {
    console.log('+++++++++++++++++++++AfterLaunch ' + exitCode + '+++++++++++++++');
}

exports.config = config;
const eventBrowser = require('../../helpers').eventBrowser;
const helpers = require("../../helpers/frontend/helpers-protractor");

const instore = (url) => {

    eventBrowser({ type: 'get', url });
    helpers({ type: 'waitForElementNotToBePresent', element: $('style-loading-layer'), timeout: 20000 });
}

const cockpit = () => {

    eventBrowser({ type: 'get', url });
}

const browserFunctionTypes = { instore, cockpit };

const getBrowser = async (baseUrl) => {
    
    const app = process.env.APP;
    const getBrowserFunctionTypes = browserFunctionTypes[app];

    await getBrowserFunctionTypes(baseUrl);
}

/*
    getBrowser(endRoute);
*/

module.exports = getBrowser;
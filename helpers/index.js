module.exports = {
    invokeHttp: require('./both/invoke-http.helpers'),
    locatorsElements: require('./frontend/locators-elements-protractor.helpers'),
    eventBrowser: require('./frontend/event-browser-protractor.helpers'),
    expectedConditions: require('./frontend/expected-conditions-protractor.helpers'),
    browserScripts: require('./frontend/browser-scripts.helpers'),
    //invokeHttpRead: require('./backend/invoke-super-test.helpers').invokeHttpRead,
    //invokeHttpWrite: require('./backend/invoke-super-test.helpers').invokeHttpWrite,
    assertValidation: require('./backend/assert-validation.helpers'),
}
const highlightElement = (element) => {
    browser.controlFlow().execute(function () {
        browser.executeScript("arguments[0].style.border='3px solid red'", element);
    });
}

const scrollToElement = (element) => {
    browser.controlFlow().execute(function () {
        browser.executeScript('arguments[0].scrollIntoView(true)', element.getWebElement());
    });
}

const waitPageLoad = async () => {
    let count = 0;
    let status;

    while (count < 10) {
        status = await browser.executeScript("return document.readyState");
        if (status == "complete") {
            count = 10;
        } else {
            count++;
            browser.sleep(1000);
        }
    }
}

const browserStart = async () => {
    browser.driver.manage().window().maximize();
    browser.waitForAngularEnabled(false);
}

const browserScriptsFunctionTypes = {
    browserStart,
    highlightElement,
    scrollToElement,
    waitPageLoad
}

const browserScripts = (request) => {

    const getBrowserScripts = browserScriptsFunctionTypes[request.type];
    const resBrowserScripts = getBrowserScripts(request);

    return resBrowserScripts;
}

module.exports = browserScripts;
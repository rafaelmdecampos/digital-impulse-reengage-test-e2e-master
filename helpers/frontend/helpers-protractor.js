const protractorHelper = require("protractor-helper");
const EC = protractor.ExpectedConditions;

const highlightElement = (element) => {
    browser.controlFlow().execute(function() {
        browser.executeScript("arguments[0].style.border='3px solid red'", element);
    });
}

const scrollToElement = (element) => {
    browser.controlFlow().execute(function() {
        browser.executeScript('arguments[0].scrollIntoView(true)', element.getWebElement());
    });
}

const helpers = (request) => {

    const type = request.type;
    const element = request.element;
    const timeout = request.timeout;
    let text = request.text;
    let log;
    let elementValue;

    switch (type) {
    case 'clickWhenClickable':

        elementValue = element.parentElementArrayFinder.locator_.value;
        log = `log : it was not possible use click when clickable at the element : ` + elementValue;

        let IsClickable = EC.elementToBeClickable(element);

        browser.wait(IsClickable, timeout, "Failed to click the button").then(function () {

            scrollToElement(element)
            highlightElement(element);

            browser.controlFlow().execute(function() {
                browser.executeScript("arguments[0].click()", element);
            });
        }).catch((error) => {
            
            console.log('error do click = ', error);
        });
        // protractorHelper.clickWhenClickable(element, timeout);
        break;

    case 'click':
        elementValue = element.parentElementArrayFinder.locator_.value;
        log = `log : it was not possible use click when clickable at the element : ` + elementValue;
        protractorHelper.click(element, timeout);
        break;

    case 'fillFieldWithText':

        scrollToElement(element)
        highlightElement(element);
        protractorHelper.fillFieldWithText(element, text);
        break;
    case 'fillFieldWithTextWhenVisible':
        elementValue = element.parentElementArrayFinder.locator_.value;
        log = `log : it was not possible fill field with text at the element : ` + elementValue;
            
        protractorHelper.fillFieldWithText(element, text, timeout);
        scrollToElement(element)
        highlightElement(element);
        break;
            
    case 'waitForElementVisibility':

        elementValue = element.parentElementArrayFinder.locator_.value;
        log = `log : it was not possible use wait for element visibility at the element : ` + elementValue;
        protractorHelper.waitForElementVisibility(element, timeout);
        break;
    case 'waitForElementNotToBePresent':

        elementValue = element.parentElementArrayFinder.locator_.value;
        log = `log : it was not possible use wait for element not to be present at the element : ` + elementValue;
        protractorHelper.waitForElementNotToBePresent(element, timeout);
        break;
    case 'waitForElementPresence':

        elementValue = element.parentElementArrayFinder.locator_.value;
        log = `log : it was not possible use wait for element presence at the element : ` + elementValue;
        protractorHelper.waitForElementPresence(element, timeout);
        break;
    case 'waitForTextToBePresentInElement':
        text = request.message || 'teste';
        log = `log : it was not possible use wait for text to be present in element at the element : ` + text;
        protractorHelper.waitForTextToBePresentInElement(element, text, timeout);
        break;
    case 'fillFieldWithTextAndPressEnter':

        log = `log : it was not possible use wait for text to be present in element at the element : ` + elementValue;
        protractorHelper.fillFieldWithTextAndPressEnter(element, text, timeout);
        break;

    case 'clear':

        element.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"), protractor.Key.BACK_SPACE);
        break;
    case 'mouseOver':
        scrollToElement(element)
        highlightElement(element);
        browser.actions().mouseMove(element).perform();
        break;
    case 'sendKeysSubmit':
        scrollToElement(element)
        highlightElement(element);
        element.sendKeys(text).submit();
        break;
    }
}

module.exports = helpers;
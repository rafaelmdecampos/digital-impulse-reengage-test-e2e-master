const EC = () => { return protractor.ExpectedConditions };

const notEC = (request) => {

    /*
    *   Negates the result of a promise.
    */

    const message = `notEC(); -> it was not possible to do the negative validation of the element ${request.element} in the expected time ${request.timeout}.`;

    const titleIsNot = EC.not(EC.titleIs(request.element));

    return browser.wait(titleIsNot, request.timeout, message);
};

const alertIsPresentEC = (request) => {

    /*
    *   Expect an alert to be present.
    */

    const message = `alertIsPresentEC(); -> it was not possible to do the negative validation alert to be present in the expected time ${request.timeout}.`;

    return browser.wait(EC.alertIsPresent(), request.timeout, message);
};

const elementToBeClickableEC = (request) => {

    /*
    *   An Expectation for checking an element is visible and enabled such that you can click it.
    */

    const message = `elementToBeClickableEC(); -> An Expectation for checking an element is visible and enabled such that you can click it ${request.element} in the expected time ${request.timeout}.`;

    return browser.wait(EC.elementToBeClickable(request.element), request.timeout, message);
};

const textToBePresentInElementEC = (request) => {

    /*
    *   An expectation for checking if the given text is present in the element. Returns false if the elementFinder does not find an element.
    */

    const message = `textToBePresentInElementEC(); -> An expectation for checking if the given text is present in the element. Returns false if the elementFinder does not find an element ${request.element} in the expected time ${request.timeout}.`;

    return browser.wait(EC.textToBePresentInElement(request.element, request.text), request.timeout, message);
};

const textToBePresentInElementValueEC = (request) => {

    /*
    *   An expectation for checking if the given text is present in the element’s value. Returns false if the elementFinder does not find an element.
    */

    const message = `textToBePresentInElementValueEC(); -> An expectation for checking if the given text is present in the element’s value. Returns false if the elementFinder does not find an element ${request.element} in the expected time ${request.timeout}.`;

    return browser.wait(EC.textToBePresentInElementValue(request.element, request.text), request.timeout, message);
};

const titleContainsEC = (request) => {

    /*
    *   An expectation for checking that the title contains a case-sensitive substring.
    */

    const message = `titleContainsEC(); -> An expectation for checking that the title contains a case-sensitive substring ${request.text} in the expected time ${request.timeout}.`;

    return browser.wait(EC.titleContains(request.text), request.timeout, message);
};

const titleIsEC = (request) => {

    /*
    *   An expectation for checking the title of a page.
    */

    const message = `titleIsEC(); -> An expectation for checking the title of a page ${request.text} in the expected time ${request.timeout}.`;

    return browser.wait(EC.titleIs(request.text), request.timeout, message);
};

const urlContainsEC = (request) => {

    /*
    *   An expectation for checking that the URL contains a case-sensitive substring.
    */

    const message = `urlContainsEC(); -> An expectation for checking that the URL contains a case-sensitive substring ${request.element} in the expected time ${request.timeout}.`;

    return browser.wait(EC.urlContains(request.text), request.timeout, message);
};

const urlIsEC = (request) => {

    /*
    *   An expectation for checking the URL of a page.
    */

    const message = `urlIsEC(); -> An expectation for checking the URL of a page ${request.element} in the expected time ${request.timeout}.`;

    return browser.wait(EC.urlIs(request.text), request.timeout, message);
};

const presenceOfEC = (request) => {

    /*
    *   An expectation for checking that an element is present on the DOM of a page. 
    *   This does not necessarily mean that the element is visible. This is the opposite of 'stalenessOf'.
    */

    const message = `presenceOfEC(); -> An expectation for checking that an element is present on the DOM of a page. ${request.element} in the expected time ${request.timeout}.`;

    return browser.wait(EC.presenceOf(request.element), request.timeout, message);
};

const stalenessOfEC = (request) => {

    /*
    *   An expectation for checking that an element is not attached to the DOM of a page. This is the opposite of 'presenceOf'.
    */

    const message = `stalenessOfEC(); -> An expectation for checking that an element is not attached to the DOM of a page. This is the opposite of 'presenceOf' ${request.element} in the expected time ${request.timeout}.`;

    return browser.wait(EC.stalenessOf(request.element), request.timeout, message);
};

const visibilityOfEC = (request) => {

    /*
    *   An expectation for checking that an element is either invisible or not present on the DOM. This is the opposite of 'visibilityOf'.
    */

    const message = `visibilityOfEC(); -> An expectation for checking that an element is either invisible or not present on the DOM. This is the opposite of 'visibilityOf'. ${request.element} in the expected time ${request.timeout}.`;

    return browser.wait(EC.visibilityOf(request.element), request.timeout, message);
};

const invisibilityOfEC = (request) => {

    /*
    *   An expectation for checking the selection is selected.
    */

    const message = `invisibilityOfEC(); -> An expectation for checking the selection is selected ${request.element} in the expected time ${request.timeout}.`;

    return browser.wait(EC.invisibilityOf(request.element), request.timeout, message);
};

const elementToBeSelectedEC = (request) => {

    /*
    *   An expectation for checking that an element is present on the DOM of a page and visible. 
    *   Visibility means that the element is not only displayed but also has a height and width that is greater than 0. This is the opposite of 'invisibilityOf'.
    */

    const message = `elementToBeSelectedEC(); -> An expectation for checking that an element is present on the DOM of a page and visible.  ${request.element} in the expected time ${request.timeout}.`;

    return browser.wait(EC.elementToBeSelected(request.element), request.timeout, message);
};

const expectedConditionsFunctionTypes = {
    not: notEC,
    alertIsPresent: alertIsPresentEC,
    elementToBeClickable: elementToBeClickableEC,
    textToBePresentInElement: textToBePresentInElementEC,
    textToBePresentInElementValue: textToBePresentInElementValueEC,
    titleContains: titleContainsEC,
    titleIs: titleIsEC,
    urlContains: urlContainsEC,
    urlIs: urlIsEC,
    presenceOf: presenceOfEC,
    stalenessOf: stalenessOfEC,
    visibilityOf: visibilityOfEC,
    invisibilityOf: invisibilityOfEC,
    elementToBeSelected: elementToBeSelectedEC,
}

const expectedConditions = (request) => {

    const getEC = expectedConditionsFunctionTypes[request.type];
    const restEC = getEC(request);

    return restEC;
}

/*
expectedConditions({

})
*/

module.exports = expectedConditions;
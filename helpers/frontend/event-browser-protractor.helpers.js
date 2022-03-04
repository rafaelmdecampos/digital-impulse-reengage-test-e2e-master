const expectedConditions = require('./expected-conditions-protractor.helpers');
const browserScripts = require('./browser-scripts.helpers');

const getEvent = (request) => {

    /*
    *   Navigate to the given destination and loads mock modules before Angular. 
    *   Assumes that the page being loaded uses Angular. 
    *   If you need to access a page which does not have Angular on load, use the wrapped webdriver directly.
    * 
    *   - view <button ng-click="doAddition()">Go!</button>
    */

    browser.get(request.url);
    browserScripts({ type: 'waitPageLoad' });

    return
};

const clickEvent = (request) => {

    /*
    *   Schedules a command to click on this element.
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });
    expectedConditions({ type: 'elementToBeClickable', element, timeout });

    return request.element.click();
};

const sendKeysEvent = (request) => {

    /*
    *   Schedules a command to type a sequence on the DOM element represented by this instance.
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });

    return request.element.sendKeys(request.text);
};

const getTagNameEvent = (request) => {

    /*
    *   Gets the tag/node name of this element.
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });

    return request.element.getTagName();
};

const getCssValueEvent = (request) => {

    /*
    *   Gets the computed style of an element. 
    *   If the element inherits the named style from its parent, the parent will be queried for its value. 
    *   Where possible, color values will be converted to their hex representation (e.g.#00ff00 instead of rgb(0, 255, 0)).
    * 
    *   Warning: the value returned will be as the browser interprets it, so it may be tricky to form a proper assertion.
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });

    return request.element.getCssValue();
};

const getAttributeEvent = (request) => {

    /*
    *   Schedules a command to query for the value of the given attribute of the element. 
    *   Will return the current value, even if it has been modified after the page has been loaded. 
    *   More exactly, this method will return the value of the given attribute, unless that attribute is not present, in which case the value of the property with the same name is returned. 
    *   If neither value is set, null is returned (for example, the "value" property of a textarea element). 
    *   The "style" attribute is converted as best can be to a text representation with a trailing semi-colon. 
    *   The following are deemed to be "boolean" attributes and will return either "true" or null:
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });

    return request.element.getAttribute();
};

const getTextEvent = (request) => {

    /*
    *   Get the visible innerText of this element, including sub-elements, without any leading or trailing whitespace. Visible elements are not hidden by CSS.
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });

    return request.element.getText();
};

const getSizeEvent = (request) => {

    /*
    *   Schedules a command to compute the size of this element's bounding box, in pixels.
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });

    return request.element.getSize();
};

const getLocationEvent = (request) => {

    /*
    *   Schedules a command to compute the location of this element in page space.
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });

    return request.element.getLocation();
};

const isEnabledEvent = (request) => {

    /*
    *   Schedules a command to query whether the DOM element represented by this instance is enabled, as dicted by the disabled attribute.
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });

    return request.element.isEnabled();
};

const isSelectedEvent = (request) => {

    /*
    *   Schedules a command to query whether this element is selected.
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });

    return request.element.isSelected();
};

const submitEvent = (request) => {

    /*
    *   Schedules a command to submit the form containing this element (or this element if it is a FORM element). 
    *   This command is a no-op if the element is not contained in a form.    
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });

    return request.element.submit();
};

const clearEvent = (request) => {

    /*
    *   Schedules a command to clear the value of this element. 
    *   This command has no effect if the underlying DOM element is neither a text INPUT element nor a TEXTAREA element.
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });

    return request.element.clear();
};

// const isDisplayedEvent = (request) => { };

const getCurrentUrlEvent = (request) => {

    /*
    *   Schedules a command to retrieve the URL of the current page.
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });

    browser.getCurrentUrl(request.url);
};

const getTitleEvent = (request) => {

    /*
    *   Schedules a command to retrieve the current page's title.
    */

    const element = request.element;
    const timeout = 5000;

    expectedConditions({ type: 'presenceOf', element, timeout });
    expectedConditions({ type: 'visibilityOf', element, timeout });

    browser.getTitle(request.text);
};

const eventBrowserFunctionTypes = {
    get: getEvent,
    click: clickEvent,
    sendKeys: sendKeysEvent,
    getTagName: getTagNameEvent,
    getCssValue: getCssValueEvent,
    getAttribute: getAttributeEvent,
    getText: getTextEvent,
    getSize: getSizeEvent,
    getLocation: getLocationEvent,
    isEnabled: isEnabledEvent,
    isSelected: isSelectedEvent,
    submit: submitEvent,
    clear: clearEvent,
    getCurrentUrl: getCurrentUrlEvent,
    getTitle: getTitleEvent
}

const eventBrowser = (request) => {

    const getEvent = eventBrowserFunctionTypes[request.type];
    const resEvent = getEvent(request);

    return resEvent;
}

/*
eventBrowser({

});
*/

module.exports = eventBrowser;
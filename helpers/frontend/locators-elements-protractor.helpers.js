const addLocatorLocator = (request) => {

    /*
    *   Add a locator to this instance of ProtractorBy. This locator can then be used with element(by.locatorName(args)).
    *   - view <button ng-click="doAddition()">Go!</button>
    */

    return element(by.buttonTextSimple(request.element));
};

const bindingLocator = (request) => {

    /*
    *   Find an element by exact binding.
    *
    *   Note: For AngularJS version 1.2, the interpolation brackets, (usually {{}}), are optionally allowed in the binding description string. 
    *   For Angular version 1.3+, they are not allowed, and no elements will be found if they are used.
    *
    *   - view  <span>{{person.name}}</span>
    *           <span ng-bind="person.email"></span>
    */

    return element(by.binding(request.element));
};

const exactBindingLocator = (request) => {

    /*
    *   Find an element by exact binding.
    *
    *   - view  <span>{{ person.name }}</span>
    *           <span ng-bind="person-email"></span>
    *           <span>{{person_phone|uppercase}}</span>
    */

    return element(by.exactBinding(request.element));
};

const modelLocator = (request) => {

    /*
    *   Find an element by ng-model expression.
    *
    *   - view  <input type="text" ng-model="person.name">
    */

    return element(by.model(request.element));
};

const buttonTextLocator = (request) => {

    /*
    *   Find a button by text.
    *
    *   - view  <button>Save</button>
    */

    return element(by.buttonText(request.element));
};

const partialButtonTextLocator = (request) => {

    /*
    *   Find a button by partial text.
    *
    *   - view  <button>Save my file</button>
    */

    return element(by.partialButtonText(request.element));
};

const repeaterLocator = (request) => {

    /*
    *   Find elements inside an ng-repeat.
    *
    *   - view  <div ng-repeat="cat in pets">
    *               <span>{{cat.name}}</span>
    *               <span>{{cat.age}}</span>
    *           </div>
    *           <div class="book-img" ng-repeat-start="book in library">
    *               <span>{{$index}}</span>
    *           </div>
    *           <div class="book-info" ng-repeat-end>
    *               <h4>{{book.name}}</h4>
    *               <p>{{book.blurb}}</p>
    *           </div>
    */

    return element.all(by.repeater(request.element));
};

const exactRepeaterLocator = (request) => {

    /*
    *   Find an element by exact repeater.
    *
    *   - view  <li ng-repeat="person in peopleWithRedHair"></li>
    *           <li ng-repeat="car in cars | orderBy:year"></li>
    */

    return element.all(by.exactRepeater(request.element));
};

const cssContainingTextLocator = (request) => {

    /*
    *   Find elements by CSS which contain a certain string.
    *
    *   - view  <ul>
    *               <li class="pet">Dog</li>
    *               <li class="pet">Cat</li>
    *           </ul>
    */

    return element.all(by.cssContainingText(request.element, request.text));
};

const optionsLocator = (request) => {

    /*
    *   Find an element by ng-options expression.
    *
    *   - view  <select ng-model="color" ng-options="c for c in colors">
    *               <option value="0" selected="selected">red</option>
    *               <option value="1">green</option>
    *           </select>
    */

    return element.all(by.options(request.element));
};

const deepCssLocator = (request) => {

    /*
    *   Find an element by css selector within the Shadow DOM.
    *
    *   - view  <div>
    *               <span id="outerspan">
    *               <"shadow tree">
    *                   <span id="span1"></span>
    *                   <"shadow tree">
    *                       <span id="span2"></span>
    *                   </>
    *               </>
    *           </div>
    */

    return element.all(by.deepCss(request.element));
};

const classNameLocator = (request) => {

    /*
    *   Locates elements that have a specific class name. The returned locator is equivalent to searching for elements with the CSS selector ".clazz".
    *
    *   - view  <ul class="pet">
    *               <li class="dog">Dog</li>
    *               <li class="cat">Cat</li>
    *           </ul>
    */

    return element(by.className(request.element));
};

const cssLocator = (request) => {

    /*
    *   Locates elements using a CSS selector. For browsers that do not support CSS selectors, WebDriver implementations may return an invalid selector error. An implementation may, however, emulate the CSS selector API.
    *
    *   - view  <ul class="pet">
    *               <li class="dog">Dog</li>
    *               <li class="cat">Cat</li>
    *           </ul>
    */

    return element(by.css(request.element));
};

const idLocator = (request) => {

    /*
    *   Locates an element by its ID.
    *
    *   - view  <ul id="pet_id">
    *               <li id="dog_id">Dog</li>
    *               <li id="cat_id">Cat</li>
    *           </ul>
    */

    return element(by.id(request.element));
};

const linkTextLocator = (request) => {

    /*
    *   Locates link elements whose visible text matches the given string.
    *
    *   - view  <a href="http://www.google.com">Google</a>
    */

    return element(by.linkText(request.element));
};

const jsLocator = (request) => {

    /*
    *   Locates an elements by evaluating a JavaScript expression, which may be either a function or a string. Like webdriver.WebDriver.executeScript, the expression is evaluated in the context of the page and cannot access variables from the test file.
    *
    *   The result of this expression must be an element or list of elements.
    *
    *   - view  <span class="small">One</span>
    *           <span class="medium">Two</span>
    *           <span class="large">Three</span>
    */

    return element(by.js(function () {

        const element = document.querySelectorAll(request.element);

        for (var i = 0; i < element.length; ++i) {
            if (element[i].offsetWidth > 100) {
                return element[i];
            }
        }
    }));
};

const nameLocator = (request) => {

    /*
    *   Locates elements whose name attribute has the given value.
    *
    *   - view  <ul>
    *               <li name="dog_name">Dog</li>
    *               <li name="cat_name">Cat</li>
    *           </ul>
    */

    return element(by.name(request.element));
};

const partialLinkTextLocator = (request) => {

    /*
    *   Locates link elements whose visible text contains the given substring.
    *
    *   - view  <ul>
    *               <li><a href="https://en.wikipedia.org/wiki/Doge_(meme)">Doge meme</a></li>
    *               <li>Cat</li>
    *           </ul>
    */

    return element(by.partialLinkText(request.element));
};

const tagNameLocator = (request) => {

    /*
    *   Locates elements with a given tag name. The returned locator is equivalent to using the getElementsByTagName DOM function.
    *
    *   - view  <a href="http://www.google.com">Google</a>
    */

    return element(by.tagName(request.element));
};

const xpathLocator = (request) => {

    /*
    *   Locates elements matching a XPath selector. Care should be taken when using an XPath selector with a webdriver.WebElement as WebDriver will respect the context in the specified in the selector. For example, given the selector &quot;//div&quot;, WebDriver will search from the document root regardless of whether the locator was used with a WebElement.
    *
    *   - view  <ul>
    *               <li><a href="https://en.wikipedia.org/wiki/Doge_(meme)">Doge meme</a></li>
    *               <li>Cat</li>
    *           </ul>
    */

    return element(by.xpath(request.element));
};

const locatorsFunctionTypes = {
    addLocator: addLocatorLocator,
    binding: bindingLocator,
    exactBinding: exactBindingLocator,
    model: modelLocator,
    buttonText: buttonTextLocator,
    partialButtonText: partialButtonTextLocator,
    repeater: repeaterLocator,
    exactRepeater: exactRepeaterLocator,
    cssContainingText: cssContainingTextLocator,
    options: optionsLocator,
    deepCss: deepCssLocator,
    className: classNameLocator,
    css: cssLocator,
    id: idLocator,
    linkText: linkTextLocator,
    js: jsLocator,
    name: nameLocator,
    partialLinkText: partialLinkTextLocator,
    tagName: tagNameLocator,
    xpath: xpathLocator
}

const locatorsElements = (request) => {

    const getLocators = locatorsFunctionTypes[request.by];
    const resLocators = getLocators(request);

    return resLocators;
}

/*
locatorsElements({
    by: 'id',
    element: 'name',
    text: 'Name'
});
*/

module.exports = locatorsElements;
const elements = require("../../elements/instore");
const helpers = require("../../helpers/frontend/helpers-protractor");
const browserScripts = require('../../helpers').browserScripts;

const imgUser = $(elements["home"].iconeUser);

const EC = protractor.ExpectedConditions;

let loggedIn;

const accountsPage = function () {

    this.login = function (user, pass) {

        if (loggedIn) { return }
        else {
            const elementUser = element(by.id("user_enrollment"));
            const elementPass = element(by.id("user_password"));
            const elementBtn = element(by.css("[class='btn btn-primary btn-success btn-block']"));

            helpers({ type: 'waitForElementVisibility', element: elementBtn, timeout: 20000 });

            helpers({ type: 'fillFieldWithText', element: elementUser, text: user, timeout: 20000 });
            helpers({ type: 'fillFieldWithText', element: elementPass, text: pass, timeout: 20000 });
            helpers({ type: 'clickWhenClickable', element: elementBtn, timeout: 20000 });

            browserScripts({ type: 'waitPageLoad' });   
        }
    };
    this.selectLcation = function (location) {

        browserScripts({ type: 'waitPageLoad' });

        browser.wait(EC.textToBePresentInElement(element(by.css("[class='panel-body location']")), 'Escolha a filial'), 30000);
        browser.wait(EC.visibilityOf(element(by.id('locationSearch'))), 30000, 'locationSearch');

        element(by.id('locationSearch')).sendKeys(location);
        helpers({ type: 'clickWhenClickable', element: $("a[ng-click='main.setCurrentLocation(location.id)']"), timeout: 30000 });
        helpers({ type: 'waitForElementVisibility', element: imgUser, timeout: 60000 });

        loggedIn = true;
    };
    this.logout = function () {

        const logOut = $(elements["home"].linkSair);
        const userInstoreField = $(elements["loginScreen"].userField);

        helpers({ type: 'clickWhenClickable', element: imgUser, timeout: 20000 });
        helpers({ type: 'clickWhenClickable', element: logOut, timeout: 20000 });
        helpers({ type: 'waitForElementVisibility', element: userInstoreField, timeout: 20000 });

        loggedIn = false;
    };
};

module.exports = accountsPage;
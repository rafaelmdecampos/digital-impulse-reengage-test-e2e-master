const eventBrowser = require('../../helpers').eventBrowser;
const elements = require("../../elements/cockpit");
const helpers = require("../../helpers/frontend/helpers-protractor");

const elementHeaderMenu = $('.dropdown-toggle');
const loading = $(elements["genericsElements"].loading);
const elementLoginButton = $(elements["accounts"].loginButton);

let loggedIn;

const accountsPage = function () {

    this.login = function (email, pass, loginInvalid) {

        if (loggedIn) { return }
        else {
            const elementUserEmail = $(elements["accounts"].userEmail);
            const elementUserPass = $(elements["accounts"].userPass);

            helpers({ type: 'waitForElementVisibility', element: elementLoginButton, timeout: 20000 });

            helpers({ type: 'fillFieldWithText', element: elementUserEmail, text: email, timeout: 20000 });
            helpers({ type: 'fillFieldWithText', element: elementUserPass, text: pass, timeout: 20000 });
            helpers({ type: 'clickWhenClickable', element: elementLoginButton, timeout: 20000 });

            if (loginInvalid) {

                helpers({ type: 'waitForElementVisibility', element: $(elements["users_cockpit"].messageDisable), timeout: 20000 });
                eventBrowser({ type: 'get', url: global.frontend.baseUrl });
                loggedIn = false;
            }
            else {

                eventBrowser({ type: 'get', url: global.frontend.baseUrl });
                helpers({ type: 'waitForElementVisibility', element: elementHeaderMenu, timeout: 20000 });
                loggedIn = true;
            }
        }
    };
    this.selectClient = async function (clientId) {

        browser.sleep(5000)

        //helpers({ type: 'waitForElementVisibility', element: elementHeaderMenu, timeout: 20000 });

        const clientSelect = await $('.dropdownlist-toggle').getText();

        if (clientSelect.toLowerCase() == clientId) { return }
        else {

            switch (clientId) {
            case 'qa':

                newClientId = clientId.toUpperCase();
                break;

            default:

                newClientId = clientId.toLowerCase().replace(/(?:^|\s)\S/g, (a) => {
                    return a.toUpperCase();
                });
                break;
            }

            const elementComboClients = $$('.fa.fa-angle-down.pull-right').first();
            const elementClientTypeField = $(elements["accounts"].clientTypeField);

            helpers({ type: 'waitForElementVisibility', element: elementComboClients, timeout: 20000 });
            helpers({ type: 'clickWhenClickable', element: elementComboClients, timeout: 20000 });

            helpers({ type: 'fillFieldWithTextWhenVisible', element: elementClientTypeField, text: newClientId, timeout: 20000 });

            const textClick = element.all(by.xpath("//*[text() = '" + newClientId + "']")).first();

            helpers({ type: 'clickWhenClickable', element: textClick, timeout: 20000 });

            helpers({ type: 'waitForElementVisibility', element: elementHeaderMenu, timeout: 20000 });
            helpers({ type: 'waitForElementNotToBePresent', element: loading, timeout: 20000 });
            //expect(browser.getTitle()).toContain("Omni OMS");
        }
    };
    this.logout = function () {

        eventBrowser({ type: 'get', url: "/logout" });
        helpers({ type: 'waitForElementVisibility', element: elementLoginButton, timeout: 20000 });

        loggedIn = false;
    };
};

module.exports = accountsPage;
//const elements = require("../../elements/instore");
const helpers = require("../../helpers/frontend/helpers-protractor");
const browserScripts = require('../../helpers').browserScripts;

//const imgUser = $(elements["home"].iconeUser);

const EC = protractor.ExpectedConditions;

let loggedIn;
let adminSelected;
let clientSelected;

const accountsPage = function () {

    this.login = function (user, pass) {

        if (loggedIn) { return }
        else {
            
            const elementEmail = element(by.id('email'));
            const elementPassword = element(by.id('password'));
            const elementAddSaveButton = element(by.id('login-button'));
            const btn = $('.btn.btn-primary');

            helpers({ type: 'waitForElementVisibility', element: elementAddSaveButton, timeout: 20000 });
            helpers({ type: 'fillFieldWithText', element: elementEmail, text: 'emerson.ramalho@linx3.com' });
            helpers({ type: 'fillFieldWithText', element: elementPassword, text: 'BmKe7KYEg5L96T8c' });
            helpers({ type: 'clickWhenClickable', element: elementAddSaveButton, timeout: 20000 });

            browserScripts({ type: 'waitPageLoad' });
            helpers({ type: 'waitForElementVisibility', element: btn, timeout: 20000 });

            loggedIn = true;
        }
    };
    this.selectAdmin = function () {

        if (adminSelected) { return }
        else {

            const btnAdmin = $('.btn.btn-default');
            const icon = $('.icon-arrow-left-circle.ti-menu');

            browserScripts({ type: 'waitPageLoad' });

            helpers({ type: 'clickWhenClickable', element: btnAdmin, timeout: 20000 });
            helpers({ type: 'waitForElementVisibility', element: icon, timeout: 20000 });

            browserScripts({ type: 'waitPageLoad' });

            adminSelected = true;
        }
    };
    this.selectClient = function (clientId) {

        if (clientSelected) { return }
        else {

            const protractorHelper = require("protractor-helper");

            browserScripts({ type: 'waitPageLoad' });

            //browser.wait(EC.textToBePresentInElement(element(by.css("[class='panel-body location']")), 'Escolha a filial'), 30000);
            //browser.wait(EC.visibilityOf(element(by.id('locationSearch'))), 30000, 'locationSearch');
            //element(by.id('locationSearch')).sendKeys(location);
            //helpers({ type: 'clickWhenClickable', element: $("a[ng-click='main.setCurrentLocation(location.id)']"), timeout: 30000 });
            //helpers({ type: 'waitForElementVisibility', element: imgUser, timeout: 60000 });


            const select = $("#select2-chosen-2");
            const search = element(by.id('s2id_autogen2_search'));


            //helpers({ type: 'clickWhenClickable', element: select0, timeout: 20000 });
            //helpers({ type: 'waitForElementVisibility', element: select1, timeout: 20000 });
            //browser.sleep(3000)

            //browser.executeScript("arguments[0].click();", select1.getWebElement());
            //helpers({ type: 'clickWhenClickable', element: select1, timeout: 20000 });

            helpers({ type: 'waitForElementVisibility', element: select, timeout: 20000 });
            select.click();
            //helpers({ type: 'clickWhenClickable', element: select, timeout: 20000 });

            helpers({ type: 'waitForElementVisibility', element: search, timeout: 20000 });
            helpers({ type: 'fillFieldWithText', element: search, text: clientId });

            let objClick = element.all(by.xpath(`//*[text() = '${clientId}']`)).first();
            //objClick.submit();
            protractorHelper.click(objClick, 20000, `Não foi localizado nenhum elemento através do textox`);

            const acessar = $('.btn.btn-primary.btn-lg.btn-block.text-uppercase.waves-effect.waves-light');

            helpers({ type: 'clickWhenClickable', element: acessar, timeout: 20000 });

            const header = $('.navbar-header');

            helpers({ type: 'waitForElementVisibility', element: header, timeout: 20000 });


            clientSelected = true;
        }
    };
    this.logout = function () {
        /*
        const logOut = $(elements["home"].linkSair);
        const userInstoreField = $(elements["loginScreen"].userField);

        helpers({ type: 'clickWhenClickable', element: imgUser, timeout: 20000 });
        helpers({ type: 'clickWhenClickable', element: logOut, timeout: 20000 });
        helpers({ type: 'waitForElementVisibility', element: userInstoreField, timeout: 20000 });
        */
        loggedIn = false;
    };
};

module.exports = accountsPage;
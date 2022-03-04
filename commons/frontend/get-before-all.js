const cockpit = (baseUrl, app, clientId, user, pass, location) => {

    const getbaseUrl = require('../../config').baseUrl;

    const accountsPageCockpit = require('../../pages/cockpit/accounts.page');
    const loginAccountsPageCockpit = new accountsPageCockpit();

    const email = getbaseUrl['mail-nc'].loginData.user;
    pass = getbaseUrl['mail-nc'].loginData.pass;

    loginAccountsPageCockpit.login(email, pass);
    //loginAccountsPageCockpit.selectClient(clientId);
}

const shopback = async (baseUrl, app, clientId, user, pass, location) => {
    const accountsPageInstore = require('../../pages/shopback/accounts.page');
    const loginAccountsPageInstore = new accountsPageInstore();

    loginAccountsPageInstore.login(user, pass);

    if (clientId == 'admin') {

        loginAccountsPageInstore.selectAdmin();
    }
    else {

        loginAccountsPageInstore.selectClient(clientId);
    }
}

exports.beforeAll = function (baseUrl, app, clientId, user, pass, location) {

    const browserScripts = require('../../helpers').browserScripts;
    const eventBrowser = require('../../helpers').eventBrowser;

    browserScripts({ type: 'browserStart' });
    eventBrowser({ type: 'get', url: baseUrl });

    const beforeAllFunctionTypes = { cockpit, shopback };
    
    const getAppBeforeAll = beforeAllFunctionTypes[app];
    const resAppBeforeAll = getAppBeforeAll(baseUrl, app, clientId, user, pass, location);

    return resAppBeforeAll;
}

/*
    await getBeforeAll(baseUrl, app, clientId);
*/
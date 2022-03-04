const commons = require('../../../../commons');
const helpers = require("../../../../helpers/frontend/helpers-protractor");
const baseUrl = global.frontend.baseUrl;

describe("Validar cenários de fumaça de Admin - Users ", () => {

    const header = $('.navbar-header');

    beforeAll(async () => {

        const getBeforeAll = commons.frontend.beforeAll;
        await getBeforeAll(baseUrl, app = 'shopback', clientId = 'admin', user = 'emerson.ramalho@linx3.com', pass = 'BmKe7KYEg5L96T8c', location = '');

    });

    describe('Validar listagem em Users', () => {

        it('Cenário: Validar Colunas', () => {

            browser.get(baseUrl + 'users');
            helpers({ type: 'waitForElementVisibility', element: header, timeout: 20000 });
        });

        it('Cenário: Validar ToolTip', () => {

            browser.get(baseUrl + 'users');
            helpers({ type: 'waitForElementVisibility', element: header, timeout: 20000 });
        });

        it('Cenário: Validar Elementos da Tela', () => {

            browser.get(baseUrl + 'billings/all');
            helpers({ type: 'waitForElementVisibility', element: header, timeout: 20000 });
        });
    });
});
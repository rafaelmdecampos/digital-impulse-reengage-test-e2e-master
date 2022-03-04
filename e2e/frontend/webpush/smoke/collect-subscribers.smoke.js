const commons = require('../../../../commons');
const helpers = require("../../../../helpers/frontend/helpers-protractor");
const baseUrl = global.frontend.baseUrl;

describe("Validar cenários de fumaça de Collect Subscribers para o cliente : DCG", () => {

    beforeAll(async () => {

        const getBeforeAll = commons.frontend.beforeAll;
        await getBeforeAll(baseUrl, app = 'shopback', clientId = 'DCG', user = 'emerson.ramalho@linx3.com', pass = 'BmKe7KYEg5L96T8c', location = '');
    });

    const header = $('.waves-effect');

    describe('Validar listagem em Collect Subscribers', () => {

        it('Cenário: Validar Colunas', () => {

            browser.get(baseUrl + 'collect/subscribers');
            helpers({ type: 'waitForElementVisibility', element: header, timeout: 20000 });
        });

        it('Cenário: Validar ToolTip', () => {

            browser.get(baseUrl + 'collect/subscribers');
            helpers({ type: 'waitForElementVisibility', element: header, timeout: 20000 });
        });

        it('Cenário: Validar Elementos da Tela', () => {

            browser.get(baseUrl + 'collect/subscribers');
            helpers({ type: 'waitForElementVisibility', element: header, timeout: 20000 });
        });
    });
});
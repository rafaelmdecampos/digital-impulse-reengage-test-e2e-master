const commons = require('../../../../commons');
const helpers = require("../../../../helpers/frontend/helpers-protractor");
const baseUrl = global.frontend.baseUrl;

describe("Validar cenários de aceitação de Carrinhos para o cliente : DCG", () => {

    beforeAll(async () => {

        const getBeforeAll = commons.frontend.beforeAll;
        await getBeforeAll(baseUrl, app = 'shopback', clientId = 'DCG', user = 'emerson.ramalho@linx3.com', pass = 'BmKe7KYEg5L96T8c', location = '');
    });

    const header = $('.dropdown-toggle.profile-pic');

    describe('Validar listagem em Carrinhos', () => {

        it('Cenário: Validar Colunas', () => {

            browser.get(baseUrl + 'carrinhos');
            helpers({ type: 'waitForElementVisibility', element: header, timeout: 20000 });
        });

        it('Cenário: Validar ToolTip', () => {

            browser.get(baseUrl + 'carrinhos');
            helpers({ type: 'waitForElementVisibility', element: header, timeout: 20000 });
        });

        it('Cenário: Validar Elementos da Tela', () => {

            browser.get(baseUrl + 'carrinhos');
            helpers({ type: 'waitForElementVisibility', element: header, timeout: 20000 });
        });
    });
});
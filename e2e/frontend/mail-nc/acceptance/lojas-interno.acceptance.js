const commons = require('../../../../commons');
const helpers = require("../../../../helpers/frontend/helpers-protractor");
const baseUrl = global.frontend.baseUrl;

describe("Validar cenários de aceitação de Mail NC - Lojas (Interno)", () => {

    const header = $('.dropdown-toggle');

    beforeAll(async () => {

        const getBeforeAll = commons.frontend.beforeAll;
        await getBeforeAll(baseUrl, app = 'cockpit');
    });

    describe('Validar listagem em Lojas (Interno)', () => {

        it('Cenário: Validar Colunas', () => {

            browser.get(baseUrl + 'chaordic/stores');
            helpers({ type: 'waitForElementVisibility', element: header, timeout: 20000 });
        });

        it('Cenário: Validar ToolTip', () => {

            browser.get(baseUrl + 'chaordic/stores');
            helpers({ type: 'waitForElementVisibility', element: header, timeout: 20000 });
        });

        it('Cenário: Validar Elementos da Tela', () => {

            browser.get(baseUrl + 'chaordic/stores');
            helpers({ type: 'waitForElementVisibility', element: header, timeout: 20000 });
        });
    });
});
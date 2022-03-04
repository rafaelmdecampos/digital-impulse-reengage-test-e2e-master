const helpers = require("../../helpers/frontend/helpers-protractor");
const browserScripts = require('../../helpers').browserScripts;
const elements = require("../../elements/instore");
 
const validationLabelStatus = (status) => {

    let labelStatus = $$(elements["paginaPedido"].labelStatus).first();

    helpers({ type: 'waitForElementVisibility', element: labelStatus, timeout: 40000 });

    if (Array.isArray(status)) {
        labelStatus = $$(elements["paginaPedido"].labelStatus);
    }

    labelStatus.getText().then(function (text) {
        expect(text).toEqual(status);
    });
};

const validationStatusHistory = (statusHistoryList) => {

    let statusHistoryTable = $$(elements["paginaPedido"].statusHistoryOrder);

    helpers({ type: 'waitForElementVisibility', element: statusHistoryTable.first(), timeout: 20000 });

    statusHistoryTable.getText().then(function (text) {
        expect(statusHistoryTable.count()).toBe(statusHistoryList.length);
        expect(text).toEqual(statusHistoryList);
    });
};

const validationPopup = () => {
    
    browser.sleep(5000);

    browser.getAllWindowHandles().then(function (handles) {
        let tamanho = handles.length;
        if (tamanho > 1) {
            browser.driver.switchTo().window(handles[tamanho - 1]);
            browser.driver.close();
            browser.driver.switchTo().window(handles[0]);
        }
    });

    browser.refresh();
    browserScripts({ type: 'waitPageLoad' });
};

const searchOrder = async (request) => {

    const buscar = $(elements["home"].linkBusca);
    const modalBusca = $(elements["home"].modalBusca);
    const codigoDaEntrega = $(elements["home"].inputModalBusca);
    const buttonBuscar = element(by.xpath(elements["home"].botaoBuscarModalBusca));

    helpers({ type: 'waitForElementPresence', element: buscar, timeout: 40000 });
    helpers({ type: 'waitForElementVisibility', element: buscar, timeout: 20000 });
    helpers({ type: 'clickWhenClickable', element: buscar, timeout: 20000 });
    helpers({ type: 'waitForElementVisibility', element: codigoDaEntrega, timeout: 20000 });

    helpers({ type: 'clear', element: codigoDaEntrega });

    helpers({ type: 'fillFieldWithText', element: codigoDaEntrega, text: request });

    helpers({ type: 'clickWhenClickable', element: buttonBuscar, timeout: 20000 });
    helpers({ type: 'waitForElementNotToBePresent', element: modalBusca, timeout: 20000 });

    await browserScripts({ type: 'waitPageLoad' });
    helpers({ type: 'waitForElementNotToBePresent', element: $('style-loading-layer'), timeout: 20000 });
};

const changeBrandOffice = async (request) => {

    let locationText = $(elements["home"].locationLogada);
    const imgUser = $(elements["home"].iconeUser);
    let office = element(by.linkText(request.brandOffice));
    const newOrderReceived = request.newOrderReceived;

    locationText.getText().then(text => {
        if (text != request.brandOffice) {
            helpers({ type: 'waitForElementVisibility', element: locationText, timeout: 50000 });
            helpers({ type: 'clickWhenClickable', element: locationText });
            helpers({ type: 'waitForElementVisibility', element: office, timeout: 50000 });
            helpers({ type: 'clickWhenClickable', element: office, timeout: 50000 });
            helpers({ type: 'waitForElementVisibility', element: imgUser, timeout: 50000 });
        }
    });

    if (request.locationId) {
        newOrderReceived.fufillmentList.forEach(element => {
            ffElement = newOrderReceived.fufillments[element];
            request.locationId = request.locationId || newOrderReceived.fufillmentList[0].locationId;
            if (ffElement.locationId == request.locationId) {
                newOrderReceived.ffId = ffElement.id;
                newOrderReceived.skuList = ffElement.items;
            }
        });
    }

    if (request.dependentFulfillment) {
        const getOrder = await getOrder({ orderId: newOrderReceived.orderId, clientId: newOrderReceived.headers.clientId, authPass: newOrderReceived.headers.authPass, env: newOrderReceived.headers.env });

        newOrderReceived.fufillments = getOrder.fulfillments;
        newOrderReceived.ffId = newOrderReceived.fufillments[newOrderReceived.ffId].dependentFulfillment.id;
        newOrderReceived.skuList = newOrderReceived.fufillments[newOrderReceived.ffId].items;
    }
};

module.exports = {
    validationLabelStatus,
    validationStatusHistory,
    validationPopup,
    searchOrder,
    changeBrandOffice
}
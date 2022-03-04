const elements = require("../../elements/cockpit");
const genericMethods = require("./generic.methods");
const helpers = require("./helpers-protractor");
const clickByText = genericMethods.clickByText;

const elementIsentoStatusON = element.all(by.xpath("//label[contains(@for,'toggleisCarrierExempt')]//..//span[contains(@class, 'on')]")).first();
const elementIsentoStatusOFF = element.all(by.xpath("//label[contains(@for,'toggleisCarrierExempt')]//..//span[contains(@class, 'off')]")).first();
const toggleManualDispatchManagement = $('[for*="toggleactive"]');

const setValues = (request) => {
    switch (request.page) {
    case 'brands':

        helpers({ type: 'waitForElementVisibility', element: $(elements["brands"].id), timeout: 20000 });

        helpers({ type: 'fillFieldWithText', element: $(elements["brands"].id), text: request.id != null ? request.id : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["brands"].tradingName), text: request.tradingName != null ? request.tradingName : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["brands"].name), text: request.name != null ? request.name : "" });

        if (request.company) {
            helpers({ type: 'clickWhenClickable', element: $(elements["brands"].company), timeout: 20000 });
            genericMethods.clickByText(request.company);
        }
        break;
    case 'companies':

        helpers({ type: 'waitForElementVisibility', element: $(elements["companies"].id), timeout: 20000 });

        helpers({ type: 'fillFieldWithText', element: $(elements["companies"].id), text: request.id != null ? request.id : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["companies"].name), text: request.name != null ? request.name : "" });
        break;
    case 'holidays':

        helpers({ type: 'waitForElementVisibility', element: $(elements["holidays"].name), timeout: 20000 });

        helpers({ type: 'fillFieldWithText', element: $(elements["holidays"].name), text: request.name != null ? request.name : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["holidays"].dataAbrangencia), text: request.date != null ? request.date : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["holidays"].dataAbrangencia), text: protractor.Key.TAB });
        helpers({ type: 'fillFieldWithText', element: $(elements["holidays"].startZIP), text: request.startZip != null ? request.startZip : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["holidays"].endZIP), text: request.endZip != null ? request.endZip : "" });

        if (request.startZip && request.endZip) {
            $(elements["holidays"].addZipButton).click();
        }

        if (request.typeValidation == 'edit' && request.updateStaus) {

            helpers({ type: 'clickWhenClickable', element: $(elements["holidays"].changeStatus), timeout: 3000 });
        }
        break;
    case 'location-groups':

        helpers({ type: 'waitForElementVisibility', element: $(elements["location_groups"].id), timeout: 20000 });

        helpers({ type: 'fillFieldWithText', element: $(elements["location_groups"].id), text: request.id != null ? request.id : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["location_groups"].name), text: request.name != null ? request.name : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["location_groups"].zipCode), text: request.zipCode != null ? request.zipCode : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["location_groups"].address1), text: request.address1 != null ? request.address1 : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["location_groups"].number), text: request.number != null ? request.number : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["location_groups"].address2), text: request.address2 != null ? request.address2 : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["location_groups"].neighbourhood), text: request.neighbourhood != null ? request.neighbourhood : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["location_groups"].city), text: request.city != null ? request.city : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["location_groups"].state), text: request.state != null ? request.state : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["location_groups"].country), text: request.country != null ? request.country : "" });
        break;
    case 'locations':

        if (request.productRules) {

            switch (request.productRules) {
            case "type":

                helpers({ type: 'clickWhenClickable', element: element(by.name(request.type)), timeout: 3000 });
                break;
            case "shippingRange":

                helpers({ type: 'fillFieldWithText', element: $('[placeholder="Início"]'), text: request.start != null ? request.start : "" });
                helpers({ type: 'sendKeysSubmit', element: $('[placeholder="Fim"]'), text: request.end != null ? request.end : "" });
                break;
            }

            return
        }

        const text = request.locationType || (request.requiredFields ? false : 'Loja Própria');

        helpers({ type: 'waitForElementVisibility', element: $(elements["locations"].id), timeout: 20000 });

        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].id), text: request.id != null ? request.id : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].cnpj), text: request.cnpj != null ? request.cnpj : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].description), text: request.description != null ? request.description : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].tradingName), text: request.tradingName != null ? request.tradingName : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].zip), text: request.zipCode != null ? request.zipCode : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].number), text: request.number != null ? request.number : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].address1), text: request.address1 != null ? request.address1 : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].address2), text: request.address2 != null ? request.address2 : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].neighbourhood), text: request.neighbourhood != null ? request.neighbourhood : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].city), text: request.city != null ? request.city : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].state), text: request.state != null ? request.state : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].country), text: request.country != null ? request.country : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].telCountryCode), text: request.telCountryCode != null ? request.telCountryCode : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].telNumber), text: request.telNumber != null ? request.telNumber : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].handlingTime), text: request.handlingTime != null ? request.handlingTime : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["locations"].handlingTax), text: request.handlingTax != null ? request.handlingTax : "" });

        if (text) {
            helpers({ type: 'clickWhenClickable', element: element(by.xpath("//label[text()='Tipo']/..//button")), timeout: 20000 });
            genericMethods.clickByText(text);
        }

        if (request.brand) {
            helpers({ type: 'clickWhenClickable', element: $(elements["locations"].brandField), timeout: 20000 });
            genericMethods.clickByText(request.brand);
        }

        request.type = (request.type === undefined || request.type === null) ? 0 : request.type;
        for (let i in request.type) {
            request.type[i] = request.type[i].toLowerCase();
            switch (request.type[i]) {
            case "s": $(elements["locations"].checkSendByStore).click();
                break;
            case "p": $(elements["locations"].checkPickup).click();
                break;
            case "st": $(elements["locations"].checkSendToStore).click();
                break;
            case "pp": $(elements["locations"].checkReceiveStore).click();
                break;
            case "r": $(elements["locations"].checkReserve).click();
                break;
            }
        }

        /*
             * Tratamento para quando a CCF estiver ativa (Os campos "Centro de custo", "Conta contábil" e "Local de negócio" são exibidos).
        */

        $$(elements["locations"].centerCostField).count().then(flag => {
            if (flag > 0) {
                helpers({ type: 'fillFieldWithText', element: $(elements["locations"].centerCostField), text: request.centerCostField != null ? request.centerCostField : "000001" });
                helpers({ type: 'fillFieldWithText', element: $(elements["locations"].checkAccountField), text: request.checkAccountField != null ? request.checkAccountField : "10" });
                helpers({ type: 'fillFieldWithText', element: $(elements["locations"].businessCodeField), text: request.centerCostField != null ? request.centerCostField : "1" });
            }
        });
        break;
    case 'macroregions':

        helpers({ type: 'waitForElementVisibility', element: $("[name='id']"), timeout: 20000 });
        helpers({ type: 'fillFieldWithText', element: $("[name='id']"), text: request.id != null ? request.id : "" });
        helpers({ type: 'fillFieldWithText', element: $("[name='name']"), text: request.tradingName != null ? request.tradingName : "" });
        helpers({ type: 'fillFieldWithText', element: $("[name='start']"), text: request.startZip != null ? request.startZip : "" });
        helpers({ type: 'fillFieldWithText', element: $("[name='end']"), text: request.endZip != null ? request.endZip : "" });

        if (request.startZip && request.endZip) {
            $(elements["holidays"].addZipButton).click();
        }

        if (request.deliveryType.shipment) {
            $("[name='SHIPMENT']").click();
        }

        if (request.deliveryType.pickup) {
            $("[name='PICKUP']").click();
        }
        break;
    case 'pickup':

        helpers({ type: 'waitForElementVisibility', element: $(elements["pickup"].description), timeout: 20000 });
        helpers({ type: 'fillFieldWithText', element: $(elements["pickup"].description), text: request.descriptFld != null ? request.descriptFld : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["pickup"].treatmentDeadLine), text: request.treatmentDeadLine != null ? request.treatmentDeadLine : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["pickup"].pickupDeadLine), text: request.pickupDeadLine != null ? request.pickupDeadLine : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["pickup"].reserveDeadLine), text: request.reserveDeadLine != null ? request.reserveDeadLine : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["pickup"].cutHour), text: request.cutHour != null ? request.cutHour : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["pickup"].deadLine), text: request.deadLine != null ? request.deadLine : "" });

        switch (request.status) {
        case 'on':

            $$('.toggle-block .on').first().isDisplayed().then(res => {

                if (res) { return }
                else {

                    helpers({ type: 'clickWhenClickable', element: $$('.toggle-block .off').first(), timeout: 20000 });
                }
            });
            break;
        case 'off':

            $$('.toggle-block .off').first().isDisplayed().then(res => {

                if (res) { return }
                else {

                    helpers({ type: 'clickWhenClickable', element: $$('.toggle-block .on').first(), timeout: 20000 });
                }
            });
            break;
        }

        if (!request.allowAfterDeadline) {

            helpers({ type: 'clickWhenClickable', element: $('[for="toggleallowAfterDeadline"]'), timeout: 20000 });
        }

        break;
    case 'pools':

        helpers({ type: 'waitForElementVisibility', element: $("[name='name']"), timeout: 20000 });
        helpers({ type: 'fillFieldWithText', element: $("[name='name']"), text: request.tradingName != null ? request.tradingName : "" });
        break;
    case 'shipment/carriers':

        helpers({ type: 'waitForElementVisibility', element: $(elements["shipment_carriers"].id), timeout: 20000 });

        if (request.typeValidation == 'new') {

            elementIsentoStatusOFF.isDisplayed().then(() => {
                expect(elementIsentoStatusOFF.isDisplayed()).toBe(true);

                helpers({ type: 'fillFieldWithText', element: $(elements["shipment_carriers"].stateInsc), text: request.stateInsc != null ? request.stateInsc : "" });
            })
        }

        if (request.status == 'on') {
            helpers({ type: 'clickWhenClickable', element: elementIsentoStatusOFF, timeout: 20000 });
            expect(elementIsentoStatusON.isDisplayed()).toBe(true);
        }

        if (request.manualDispatchManagement) {

            helpers({ type: 'waitForElementVisibility', element: toggleManualDispatchManagement, timeout: 20000 });
            helpers({ type: 'clickWhenClickable', element: toggleManualDispatchManagement, timeout: 20000 });
        }

        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_carriers"].description), text: request.description != null ? request.description : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_carriers"].id), text: request.id != null ? request.id : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_carriers"].zip), text: request.zipCode != null ? request.zipCode : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_carriers"].number), text: request.number != null ? request.number : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_carriers"].address1), text: request.address1 != null ? request.address1 : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_carriers"].address2), text: request.address2 != null ? request.address2 : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_carriers"].neighbourhood), text: request.neighbourhood != null ? request.neighbourhood : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_carriers"].city), text: request.city != null ? request.city : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_carriers"].state), text: request.state != null ? request.state : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_carriers"].country), text: request.country != null ? request.country : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_carriers"].tradingName), text: request.tradingName != null ? request.tradingName : "" });

        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_carriers"].cnpj), text: request.cnpj != null ? request.cnpj : "" });
        break;
    case 'shipment/freight-methods':

        helpers({ type: 'waitForElementVisibility', element: $(elements["shipment_freight_methods"].id), timeout: 20000 });

        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_freight_methods"].id), text: request.id != null ? request.id : "" });
        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_freight_methods"].description), text: request.description != null ? request.description : "" });

        if (request.locationPool) {

            helpers({ type: 'clickWhenClickable', element: $(elements["shipment_freight_methods"].locationPoolTab), timeout: 20000 });
            helpers({ type: 'clickWhenClickable', element: $(elements["shipment_freight_methods"].toggleButton), timeout: 20000 });

            const toggleOff = element(by.xpath("//label[@for='toggleundefined']/span[@class='off']"));

            toggleOff.isDisplayed().then(promisse => {
                if (request.locationPool.toUpperCase() != "ON") {
                    expect(promisse).toBe(true);
                }
                else {
                    expect(promisse).toBe(false);
                }
            })
        }
        break;
    case 'shipment/freight-tables':

        helpers({ type: 'waitForElementVisibility', element: $(elements["shipment_freight_tables"].contract_id), timeout: 20000 });

        if (request.productRules) {

            switch (request.productRules) {
            case "deadline":
                helpers({ type: 'fillFieldWithText', element: $("[name='deadlineTime']"), text: request.deadline != null ? request.deadline : "" });
                //$("#rw_4_input").sendKeys(request.value);
                break;
            case "shippingRange":

                if (request.removeShippingRange) {

                    helpers({ type: 'clickWhenClickable', element: $('.btn-remove'), timeout: 20000 });
                }
                else {

                    helpers({ type: 'fillFieldWithText', element: $('[placeholder="Início"]'), text: request.start != null ? request.start : "" });
                    helpers({ type: 'sendKeysSubmit', element: $('[placeholder="Fim"]'), text: request.end != null ? request.end : "" });
                }
                break;
            case "importation":
                const path = require('path');
                element(By.css('input[type=file]')).sendKeys(path.resolve() + '/temp/frontend/cockpit/output.csv');
                break;
            }

            return
        }


        helpers({ type: 'fillFieldWithText', element: $(elements["shipment_freight_tables"].contract_id), text: request.contract_id != null ? request.contract_id : "" });

        if (request.shipping_carrier) {
            const shipping_carrier_dropdown = $$(elements["shipment_freight_tables"].shipping_dropdown).first();
            browser.sleep(1000);
            helpers({ type: 'clickWhenClickable', element: shipping_carrier_dropdown, timeout: 20000 });
            genericMethods.clickByText(request.shipping_carrier);
        }

        if (request.shipping_method) {
            const shipping_method_dropdown = $$(elements["shipment_freight_tables"].shipping_dropdown).get(1);
            browser.sleep(1000);
            helpers({ type: 'clickWhenClickable', element: shipping_method_dropdown, timeout: 2000 });
            genericMethods.clickByText(request.shipping_method);
        }

        if (request.blackList) {

            $("[name='start']").sendKeys('01414001');
            helpers({ type: 'waitForElementVisibility', element: $('[class="btn btn-primary btn-block"]'), timeout: 20000 });
            helpers({ type: 'clickWhenClickable', element: $('[class="btn btn-primary btn-block"]'), timeout: 20000 });
        }

        if (request.locations) {
            helpers({ type: 'clickWhenClickable', element: $(elements.shipment_freight_tables.locationsDropDownButton), timeout: 2000 });
            request.locations.forEach(locationName => {
                genericMethods.clickByText(locationName);
            });
        }

        break;
    case 'stock/virtual':

        if (request.location) {
            helpers({ type: 'waitForElementVisibility', element: $$('.rw-i.rw-i-caret-down').first(), timeout: 20000 });
            helpers({ type: 'clickWhenClickable', element: $$('.rw-i.rw-i-caret-down').first(), timeout: 2000 });
            genericMethods.clickByText(request.location);
        }

        helpers({ type: 'waitForElementVisibility', element: $(elements["stock_virtual"].sku), timeout: 20000 });
        helpers({ type: 'fillFieldWithText', element: $(elements["stock_virtual"].sku), text: request.sku != null ? request.sku : "" });

        if (request.stock_type) {

            helpers({ type: 'waitForElementVisibility', element: $$('.rw-i.rw-i-caret-down').last(), timeout: 20000 });
            helpers({ type: 'clickWhenClickable', element: $$('.rw-i.rw-i-caret-down').last(), timeout: 2000 });

            genericMethods.clickByText(request.stock_type);

            if (request.quantity) {

                helpers({ type: 'waitForElementVisibility', element: $(elements["stock_virtual"].qty), timeout: 20000 });
                helpers({ type: 'fillFieldWithText', element: $(elements["stock_virtual"].qty), text: request.quantity != null ? request.quantity : "" });
            }

            switch (request.stock_type) {
            case "Pré-venda":

                helpers({ type: 'fillFieldWithText', element: $(elements["stock_virtual"].pre_sales_start_billing), text: request.presales_start_billing != null ? request.presales_start_billing : "" });
                $(elements["stock_virtual"].pre_sales_start_billing).sendKeys(protractor.Key.chord(protractor.Key.TAB));

                helpers({ type: 'fillFieldWithText', element: $(elements["stock_virtual"].pre_sales_start_pre_sale), text: request.presales_start != null ? request.presales_start : "" });
                $(elements["stock_virtual"].pre_sales_start_pre_sale).sendKeys(protractor.Key.chord(protractor.Key.TAB));

                helpers({ type: 'fillFieldWithText', element: $(elements["stock_virtual"].pre_sales_end_pre_sale), text: request.presales_end != null ? request.presales_end : "" });
                $(elements["stock_virtual"].pre_sales_end_pre_sale).sendKeys(protractor.Key.chord(protractor.Key.TAB));

                break;
            case "Virtual":

                helpers({ type: 'fillFieldWithText', element: $(elements["stock_virtual"].virtual_available), text: request.virtual_available != null ? request.virtual_available : "" });
                break;
            case "Cross-Docking":

                helpers({ type: 'fillFieldWithText', element: $(elements["stock_virtual"].receiving_estimate), text: request.receiving_estimate != null ? request.receiving_estimate : "" });
                break;
            }
        }
        break;
    case 'users/cockpit':
        helpers({ type: 'waitForElementVisibility', element: $(elements["users_cockpit"].name), timeout: 20000 });
        request.name = (!request.name && request.newName) ? request.newName : request.name;
        helpers({ type: 'fillFieldWithText', element: $(elements["users_cockpit"].name), text: request.name != null ? request.name : "" });

        if (request.typeValidation == 'edit') {
            const on = element(by.cssContainingText(".toggle-block  span", "Ativo"));
            const off = element(by.cssContainingText(".toggle-block  span", "Inativo"));

            switch (request.status) {
            case 'on':

                on.isDisplayed().then(result => {
                    if (!result) { off.click(); }
                });
                break;

            case 'off':

                on.isDisplayed().then(result => {
                    if (!result) { off.click(); }
                });
                break;
            }

            browser.sleep(5000);
            return
        }

        if (request.permission) {
            $(elements["users_cockpit"].permission + "[value='" + request.permission + "']").click();
        }

        helpers({ type: 'fillFieldWithText', element: $(elements["users_cockpit"].email), text: request.email != null ? request.email : "" });
        browser.sleep(1000);
        break;
    case 'users/permissions':

        helpers({ type: 'waitForElementVisibility', element: $(elements["users_permissions"].inputName), timeout: 20000 });
        helpers({ type: 'fillFieldWithText', element: $(elements["users_permissions"].inputName), text: request.name != null ? request.name : "" });

        switch (request.permission) {
        case "Filiais de um grupo empresarial específico":
            $(elements["users_permissions"].elementRadioFiliaisGrupoEmpresarialEspecifico).click();
            break;
        case "Filiais de uma marca específica":
            $(elements["users_permissions"].elementRadioFiliaisMarcaEspecifica).click();
            break;
        case "Filiais de uma regional específica":
            $(elements["users_permissions"].elementRadioFiliaisRegionalEspecifica).click();
            break;
        case "Filiais específicas":
            $(elements["users_permissions"].elementRadioFiliaisEspecificas).click();
            break;
        case "Todas as filiais do sistema":
            $(elements["users_permissions"].elementRadioTodasFiliaisSistema).click();
            break;
        }

        helpers({ type: 'clickWhenClickable', element: $(elements["users_permissions"].btnProxima), timeout: 2000 });
        helpers({ type: 'waitForElementVisibility', element: $(elements["users_permissions"].elementButtonAnterior), timeout: 20000 });

        if (request.areaPermission) {

            const inputPermissao = element(by.xpath("//span[contains(text(), '" + request.areaPermission + "')]/..//input"));
            helpers({ type: 'clickWhenClickable', element: inputPermissao, timeout: 2000 });
        }
        break;
    case 'users/in-store':

        if (request.permission) {

            const permission = $("[value='" + request.permission + "']");
            helpers({ type: 'clickWhenClickable', element: permission, timeout: 2000 });
        }

        helpers({ type: 'fillFieldWithText', element: $(elements["users_in_store"].name), text: request.name != null ? request.name : "" });

        if (request.typeValidation == 'new') {

            helpers({ type: 'fillFieldWithText', element: $(elements["users_in_store"].enrollment), text: request.enrollment != null ? request.enrollment : "" });
        }

        if (request.generatePassword) {

            helpers({ type: 'clickWhenClickable', element: $(elements["users_in_store"].buttonGerarSenha), timeout: 2000 });
        }
        else {

            helpers({ type: 'fillFieldWithText', element: $(elements["users_in_store"].password), text: request.pass != null ? request.pass : "" });
        }

        if (request.location != null) {

            const elementFieldLocationDropDownButton = $(elements["users_in_store"].location_dropdown_button);

            helpers({ type: 'waitForElementVisibility', element: elementFieldLocationDropDownButton, timeout: 20000 });

            elementFieldLocationDropDownButton.click().then(() => {

                browser.sleep(1000);
                helpers({ type: 'clickWhenClickable', element: element(by.xpath("//li[@class='rw-list-option'][contains(text(),'" + request.location + "')]")), timeout: 2000 });
            });
        }
        break;
    }
}

const clearValues = (request) => {
    switch (request.page) {
    case 'brands':

        helpers({ type: 'waitForElementVisibility', element: $(elements["brands"].id), timeout: 20000 });
        helpers({ type: 'clear', element: $(elements["brands"].id) });
        helpers({ type: 'clear', element: $(elements["brands"].tradingName) });
        helpers({ type: 'clear', element: $(elements["brands"].name) });
        break;
    case 'companies':

        helpers({ type: 'waitForElementVisibility', element: $(elements["companies"].id), timeout: 20000 });
        helpers({ type: 'clear', element: $(elements["companies"].id) });
        helpers({ type: 'clear', element: $(elements["companies"].name) });
        break;

    case 'holidays':

        helpers({ type: 'waitForElementVisibility', element: $(elements["holidays"].name), timeout: 20000 });
        helpers({ type: 'clear', element: $(elements["holidays"].name) });
        helpers({ type: 'clear', element: $(elements["holidays"].dataAbrangencia) });
        helpers({ type: 'clear', element: $(elements["holidays"].startZIP) });
        helpers({ type: 'clear', element: $(elements["holidays"].endZIP) });
        break;
    case 'location-groups':

        helpers({ type: 'waitForElementVisibility', element: $(elements["location_groups"].id), timeout: 20000 });
        helpers({ type: 'clear', element: $(elements["location_groups"].id) });
        helpers({ type: 'clear', element: $(elements["location_groups"].name) });
        helpers({ type: 'clear', element: $(elements["location_groups"].zipCode) });
        helpers({ type: 'clear', element: $(elements["location_groups"].address1) });
        helpers({ type: 'clear', element: $(elements["location_groups"].number) });
        helpers({ type: 'clear', element: $(elements["location_groups"].address2) });
        helpers({ type: 'clear', element: $(elements["location_groups"].neighbourhood) });
        helpers({ type: 'clear', element: $(elements["location_groups"].city) });
        helpers({ type: 'clear', element: $(elements["location_groups"].state) });
        helpers({ type: 'clear', element: $(elements["location_groups"].country) });
        break;

    case 'locations':

        if (request.productRules) { return }

        helpers({ type: 'waitForElementVisibility', element: $(elements["locations"].id), timeout: 20000 });
        helpers({ type: 'clear', element: $(elements["locations"].id) });
        helpers({ type: 'clear', element: $(elements["locations"].cnpj) });
        helpers({ type: 'clear', element: $(elements["locations"].description) });
        helpers({ type: 'clear', element: $(elements["locations"].tradingName) });
        helpers({ type: 'clear', element: $(elements["locations"].zip) });
        helpers({ type: 'clear', element: $(elements["locations"].number) });
        helpers({ type: 'clear', element: $(elements["locations"].address1) });
        helpers({ type: 'clear', element: $(elements["locations"].address2) });
        helpers({ type: 'clear', element: $(elements["locations"].neighbourhood) });
        helpers({ type: 'clear', element: $(elements["locations"].city) });
        helpers({ type: 'clear', element: $(elements["locations"].state) });
        helpers({ type: 'clear', element: $(elements["locations"].country) });
        helpers({ type: 'clear', element: $(elements["locations"].telCountryCode) });
        helpers({ type: 'clear', element: $(elements["locations"].telNumber) });
        helpers({ type: 'clear', element: $(elements["locations"].handlingTime) });
        helpers({ type: 'clear', element: $(elements["locations"].handlingTax) });
        break;
    case 'macroregions':

        helpers({ type: 'waitForElementVisibility', element: $("[name='id']"), timeout: 20000 });
        helpers({ type: 'clear', element: $("[name='name']") });
        $("[name='SHIPMENT']").click();
        $(".fa-remove").click();

        break;
    case 'pickup':

        helpers({ type: 'waitForElementVisibility', element: $(elements["pickup"].description), timeout: 20000 });
        helpers({ type: 'clear', element: $(elements["pickup"].description) });
        helpers({ type: 'clear', element: $(elements["pickup"].treatmentDeadLine) });
        helpers({ type: 'clear', element: $(elements["pickup"].pickupDeadLine) });
        helpers({ type: 'clear', element: $(elements["pickup"].reserveDeadLine) });
        helpers({ type: 'clear', element: $(elements["pickup"].cutHour) });
        helpers({ type: 'clear', element: $(elements["pickup"].deadLine) });
        break;
    case 'pools':

        helpers({ type: 'waitForElementVisibility', element: $("[name='name']"), timeout: 20000 });
        helpers({ type: 'clear', element: $("[name='name']") });
        break;
    case 'shipment/carriers':

        helpers({ type: 'waitForElementVisibility', element: $(elements["shipment_carriers"].id), timeout: 20000 });

        helpers({ type: 'clear', element: $(elements["shipment_carriers"].description) });
        helpers({ type: 'clear', element: $(elements["shipment_carriers"].id) });
        helpers({ type: 'clear', element: $(elements["shipment_carriers"].zip) });
        helpers({ type: 'clear', element: $(elements["shipment_carriers"].number) });
        helpers({ type: 'clear', element: $(elements["shipment_carriers"].address1) });
        helpers({ type: 'clear', element: $(elements["shipment_carriers"].address2) });
        helpers({ type: 'clear', element: $(elements["shipment_carriers"].neighbourhood) });
        helpers({ type: 'clear', element: $(elements["shipment_carriers"].city) });
        helpers({ type: 'clear', element: $(elements["shipment_carriers"].state) });
        helpers({ type: 'clear', element: $(elements["shipment_carriers"].country) });
        helpers({ type: 'clear', element: $(elements["shipment_carriers"].tradingName) });

        if (expect(elementIsentoStatusOFF.isDisplayed()) == true) {
            helpers({ type: 'clear', element: $(elements["shipment_carriers"].stateInsc) });
        }

        helpers({ type: 'clear', element: $(elements["shipment_carriers"].cnpj) });

        if (request.shutdownTrackCode) {
            const isTrackActive = $$(elements["shipment_carriers"].trackingPrefix);
            isTrackActive.count().then((size) => {
                if (size == 0) {
                    $(elements["shipment_carriers"].toggleTrackCode).click();
                    helpers({ type: 'waitForElementVisibility', element: $(elements["shipment_carriers"].trackingPrefix), timeout: 6000 });

                    expect($(elements["shipment_carriers"].trackingPrefix).getAttribute('value')).toEqual('');
                    expect($(elements["shipment_carriers"].trackingSufix).getAttribute('value')).toEqual('');
                    expect($(elements["shipment_carriers"].trackingNumberSize).getAttribute('value')).toEqual('');
                    expect($(elements["shipment_carriers"].trackingStartNumber).getAttribute('value')).toEqual('');
                    expect($(elements["shipment_carriers"].trackingEndNumber).getAttribute('value')).toEqual('');
                    expect($(elements["shipment_carriers"].trackingCurrentNumber).getAttribute('value')).toEqual('');
                }
            });
            $(elements["shipment_carriers"].toggleTrackCode).click();
        }
        if (request.shutdownReverseAddress) {
            $$(elements["shipment_carriers"].reverseZipCode).count().then((size) => {
                if (size == 0) {
                    $(elements["shipment_carriers"].toggleReverseAddress).click();
                    helpers({ type: 'waitForElementVisibility', element: $(elements["shipment_carriers"].reverseZipCode), timeout: 6000 });

                    expect($(elements["shipment_carriers"].reverseZipCode).getAttribute('value')).toEqual('');
                    expect($(elements["shipment_carriers"].reverseAddrress1).getAttribute('value')).toEqual('');
                    expect($(elements["shipment_carriers"].reverseNumber).getAttribute('value')).toEqual('');
                    expect($(elements["shipment_carriers"].reverseAddress2).getAttribute('value')).toEqual('');
                    expect($(elements["shipment_carriers"].reverseNeighbourhood).getAttribute('value')).toEqual('');
                    expect($(elements["shipment_carriers"].reverseCity).getAttribute('value')).toEqual('');
                    expect($(elements["shipment_carriers"].reverseState).getAttribute('value')).toEqual('');
                    expect($(elements["shipment_carriers"].reverseCountry).getAttribute('value')).toEqual('');
                }
                $(elements["shipment_carriers"].toggleReverseAddress).click();
            });
        }

        break;
    case 'shipment/freight-methods':

        helpers({ type: 'waitForElementVisibility', element: $(elements["shipment_freight_methods"].id), timeout: 20000 });
        helpers({ type: 'clear', element: $(elements["shipment_freight_methods"].id) });
        helpers({ type: 'clear', element: $(elements["shipment_freight_methods"].description) });

        break;
    case 'shipment/freight-tables':

        if (request.productRules) { return }

        const delBtns = $$(elements.shipment_freight_tables.locationsDeleteButton);
        browser.sleep(1000);
        delBtns.each(_ => {
            helpers({ type: 'clickWhenClickable', element: delBtns.first(), timeout: 10000 });
        });

        break;
    case 'users/cockpit':
        helpers({ type: 'waitForElementVisibility', element: $(elements["users_cockpit"].name), timeout: 20000 });

        helpers({ type: 'clear', element: $(elements["users_cockpit"].name) });
        //helpers({ type: 'clear', element: $(elements["users_cockpit"].email) });
        break;
    case 'users/permissions':

        helpers({ type: 'waitForElementVisibility', element: $(elements["users_permissions"].inputName), timeout: 20000 });
        helpers({ type: 'clear', element: $(elements["users_permissions"].inputName) });
        break;
    case 'users/in-store':

        helpers({ type: 'waitForElementVisibility', element: $(elements["users_in_store"].name), timeout: 20000 });
        helpers({ type: 'clear', element: $(elements["users_in_store"].name) });
        helpers({ type: 'clear', element: $(elements["users_in_store"].password) });
        break;
    }
}

const disabled = (request) => {
    switch (request.page) {
    case 'macroregions':
        helpers({ type: 'waitForElementVisibility', element: $(elements["macroregions"].elementIDDesabilitado), timeout: 20000 });

        expect($(elements["macroregions"].elementIDDesabilitado).isDisplayed()).toBeTruthy();
        expect($(elements["macroregions"].elementNameDesabilitado).isDisplayed()).toBeTruthy();
        expect($(elements["macroregions"].elementStatusDesabilitado).isPresent()).toBeTruthy();
        expect($(elements["macroregions"].elementCheckboxEnvioDesabilitado).isDisplayed()).toBeTruthy();
        expect($(elements["macroregions"].elementCheckboxRetiradaDesabilitado).isDisplayed()).toBeTruthy();
        expect($$(elements["macroregions"].elementFaixaCEPInicialDesabilitado).first().isDisplayed()).toBeTruthy();
        expect($$(elements["macroregions"].elementFaixaCEPFinalDesabilitado).last().isDisplayed()).toBeTruthy();
        break;
    case 'pools':
        helpers({ type: 'waitForElementVisibility', element: $("[name='id'][readonly]"), timeout: 20000 });

        expect($("[name='id'][readonly]").isDisplayed()).toBeTruthy();
        expect($("[name='name'][readonly]").isDisplayed()).toBeTruthy();
        break;
    case 'shipment/carriers':
        helpers({ type: 'waitForElementVisibility', element: $(elements["shipment_carriers"].description), timeout: 20000 });

        expect($(elements["shipment_carriers"].description).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_carriers"].id).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_carriers"].zip).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_carriers"].number).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_carriers"].address1).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_carriers"].address2).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_carriers"].neighbourhood).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_carriers"].city).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_carriers"].state).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_carriers"].country).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_carriers"].tradingName).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_carriers"].stateInsc).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_carriers"].cnpj).isDisplayed()).toBeTruthy();
        break;
    case 'shipment/freight-methods':
        helpers({ type: 'waitForElementVisibility', element: $(elements["shipment_freight_methods"].elementFieldIDReadOnly), timeout: 20000 });

        expect($(elements["shipment_freight_methods"].elementFieldIDReadOnly).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_freight_methods"].elementFieldNameReadOnly).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_freight_methods"].elementFieldBillingDeadlineReadOnly).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_freight_methods"].elementCheckboxStatusReadOnly).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_freight_methods"].elementFieldDeadlineTimeReadOnly).isDisplayed()).toBeTruthy();
        expect($(elements["shipment_freight_methods"].elementFieldAfterDeadlineReadOnly).isDisplayed()).toBeTruthy();
        expect($$(elements["shipment_freight_methods"].elementFieldPriority1ReadOnly).first().isDisplayed()).toBeTruthy();
        break;
    case 'shipment/freight-tables':
        helpers({ type: 'waitForElementVisibility', element: $(elements["shipment_freight_tables"].contract_id), timeout: 20000 });
        break;
    case 'users/permissions':

        helpers({ type: 'waitForElementVisibility', element: $(elements["users_permissions"].inputNameDisabled), timeout: 20000 });

        expect($(elements["users_permissions"].inputNameDisabled).isDisplayed()).toBeTruthy();
        expect($(elements["users_permissions"].radioFiliaisGrupoEmpresarialEspecificoDisabled).isDisplayed()).toBeTruthy();
        expect($(elements["users_permissions"].radioFiliaisMarcaEspecificaDisabled).isDisplayed()).toBeTruthy();
        expect($(elements["users_permissions"].radioFiliaisRegionalEspecificaDisabled).isDisplayed()).toBeTruthy();
        expect($(elements["users_permissions"].radioFiliaisEspecificasDisabled).isDisplayed()).toBeTruthy();
        expect($(elements["users_permissions"].radioTodasFiliaisSistemaDisabled).isDisplayed()).toBeTruthy();
        expect($(elements["users_permissions"].buttonProxima).isDisplayed()).toBeTruthy();

        helpers({ type: 'clickWhenClickable', element: $(elements["users_permissions"].btnProxima), timeout: 2000 });
        helpers({ type: 'waitForElementVisibility', element: $(elements["users_permissions"].elementButtonAnterior), timeout: 20000 });

        const checkboxDisabled = $$(".checkbox-inline [type='checkbox'][disabled]");
        const checkboxAll = $$(".checkbox-inline [type='checkbox']");

        //Validar checkbox desabilitados
        checkboxDisabled.count().then((qtyDisabled) => {
            checkboxAll.count().then((qtyAll) => {
                expect(qtyDisabled == qtyAll).toBeTruthy();
            });
        });

        //Validar dropdowns desabilitados
        const dropdownlistDisabled = $$(".btn.btn-link.dropdownlist-toggle.disabled");
        const dropdownAll = $$(".btn.btn-link.dropdownlist-toggle");

        dropdownlistDisabled.count().then((qtyDropDisabled) => {
            dropdownAll.count().then((qtyDropAll) => {
                //A validação faz com menos 1, pois existe um elemento dropsdown que não é desabilitado(elemento de alterar usuário oms)
                expect(qtyDropDisabled == qtyDropAll - 1).toBeTruthy();
            });
        });
        break;
    }
}

const getAllElements = { setValues, clearValues, disabled };

module.exports = getAllElements;
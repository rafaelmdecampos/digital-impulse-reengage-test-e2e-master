const environment = require("../../config").environment;

const supertest = require("supertest");
const tribo = process.env.TRIBO;
const squad = process.env.SQUAD;
const env = process.env.ENV;
const url = process.env.URL;

const getPrefixUrlApp = {
    omni: {
        finances: {
            ccf: supertest.agent(environment.omni.finances.ccf[env]),
            'wallet': supertest.agent(environment.omni.finances['wallet'][env]),
        },
        logistics: {
            oms: supertest.agent(environment.omni.logistics.oms[env]),
            chubaca: supertest.agent(environment.omni.logistics.oms[env]),
            inventoryV2: supertest.agent(environment.omni.logistics.inventoryV2[env]),
            scorer: supertest.agent(environment.omni.logistics.scorer[env]),
            'falcon': supertest.agent(environment.omni.logistics['falcon'][env])
        },
        sales:{
            oms: supertest.agent(environment.omni.logistics.oms[env]),
            order: supertest.agent(environment.omni.sales.order[env]),
            'remote-config': supertest.agent(environment.omni.sales['remote-config'][env]),
            'entity-log': supertest.agent(environment.omni.sales['entity-log'][env]),
        },
        general:{
            oms: supertest.agent(environment.omni.logistics.oms[env]),
        }
    }
}

const invokeHttpRead = (request) => {

    let http;
    
    if (!url) {
        //console
        const microService = request.microService || 'oms'; //
        http = getPrefixUrlApp[tribo][squad][microService];
    }
    else {

        http = supertest.agent(url);
    }
    
    const route = request.route;
    const clientId = request.clientId;
    const authPass = request.authPass;
    
    return http.get(route).auth(clientId, authPass);
}

const invokeHttpWrite = (request) => {

    let http;
    
    if (!url) {

        const microService = request.microService || 'oms'; //
        http = getPrefixUrlApp[tribo][squad][microService];
    }
    else {

        http = supertest.agent(url);
    }

    const route = request.route;
    const clientId = request.clientId;
    const authPass = request.authPass;
    const typeWrite = request.typeWrite;
    const body = request.body;

    return http[typeWrite](route).auth(clientId, authPass).send(body);
}

/*
    await invokeHttpRead({
        route: request.headerGet.route,
        clientId: request.clientId,
        authPass: request.authPass,
    });

    await invokeHttpWrite({
        microService,
        route,
        clientId,
        authPass,
        typeWrite,
        body
    });
*/

module.exports = {
    invokeHttpRead,
    invokeHttpWrite
};
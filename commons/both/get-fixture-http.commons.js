const invokeHttpFixtures = async (request) => {

    const invokeHttp = require('../../helpers').invokeHttp;

    const getResHistoryTestStats = await invokeHttp({
        auth: {
            user: 'testing', password: 'ucMEKVW8v9CuxvLK'
        },
        uri: `https://test-automated.omniplat.io/${request.route}`, method: 'POST',
        //uri: `http://localhost:5000/${request.route}`, method: 'POST',
        json: request.body
    });

    return getResHistoryTestStats.sucess.body.fixture;
}

const static = (request) => {

    const serviceId = request.serviceId;
    const keyFixture = request.keyFixture;
    const aggregateValues = request.aggregateValues;

    return {
        route: `v1/generate/static/oms/${request.squad}/backend`,
        body: {
            serviceId,
            keyFixture,
            aggregateValues
        }
    }
}

const dynamic = (request) => {

    const body = request.body;
    const flowType = request.flowType;

    return {
        route: `v1/generate/dynamic/oms/flows/${flowType}`,
        body
    }
}

const functionTypeGetFixture = {
    static,
    dynamic
}

const getFixtureHttp = async (request) => {

    const type = request.type;
    const getFunctionTypeGetFixture = functionTypeGetFixture[type];

    const resBody = await getFunctionTypeGetFixture(request);

    return await invokeHttpFixtures(resBody);
}

/*
    Static

    getFixtureHttp({
        type: 'static',
        squad: 'logistics',
        serviceId: "chubaca",
        keyFixture: "calendar-holidays-post"
    });

    Dynamic

    getFixtureHttp({
        type: 'dynamic',
        flowType: "flow-order-with-quote-out",
        body: {
            authPass: "c5bf483b0e89c5629d401d8547d9ef4e",
            channelId: "site",
            clientId: "qa",
            env: "staging",
            requestOrder: [
                {
                    "id": "F1",
                    "locationId": "L1",
                    "qtdItemSku": "10",
                    "qtdSkus": 1,
                    "statusFulfillmentEnd": "PICKUP_FAIL",
                    "type": "PICKUP"
                }
            ]
        }
    });
*/

module.exports = getFixtureHttp;
const tribo = process.env.TRIBO;// || 'omni';
const squad = process.env.SQUAD;// || 'sales';

const getOptionsInvokeHttp = (request) => {
    
    const environment = require("../../config").environment;
    
    const uri = environment[tribo][squad][request.microService][request.env] + request.route;

    let resOptions = { uri, method: request.method, auth: { user: '', password: '' }, json: {} };

    resOptions.json = request.json;

    if (request.microService == 'remote-config') {
        
        resOptions.auth.user = "remoteconfig@email.com";
        resOptions.auth.password = "1234@abcd";
    }
    else {
        
        resOptions.auth.user = request.clientId;
        resOptions.auth.password = request.authPass
    }

    if (request.method == 'GET') {

        delete resOptions.json;
    }

    return resOptions;
}

const requestHttp = async (request) => {

    const getConsole = require('../../commons/both/get-log-console.support');

    const getOptions = await getOptionsInvokeHttp(request);

    delete getOptions.auth.pass;

    const invokeHttp = require('../../helpers').invokeHttp;

    const getResHttp = await invokeHttp(getOptions);

    getConsole({
        type: 'info',
        message: '[REQUEST][HTTP] - Sucess in getResHttp',
        data: getResHttp
    });

    let body;

    if (!Object.keys(getResHttp.error).length === 0) {

        getConsole({
            type: 'info',
            message: '[REQUEST][HTTP] - Sellers is empty!',
            data: getResHttp
        });
    } else {
        
        if (JSON.stringify(getResHttp.sucess.body) !== '{}') {

            body = getResHttp.sucess.body;
            
            getConsole({
                type: 'info',
                message: '[REQUEST][HTTP] - Sellers is not empty!',
                data: body
            });
        } else {

            getConsole({
                type: 'info',
                message: '[REQUEST][HTTP] - Sellers is empty!'
            });
        }
    }

    return body
}

/*
    await requestHttp({
        method: 'PUT',
        microService: 'remote-config',
        env: request.env,
        route: `v1/configs/order/${request.clientId}/${request.env}`,
        json: objectWriting
    });
*/

module.exports = requestHttp;
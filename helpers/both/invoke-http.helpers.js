const http = require('request');

const invokeHttp = async (options) => {
    return new Promise(resolve => {

        /**
         * Abstract Function That Queries The Jira
         * @param options : { uri, method, auth: { user, password } };
         * @resolve body
         */

        const response = { sucess: {}, error: {}, params: options }

        http(options, function (error, res, body) {
            console.log(error)
            if (error) {
                console.log(error)
                response.error = {
                    status: true,
                    body
                }
            }
            else {

                response.sucess = {
                    status: true,
                    body
                }
            }

            resolve(response);
        });
    });
}

module.exports = invokeHttp;
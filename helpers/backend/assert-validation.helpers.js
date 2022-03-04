const assertValidation = (request) => {

    const assert = require('assert');

    const type = request.type
    const actual = request.actual
    const expected = request.expected
    const inputValidation = request.inputValidation;
    const getRes = request.getRes;

    const message = {
        msg: `field => "${inputValidation}" this information, but I received it = "${actual}" and that should come "${expected}".`,
        test: {
            app: getRes.req.socket._host,
            path: getRes.req.path,
            method: getRes.req.method,
            statusCode: getRes.statusCode,
            body: getRes.body
        }
    };

    switch (type) {
    case 'equal':

        assert.equal(actual, expected, JSON.stringify(message));
        break;
    case 'notEqual':

        assert.notEqual(actual, expected);
        break;
    }
}

/*
    assertValidation({ 
        type: 'equal', 
        actual: getRes.body[0].enabled, 
        expected: false, 
        inputValidation: 'body[0].enabled', 
        getRes 
    });
*/

module.exports = assertValidation;
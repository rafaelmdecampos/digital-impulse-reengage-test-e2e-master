const environment = require("../../../../config").environment;
const supertest = require("supertest");
const env = process.env.ENV;
const url = process.env.URL || environment.demo.automated.manager[env];

const server = supertest.agent(url);

const user = process.env.USER;
const pass = process.env.PASS;

const fixtureManager = {
    "tribo": "omni",
    "squad": "logistics",
    "payloadCompletReturn": true,
    "noSendMessage": true,
    "stageType": "backend",
    "environment": "staging",
    "microService": "chubaca",
    "typeRun": "punctual",
    "testRequester": {
        "teamUser": "qa",
        "userName": "emerson.ramalho",
        "notifier": [
            {
                "to": "emerson.ramalho@linx3.com",
                "type": "email"
            }
        ]
    }
}

describe(`suite : test acceptance on micro-service : [manager] in end-point : [run test by] `, () => {

    describe.only("scenario test : Run Test By", () => {

        const route = `/run-test/acceptance/backend`;

        it("step test : BadRequest: tribo sent empty is required in body", (done) => {

            fixtureManager.tribo = undefined;

            server.post(route)
                .auth(user, pass)
                .send(fixtureManager)
                .expect(res => {

                    console.log(res.body)

                    res.status.should.equal(400);
                })
                .end(function (err, res) {
                    done();
                });
        });
    });
});
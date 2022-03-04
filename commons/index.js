module.exports = {
    both: {
        requestHttp: require('./both/request-http.commons'),
        getFixtureHttp: require('./both/get-fixture-http.commons'),
        uniqui: require('./both/generate-id-unique.utils'),
        people: require('./both/generate.people'),
        random: require('./both/generate.random'),
        getLogConsole: require('./both/get-log-console.support')
    },
    frontend: {
        beforeAll:require('./frontend/get-before-all').beforeAll
    }
}
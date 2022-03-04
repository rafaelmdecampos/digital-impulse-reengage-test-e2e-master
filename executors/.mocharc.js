const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

let reportTitle;
let dirTestsClass;

if(process.env.TYPE_TEST == 'flows'){
    
    reportTitle = `[Linx][Digital][QA] - ${process.env.TYPE_TEST.toUpperCase()} in ${process.env.TYPE_DELIVERY.toUpperCase()}`;
    dirTestsClass = `${process.env.TEST_DIR}`;
}
else{

    reportTitle = `[Linx][Digital][QA] - ${process.env.TYPE_TEST.toUpperCase()} in ${process.env.MICRO_SERVICE.toUpperCase()}`;
    dirTestsClass = `${process.env.TEST_DIR}${process.env.MICRO_SERVICE}/`;
}

const mocha = new Mocha({
    bail: process.env.IS_DEV || false,     // - To dev
    growl: process.env.IS_DEV || false,    // - To dev
    timeout: 20000,
    retries: 3,
    extension: ['js'],
    diffs: true,
    inlineDiffs: true,
    color: true,
    ui: 'bdd',
    exit: true,
    fullTrace: true,
    reporter: 'mochawesome',
    reporterOptions: {
        autoOpen: process.env.IS_DEV || false,     // - To dev
        reportDir: './reports/backend/',
        reportFilename: `${process.env.REPORT_NAME}` || 'local_test_',
        reportPageTitle: "[Linx][Digital][QA] - OMNI",
        reportTitle,
        overwrite: true,
        showPassed: false,
        code: false,
        cdn: true,
        inline: true,
        charts: true
    }
});

// Add each .js file to the mocha instance
fs.readdirSync(dirTestsClass)
    .filter(file => file.substr(-3) === '.js')
    //.filter(file => file === 'flow-shipment.js')
    .forEach(file => mocha.addFile(path.join(dirTestsClass, file)));

// Run the tests.
mocha.run(failures => {
    process.on('exit', () => {
        process.exit(failures); // exit with non-zero status if there were failures
    });
}); 
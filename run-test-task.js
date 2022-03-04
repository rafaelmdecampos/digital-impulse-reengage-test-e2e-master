async function runTestProcess() {

    const runTask = require('./controller/run-test/run-task-test.controller');
    const request = JSON.parse(process.env.MSG_SQS);

    const runTest = await runTask.writingTestRunHistory({
        stepType: 'writing',
        writingType: 'POST',
        msgSqs: request
    });

    const stats = await runTask.runTest(runTest);

    const resTest = await runTask.writingTestRunHistory({
        stepType: 'writing',
        writingType: 'PUT',
        stats
    });

    await runTask.notifier(resTest);
}

runTestProcess();
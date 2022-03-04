[nodejs]: https://nodejs.org/en/
[npmjs]: https://www.npmjs.com/
[supertest]: https://github.com/visionmedia/supertest
[mocha]: https://mochajs.org/
[protractor]: http://www.protractortest.org/

# IMPULSE REENGAGE AUTOMATED TESTING # [![CircleCI](https://circleci.com/gh/chaordic/oms-test-automated-e2e.svg?style=svg&circle-token=db2d58f1be6fb1ccb9990603f1f13823e5f45cde)](https://circleci.com/gh/chaordic/oms-test-automated-e2e)

This README would normally document whatever steps are necessary to get your application up and running.

### Requirements ###
* Java (https://www.java.com/pt_BR/download/) - only test the front-end and out of the docker container.

### Prerequisite

* [Docker](https://www.docker.com/community-edition)
* [Docker Compose](https://docs.docker.com/compose/install)

### Up and running

First, you should build the image. And every time the image changes you should build it again.

```console
$ make build
```

### `Default` environment variables.

| Variables | Example | Description |
| ---- | ---- | ---- |
| `TEAM` | *oms* | This parameter is tagged within the test class from team.
| `SQUAD` | *general* | This parameter is tagged within the test class from squad.
| `CLIENT` | *qa* | This is a clientId identification.
| `ENV` | *production* | This is the environment where the tests will be performed.

## To run the `API` tests these `VARIABLES` are essential.

| Variables | Example | Description |
| ---- | ---- | ---- |
| `PRIORITY_TEST` | *2* | This parameter defines the test priority execution time.
| `MICRO_SERVICE` | *inventoryV2* | This parameter is tagged within the test class from micro service.
| `ENDPOINT` | *stock* | This parameter is tagged within the test class from endpoint.
| `TYPE_DELIVERY` | *pickup* | This is the type delivery where the tests will be performed.
| `STOCK_TYPE` | *PHYSICAL* | This is the stock type where the tests will be performed.

If you want to run `ACCEPTANCE` tests `IN DOCKER` container :

	`$ docker run -e TEAM=$(TEAM) -e SQUAD="$(SQUAD)" -e CLIENT=$(CLIENT) -e ENV=$(ENV) -e MICRO_SERVICE=$(MICRO_SERVICE) -e ENDPOINT=$(MICRO_SERVICE) -e PRIORITY_TEST=$(PRIORITY_TEST) -it -v $(pwd):/opt/app digital-impulse-reengage-test-e2e npm run acceptance`
	
If you want to run `FLOWS` tests `IN DOCKER` container :

	`$ docker run -e TEAM=$(TEAM) -e SQUAD="$(SQUAD)" -e CLIENT=$(CLIENT) -e ENV=$(ENV) -e TYPE_DELIVERY=$(TYPE_DELIVERY) -e STOCK_TYPE=$(STOCK_TYPE) -it -v $(pwd):/opt/app digital-impulse-reengage-test-e2e npm run flows`

If you want to run `PRODUCT` tests `IN DOCKER` container :

	`$ docker run -e TEAM=$(TEAM) -e SQUAD="$(SQUAD)" -e CLIENT=$(CLIENT) -e ENV=$(ENV) -e MICRO_SERVICE=$(MICRO_SERVICE) -e ENDPOINT=$(MICRO_SERVICE) -it -v $(pwd):/opt/app digital-impulse-reengage-test-e2e npm run product`

## To run the `INTERFACE` tests these `VARIABLES` are essential.

| Variables | Example | Description |
| ---- | ---- | ---- |
| `APP` | *cockpit* or *instore* | This parameter is tagged within the test class from app.
| `TEST_LEVEL` | *acceptance* or *flow* | This parameter is tagged within the test class from level test.
| `BROWSER` | *chrome* or *firefox* | Browser you want to test.
| `TYPE_DELIVERY` | *pickup* | This is the type delivery where the tests will be performed.

If you want to run `ACCEPTANCE` tests `IN DOCKER` container :

	`$ docker run -e TEAM=$(TEAM) -e SQUAD="$(SQUAD)" -e CLIENT=$(CLIENT) -e ENV=$(ENV) -e BROWSER=$(BROWSER) -e APP=$(APP) -e TEST_LEVEL=$(TEST_LEVEL) -e MENU=$(MENU) -it -v $(pwd):/opt/app digital-impulse-reengage-test-e2e npm run test_front`

If you want to run `PRODUCT` tests `IN DOCKER` container :

	`$ docker run -e TEAM=$(TEAM) -e SQUAD="$(SQUAD)" -e CLIENT=$(CLIENT) -e ENV=$(ENV) -e BROWSER=$(BROWSER) -e APP=$(APP) -e TEST_LEVEL=$(TEST_LEVEL) -e MENU=$(MENU) -it -v $(pwd):/opt/app digital-impulse-reengage-test-e2e npm run test_front`

If you want to run `FLOWS` tests `IN DOCKER` container :

	`$ docker run -e TEAM=$(TEAM) -e SQUAD="$(SQUAD)" -e CLIENT=$(CLIENT) -e ENV=$(ENV) -e BROWSER=$(BROWSER) -e APP=$(APP) -e TEST_LEVEL=$(TEST_LEVEL) -e MENU=$(MENU) -it -v $(pwd):/opt/app digital-impulse-reengage-test-e2e npm run test_front`

Reports format output : `root/reports/<env>.<app>.<typeTest>.<browser>.<client>.<timestamp>.html`

## Development

Clone repository : > `git clone https://github.com/chaordic/digital-impulse-reengage-test-e2e`

### Git flow ###

Should check if the branch `development` exists: > `$ git branch -a`

Should access and update the branch `development` : > `$ git fetch origin && git checkout -b development && git push origin development`

The branch name should always be the job id : > `$ git checkout -b NO_...`

The comment should have at the beginning the id of the task and then what it does : > `$ git commit -am "[NO-...] comment on your change"`

If the `development` branch is up to date : > `$ git checkout development && git pull origin development` 

It is necessary to perform the : > `$ git checkout NO_... && git rebase development`

Then just upload the changes made creating the PR always for the `development` branch : > `git push origin NO_...`

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

build: ## build the container
	docker build -t digital-impulse-reengage-test-e2e:latest .

ENV="production"
CLIENT=
PRIORITY_TEST=3
TYPE_DELIVERY="shipment"
BROWSER="chrome"
ENDPOINT="test"
MENU="test"
TOGGLES_TESTING="v1"

style-check:
	docker run -it digital-impulse-reengage-test-e2e npm run lint

frontend-cockpit-acceptance-logistics:
	BROWSER=$(BROWSER) ENV=$(ENV) APP=angularjs TOGGLES_TESTING=$(TOGGLES_TESTING) TEST_LEVEL=acceptance SQUAD=reengage CLIENT=qa MENU=$(MENU) protractor ./executors/protractor.conf.js

test-build-check-in-container:
	#docker run -e ENV=$(ENV) -e ENDPOINT=$(ENDPOINT) -e TOGGLES_TESTING=$(TOGGLES_TESTING) -it digital-impulse-reengage-test-e2e npm run backend:acceptance:manager
	#docker run -e ENV=$(ENV) -e BROWSER=$(BROWSER) -e TOGGLES_TESTING=$(TOGGLES_TESTING) -e APP=angularjs -e TEST_LEVEL=acceptance -e SQUAD=reengage -e CLIENT=qa -e MENU=test -it digital-impulse-reengage-test-e2e npm run test_front
	
test-build-check-out-container:
	npm run lint
	ENV=$(ENV) ENDPOINT=$(ENDPOINT) TOGGLES_TESTING=$(TOGGLES_TESTING) npm run backend:acceptance:manager
	#BROWSER=$(BROWSER) ENV=$(ENV) TOGGLES_TESTING=$(TOGGLES_TESTING) APP=angularjs TEST_LEVEL=acceptance SQUAD=reengage CLIENT=qa MENU=$(MENU) protractor ./executors/protractor.conf.js
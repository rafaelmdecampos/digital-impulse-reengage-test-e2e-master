FROM ramalhoes/test-e2e-protractor-mult-browser-jmeter-ubuntu-20.04:latest

# copy in our source code last, as it changes the most
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . /opt/app

# Install dependences and install protractor global and clear cache from npm and update webdriver-manager
RUN npm install -g \
    && npm install -g protractor \
    && npm cache clean --force \
    && webdriver-manager update

# Set the path to the global npm install directory.
ENV PATH /opt/app/node_modules/.bin:$PATH
const webdriver = require('selenium-webdriver');
async function prepareDriver() {
    let driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.manage().window().setRect({ width: 1920, height: 1080 });
    return driver;
}

module.exports = prepareDriver;

const { By, until} = require('selenium-webdriver');
const BasePage = require("../BasePage");

class LoginPage extends BasePage {
    data = {
        correct: {
            email: "test@test.com",
            password: "password"
        }
    }

    async visit() {
        await driver.get('http://bagisto.local/customer/login');
    }

    async getEmailInput(driver) {
        return driver.findElement(By.css('input[name=email]'));
    }

    async getPasswordInput(driver) {
        return driver.findElement(By.css('input[name=password]'));
    }

    async getSubmitButton(driver) {
        return driver.findElement(By.css('button[type=submit]'));
    }

    async login(credentials) {
        const emailInput = await this.getEmailInput(driver);
        const passwordInput = await this.getPasswordInput(driver);
        const submitButton = await this.getSubmitButton(driver);

        await emailInput.sendKeys(credentials.email);
        await passwordInput.sendKeys(credentials.password);
        await submitButton.click();
    }

    async visitProfilePage() {
        await driver.get('http://bagisto.local/customer/account/profile');
        // wait untill div.primary-button.rounded-2xl.px-11.py-3 is visible
        await driver.wait(until.elementLocated(By.css('div.primary-button.rounded-2xl.px-11.py-3')), 10000);
    }
}

module.exports = new LoginPage();

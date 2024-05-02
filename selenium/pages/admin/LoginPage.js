const { By } = require('selenium-webdriver');
const BasePage = require("../BasePage");

class LoginPage extends BasePage {
    data = {
        correct: {
            email: "admin@test.com",
            password: "password"
        }
    }

    async visit() {
        await driver.get('http://bagisto.local/admin/login');
    }

    async getEmailInput(driver) {
        return driver.findElement(By.css('input[name=email]'));
    }

    async getPasswordInput(driver) {
        return driver.findElement(By.css('input[name=password]'));
    }

    async getSubmitButton(driver) {
        return driver.findElement(By.css('button[aria-label="Sign In"]'));
    }

    async login(credentials) {
        const emailInput = await this.getEmailInput(driver);
        const passwordInput = await this.getPasswordInput(driver);
        const submitButton = await this.getSubmitButton(driver);

        await emailInput.sendKeys(credentials.email);
        await passwordInput.sendKeys(credentials.password);
        await submitButton.click();
    }
}

module.exports = new LoginPage();

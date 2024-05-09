const { By, until} = require('selenium-webdriver');
const BasePage = require("../BasePage");

class RegisterPage extends BasePage {
    data = {
        correct: {
            email: "test@test.com",
            password: "password"
        }
    }

    async visit() {
        await driver.get('http://bagisto.local/customer/register');
    }

    async register() {
        await driver.findElement(By.css('input[name=first_name]')).sendKeys('John');
        await driver.findElement(By.css('input[name=last_name]')).sendKeys('Doe')
        await driver.findElement(By.css('input[name=email]')).sendKeys(Math.random().toString(36).substring(7) + '@test.com');
        await driver.findElement(By.css('input[name=password]')).sendKeys('password');
        await driver.findElement(By.css('input[name=password_confirmation]')).sendKeys('password');
        await driver.findElement(By.css('button[type=submit]')).click();
        await driver.wait(until.elementLocated(By.css('div[style="background: rgb(212, 237, 218);"]'), 10000));
    }
}

module.exports = new RegisterPage();

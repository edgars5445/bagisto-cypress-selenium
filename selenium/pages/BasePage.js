const {By, until} = require("selenium-webdriver");

class BasePage {

    async assertSuccessToast(text = null) {
        await driver.wait(until.elementLocated(By.css('div[style="background: rgb(5, 150, 105);"]'), 10000));
        const successToast = await driver.findElement(By.css('div[style="background: rgb(5, 150, 105);"]'));
        const toastText = await successToast.getText();
        if(text)
            if (!toastText.includes(text)) {
                throw new Error("Success toast assertion failed.");
            }
    }
}

module.exports = BasePage;

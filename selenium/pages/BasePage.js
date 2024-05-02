const {By} = require("selenium-webdriver");

class BasePage {

    async assertSuccessToast(text) {
        const successToast = await driver.findElement(By.css('div[style="background: rgb(5, 150, 105);"]'));
        const toastText = await successToast.getText();
        if (!toastText.includes(text)) {
            throw new Error("Success toast assertion failed.");
        }
    }
}

module.exports = BasePage;

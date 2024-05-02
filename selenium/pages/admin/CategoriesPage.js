const { By, Key, until } = require('selenium-webdriver');
const BasePage = require("../BasePage");

class CategoriesPage extends BasePage {
    async clickCreateCategory() {
        const createCategoryButton = await driver.findElement(By.css('div[class="primary-button"'));
        await createCategoryButton.click();
    }

    async visit() {
        await driver.get('http://bagisto.local/admin/catalog/categories');
    }

    async assertCreateCategoryPage() {
        const currentUrl = await driver.getCurrentUrl();
        if (!currentUrl.includes('/admin/catalog/categories/create')) {
            throw new Error("Create category page assertion failed.");
        }
    }



    async createNewCategory(name, position = '1') {
        await this.clickCreateCategory();
        await this.assertCreateCategoryPage();

        // set category name
        const nameInput = await driver.findElement(By.css('input[name="name"]'));
        await nameInput.sendKeys(name);

        // set parent category to root
        const rootLabel = await driver.findElement(By.xpath('//div[@id=\'app\']/div[4]/div[2]/form/div[2]/div/div/div[2]/div/div/div/div/label/span'));
        await rootLabel.click();

        // set position passed in from the test
        const positionInput = await driver.findElement(By.css('input[name="position"]'));
        await positionInput.sendKeys(position);

        // make the category filterable by filters
        const filterLabels = await driver.findElements(By.css('label[class="cursor-pointer icon-uncheckbox peer-checked:icon-checked text-2xl peer-checked:text-blue-600"]'));
        await Promise.all(filterLabels.map(async (label) => {
            await label.click();
        }));

        // set category as visible
        const statusCheckbox = await driver.findElement(By.css('label[for="status"]'));
        await statusCheckbox.click();

        // set the display mode to products only
        const displayModeSelect = await driver.findElement(By.css('select[name="display_mode"]'));
        await displayModeSelect.sendKeys('products_only');

        // save the category
        const saveButton = await driver.findElement(By.xpath('//button[contains(text(), "Save Category")]'));
        await saveButton.click();

        // verify the category was created
        await driver.wait(until.urlContains('/admin/catalog/categories'));

        // verify the success message
        await this.assertSuccessToast('category created successfully.');
    }


    async deleteCategory() {
        // the new category is in the second row
        await driver.wait(until.elementLocated(By.css('.row:nth-child(2) .icon-uncheckbox')), 10000);

        // click the checkbox of row for mass delete
        await driver.findElement(By.css('.row:nth-child(2) .icon-uncheckbox')).click()

        // click the mass delete button and delete link
        await driver.findElement(By.css('.focus\\3Aring-black > span:nth-child(1)')).click();
        await driver.findElement(By.css('a.flex.whitespace-no-wrap.rounded-b.px-4')).click();

        // confirm the delete
        const confirmButton = await driver.findElement(By.xpath('//div[contains(text(), "Are you sure?")]/..//button[contains(text(), "Agree")]'));
        await confirmButton.click();

        // wait till the success toast element is visible
        await driver.wait(until.elementLocated(By.css('div[style="background: rgb(5, 150, 105);"]')));
    }
}

module.exports = new CategoriesPage();

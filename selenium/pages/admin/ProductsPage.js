const BasePage = require("../BasePage");
const {By, until} = require("selenium-webdriver");

class ProductsPage extends BasePage {

    async visit() {
        await driver.get('http://bagisto.local/admin/catalog/products')
    }

    async fillCreateProductModal() {
        await driver.findElement(By.css('select[name="type"]')).sendKeys('simple')
        // wait until this field is visible select[name="attribute_family_id"]
        await driver.wait(until.elementLocated(By.css('select[name="attribute_family_id"]')), 10000);
        await driver.findElement(By.css('select[name="attribute_family_id"]')).sendKeys('Default');
        await driver.findElement(By.css('input[name="sku"]')).sendKeys('sku' + Math.floor(Math.random() * 1000000));
        await driver.findElement(By.css('div.flex.items-center button[type=submit].primary-button')).click();
    }
    async fillProductDataFields(productName) {
        // wait until the first element is visible
        await driver.wait(until.elementLocated(By.css('input[name="name"]')), 10000);

        // proceed with filling all the mandatory fields
        await driver.findElement(By.css('input[name="name"]')).sendKeys(productName);
        await driver.findElement(By.css('input[name="price"]')).sendKeys('100')
        await driver.findElement(By.css('input[name="weight"]')).sendKeys('1');
        await driver.findElement(By.css('label[for="status"]')).click();
        await driver.findElement(By.css('label[for="visible_individually"]')).click();
        // click on the first category
        await driver.findElement(By.css('div.active.v-tree-item label')).click();

        await driver.findElement(By.css('textarea#short_description')).sendKeys('short description');
        await driver.findElement(By.css('textarea#description')).sendKeys('description');
    }

    async createNewProduct(productName) {
        await this.visit();
        await driver.findElement(By.css('div button.primary-button')).click();
        await this.fillCreateProductModal();
        driver.wait(until.urlContains('/admin/catalog/products/edit/'), 10000);

        await this.fillProductDataFields(productName);

        // scroll to top and click div button.primary-button
        await driver.executeScript("window.scrollTo(0, 0)");
        await driver.findElement(By.css('div button.primary-button')).click();

        await this.assertSuccessToast('Product updated successfully');

        // navigate to /productName
        await driver.get('http://bagisto.local/' + productName);
        await driver.wait(until.elementLocated(By.css('div[aria-label="Add To Wishlist"]')), 10000);

        await this.visit();

    }

    async deleteProduct() {
        await this.visit();
        await driver.wait(until.elementLocated(By.css('label.icon-uncheckbox')), 10000);
        await driver.findElement(By.css('label.icon-uncheckbox')).click();
        await driver.findElement(By.css('.focus\\3Aring-black > span:nth-child(1)')).click();
        await driver.findElement(By.css('a.flex.whitespace-no-wrap.rounded-b.px-4')).click();
        await driver.wait(until.elementLocated(By.css('div.flex.justify-end button.primary-button')), 10000);
        await driver.findElement(By.css('div.flex.justify-end button.primary-button')).click();
    }
}

module.exports = new ProductsPage();

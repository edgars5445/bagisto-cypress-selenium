const CategoriesPage = require('../../pages/admin/CategoriesPage');
const LoginPage = require('../../pages/admin/LoginPage');
const ProductsPage = require('../../pages/admin/ProductsPage');
const prepareDriver = require("../../global/prepareDriver");
const fs = require("fs");

describe('Admin panel tests', function(){
    this.timeout(50000);

    before(async function(){
        global.driver = await prepareDriver();
        await LoginPage.visit()
        await LoginPage.login(LoginPage.data.correct)
    });

    it('Create and delete product', async function(){
        let randomProductName = Math.random().toString(36).substring(7);
        await ProductsPage.createNewProduct(randomProductName);
        await ProductsPage.deleteProduct();
    })

    afterEach(async function(){
        const test = this.currentTest;
        fs.appendFileSync('create_and_delete_product.txt', `${test.duration}\n`);
        await driver.quit();
    });

})

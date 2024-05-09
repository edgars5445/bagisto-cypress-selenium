const CategoriesPage = require('../../pages/admin/CategoriesPage');
const LoginPage = require('../../pages/admin/LoginPage');
const ProductsPage = require('../../pages/admin/ProductsPage');
const prepareDriver = require("../../global/prepareDriver");
const fs = require("fs");

describe('Admin panel tests', function(){
    before(async function(){
        global.driver = await prepareDriver();
        await LoginPage.visit()
        await LoginPage.login(LoginPage.data.correct)
    });

    it('Should create a category and create a product which is associated to this category', async function(){
        let randomCategoryName = Math.random().toString(36).substring(7);
        let randomCategoryPosition = Math.floor(Math.random() * 1000);
        await CategoriesPage.createNewCategory(randomCategoryName, randomCategoryPosition)
        let randomProductName = Math.random().toString(36).substring(7);
        await ProductsPage.createNewProduct(randomProductName);
        await CategoriesPage.deleteCategory(randomCategoryName);
        await ProductsPage.deleteProduct();
    })

    after(async function(){
        const test = this.currentTest;
        fs.appendFileSync('category_product_combination.txt', `${test.duration}\n`);
        await driver.quit();
    });

})

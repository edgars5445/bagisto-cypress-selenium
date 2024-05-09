const CategoriesPage = require('../../pages/admin/CategoriesPage');
const LoginPage = require('../../pages/admin/LoginPage');
const ProductsPage = require('../../pages/admin/ProductsPage');
const prepareDriver = require("../../global/prepareDriver");
const fs = require("fs");

describe('Admin panel tests', function(){
    this.timeout(50000);

    beforeEach(async function(){
        global.driver = await prepareDriver();
    });

    it('Login with correct credentials', async function(){
        await LoginPage.visit()
        await LoginPage.login(LoginPage.data.correct)
    })

    it('Create and delete category', async function(){
        await LoginPage.visit()
        await LoginPage.login(LoginPage.data.correct)
        await CategoriesPage.visit()
        let randomName = Math.random().toString(36).substring(7);
        let randomPosition = Math.floor(Math.random() * 1000);
        await CategoriesPage.createNewCategory(randomName, randomPosition)
        await CategoriesPage.deleteCategory(randomName)
    })

    it('Create and delete product', async function(){
        await LoginPage.visit()
        await LoginPage.login(LoginPage.data.correct)
        await ProductsPage.visit()
        let randomCategoryName = Math.random().toString(36).substring(7);
        let randomCategoryPosition = Math.floor(Math.random() * 1000);
        await CategoriesPage.createNewCategory(randomCategoryName, randomCategoryPosition)
        let randomProductName = Math.random().toString(36).substring(7);
        await ProductsPage.createNewProduct(randomCategoryName, randomProductName);
        await ProductsPage.deleteProduct();
        await CategoriesPage.deleteCategory(randomCategoryName);
    })

    it.only('Should create a category and create a product which is associated to this category', async function(){
        await LoginPage.visit()
        await LoginPage.login(LoginPage.data.correct)
        let randomCategoryName = Math.random().toString(36).substring(7);
        let randomCategoryPosition = Math.floor(Math.random() * 1000);
        await CategoriesPage.createNewCategory(randomCategoryName, randomCategoryPosition)
        let randomProductName = Math.random().toString(36).substring(7);
        await ProductsPage.createNewProduct(randomCategoryName, randomProductName);
        await CategoriesPage.deleteCategory(randomCategoryName);
        await ProductsPage.deleteProduct();
    })

    afterEach(async function(){
        const test = this.currentTest;
        fs.appendFileSync('category_product_combination.txt', `${test.duration}\n`);
        await driver.quit();
    });

})

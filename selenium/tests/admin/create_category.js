const CategoriesPage = require('../../pages/admin/CategoriesPage');
const LoginPage = require('../../pages/admin/LoginPage');
const prepareDriver = require("../../global/prepareDriver");
const fs = require("fs");

describe('Admin panel tests', function(){
    before(async function(){
        global.driver = await prepareDriver();
        await LoginPage.visit()
        await LoginPage.login(LoginPage.data.correct)
    });

    it('Create and delete category', async function(){
        await CategoriesPage.visit()
        let randomName = Math.random().toString(36).substring(7);
        let randomPosition = Math.floor(Math.random() * 1000);
        await CategoriesPage.createNewCategory(randomName, randomPosition)
        await CategoriesPage.deleteCategory(randomName)
    })

    after(async function(){
        const test = this.currentTest;
        fs.appendFileSync('create_and_delete_category.txt', `${test.duration}\n`);
        await driver.quit();
    });

})

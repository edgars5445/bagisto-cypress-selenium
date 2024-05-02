const CategoriesPage = require('../pages/admin/CategoriesPage');
const LoginPage = require('../pages/admin/LoginPage');
const prepareDriver = require("../global/prepareDriver");

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

    afterEach(async function(){
        await driver.quit();
    });

})

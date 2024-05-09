const LoginPage = require('../../pages/admin/LoginPage');
const prepareDriver = require("../../global/prepareDriver");
const fs = require("fs");

describe('Admin panel tests', function(){
    this.timeout(50000);

    before(async function(){
        global.driver = await prepareDriver();
    });

    it('Login with correct credentials', async function(){
        await LoginPage.visit()
        await LoginPage.login(LoginPage.data.correct)
    })

    afterEach(async function(){
        const test = this.currentTest;
        fs.appendFileSync('admin_login.txt', `${test.duration}\n`);
        await driver.quit();
    });

})

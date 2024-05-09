const prepareDriver = require("../../global/prepareDriver");

const LoginPage = require('../../pages/frontend/LoginPage');
const RegisterPage = require('../../pages/frontend/RegisterPage');
const fs = require('fs');



describe('Admin panel tests', function(){
    this.timeout(50000);

    before(async function(){
        global.driver = await prepareDriver();
    });

    it('Should login successfully', async () => {
        await LoginPage.visit();
        await LoginPage.login(LoginPage.data.correct);
        await LoginPage.visitProfilePage();
    })

    after(async function(){
        // console log test execution time
        const test = this.currentTest;
        fs.appendFileSync('login.txt', `${test.duration}\n`);
        await driver.quit();
    });

})

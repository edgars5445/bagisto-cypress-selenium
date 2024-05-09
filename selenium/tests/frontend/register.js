const prepareDriver = require("../../global/prepareDriver");

const RegisterPage = require('../../pages/frontend/RegisterPage');
const fs = require('fs');

describe('Admin panel tests', function(){
    this.timeout(50000);

    before(async function(){
        global.driver = await prepareDriver();
    });

    it('Should Register customer account successfully', async () => {
        await RegisterPage.visit();
        await RegisterPage.register();
    })

    afterEach(async function(){
        // console log test execution time
        const test = this.currentTest;
        fs.appendFileSync('register.txt', `${test.duration}\n`);
        await driver.quit();
    });

})

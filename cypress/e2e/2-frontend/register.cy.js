import {RegisterPage} from "../../pages/frontend/RegisterPage";

let startTime = new Date().getTime();

const FrontendRegisterPage = new RegisterPage();

describe('Create a new product and assert that it is visible', () => {
    before(() => {
        startTime = new Date().getTime();
    });


    it.only('Should create an account successfully', () => {
        FrontendRegisterPage.visit();
        FrontendRegisterPage.register();
    })

    after(() => {
        cy.log('Test duration: ' + (new Date().getTime() - startTime) + 'ms');
    });
})

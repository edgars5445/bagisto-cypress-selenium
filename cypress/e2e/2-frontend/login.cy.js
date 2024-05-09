import {LoginPage} from "../../pages/frontend/LoginPage";

let startTime = new Date().getTime();
const FrontendLoginPage = new LoginPage();

describe('Create a new product and assert that it is visible', () => {
    before(() => {
        startTime = new Date().getTime();
    });


    it('Should login successfully', () => {
        FrontendLoginPage.visit();
        FrontendLoginPage.login(FrontendLoginPage.data.correct);
        FrontendLoginPage.visitProfile();
    });

    after(() => {
        cy.log('Test duration: ' + (new Date().getTime() - startTime) + 'ms');
    });
})

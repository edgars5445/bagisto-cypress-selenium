import {LoginPage} from "../../pages/admin/LoginPage";
import { CategoriesPage } from "../../pages/admin/CategoriesPage";

const AdminLoginPage = new LoginPage();
const AdminCategoriesPage = new CategoriesPage();
let startTime = new Date().getTime();
describe('Create a new product and assert that it is visible', () => {
    before(() => {
        startTime = new Date().getTime();
        AdminLoginPage.visit();
        AdminLoginPage.login(AdminLoginPage.data.correct);
    });

    it('Should create category and assert that it is visible and delete it', () => {
        // generate random name and position
        let randomName = Math.random().toString(36).substring(7);
        let randomPosition = Math.floor(Math.random() * 1000);

        AdminCategoriesPage.createNewCategory(randomName, randomPosition);
        AdminCategoriesPage.deleteCategory(randomName);
    })

    after(() => {
        cy.log('Test duration: ' + (new Date().getTime() - startTime) + 'ms');
    });
})

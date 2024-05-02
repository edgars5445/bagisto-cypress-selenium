import {LoginPage} from "../pages/admin/LoginPage";
import { CategoriesPage } from "../pages/admin/CategoriesPage";
import {ProductsPage} from "../pages/admin/ProductsPage";

const AdminLoginPage = new LoginPage();
const AdminCategoriesPage = new CategoriesPage();
const AdminProductsPage = new ProductsPage();
let startTime = new Date().getTime();
describe('Create a new product and assert that it is visible', () => {
    before(() => {
        cy.clearCookies();
        AdminLoginPage.visit();
        AdminLoginPage.login(AdminLoginPage.data.correct);
    });

    beforeEach(() => {
        startTime = new Date().getTime();
    });

    it('Open dashboard', () => {
        cy.url().should('include', '/admin/dashboard');
    });

    it('Should create category and assert that it is visible and delete it', () => {
        // generate random name and position
        let randomName = Math.random().toString(36).substring(7);
        let randomPosition = Math.floor(Math.random() * 1000);

        AdminCategoriesPage.createNewCategory(randomName, randomPosition);
        AdminCategoriesPage.deleteCategory(randomName);
    })

    it.only('Should create a category and create a product which is associated to this category', () => {
        AdminCategoriesPage.visit();
        // // generate random name and position
        let randomCategoryName = Math.random().toString(36).substring(7);
        let randomCategoryPosition = Math.floor(Math.random() * 1000);
        //
        AdminCategoriesPage.createNewCategory(randomCategoryName, randomCategoryPosition);

        let randomProductName = Math.random().toString(36).substring(7);
        AdminProductsPage.createNewProduct(randomCategoryName, randomProductName);
        AdminProductsPage.deleteProduct(randomProductName);
        AdminCategoriesPage.visit();
        AdminCategoriesPage.deleteCategory(randomCategoryName);
    })

    afterEach(() => {
        cy.log('Test duration: ' + (new Date().getTime() - startTime) + 'ms');
    });
})

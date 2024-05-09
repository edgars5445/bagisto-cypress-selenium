// import {LoginPage} from "../../pages/admin/LoginPage";
// import { CategoriesPage } from "../../pages/admin/CategoriesPage";
// import {ProductsPage} from "../../pages/admin/ProductsPage";
//
// const AdminLoginPage = new LoginPage();
// const AdminCategoriesPage = new CategoriesPage();
// const AdminProductsPage = new ProductsPage();
// let startTime = new Date().getTime();
// describe('Create a new product and assert that it is visible', () => {
//     beforeEach(() => {
//         startTime = new Date().getTime();
//         AdminLoginPage.visit();
//         AdminLoginPage.login(AdminLoginPage.data.correct);
//     });
//
//
//     it('Open dashboard', () => {
//         cy.url().should('include', '/admin/dashboard');
//     });
//
//     it('Should create category and assert that it is visible and delete it', () => {
//         // generate random name and position
//         let randomName = Math.random().toString(36).substring(7);
//         let randomPosition = Math.floor(Math.random() * 1000);
//
//         AdminCategoriesPage.createNewCategory(randomName, randomPosition);
//         AdminCategoriesPage.deleteCategory(randomName);
//     })
//
//     it('Should create a category and create a product which is associated to this category', () => {
//         // // generate random name and position
//         let randomCategoryName = Math.random().toString(36).substring(7);
//         let randomCategoryPosition = Math.floor(Math.random() * 1000);
//         //
//         AdminCategoriesPage.createNewCategory(randomCategoryName, randomCategoryPosition);
//
//         let randomProductName = Math.random().toString(36).substring(7);
//         AdminProductsPage.createNewProduct(randomProductName);
//         AdminProductsPage.deleteProduct(randomProductName);
//         AdminCategoriesPage.deleteCategory(randomCategoryName);
//     })
//
//     afterEach(() => {
//         cy.log('Test duration: ' + (new Date().getTime() - startTime) + 'ms');
//     });
// })

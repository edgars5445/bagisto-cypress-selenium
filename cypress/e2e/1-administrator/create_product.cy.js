import {LoginPage} from "../../pages/admin/LoginPage";
import {ProductsPage} from "../../pages/admin/ProductsPage";

const AdminLoginPage = new LoginPage();
const AdminProductsPage = new ProductsPage();
let startTime = new Date().getTime();
describe('Create a new product and assert that it is visible', () => {
    before(() => {
        startTime = new Date().getTime();
        AdminLoginPage.visit();
        AdminLoginPage.login(AdminLoginPage.data.correct);
    });


    it('Should create and delete product', () => {
        let randomProductName = Math.random().toString(36).substring(7);
        AdminProductsPage.createNewProduct(randomProductName);
        AdminProductsPage.deleteProduct(randomProductName);
    })

    after(() => {
        cy.log('Test duration: ' + (new Date().getTime() - startTime) + 'ms');
    });
})

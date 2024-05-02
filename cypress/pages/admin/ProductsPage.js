export class ProductsPage {

    elements = {

    }

    visit() {
        cy.visit("/admin/catalog/products");
    }

    clickOnButton(selector, text) {
        return cy.get(selector).contains(text).click();
    }

    fillCreateProductModal() {
        cy.get('div')
            .contains('Create New Product')
            .parent()
            .parent()
            .within(() => {
                cy.get('select[name="type"]').select('simple');
                cy.get('select[name="attribute_family_id"]').select('1');
                cy.get('input[name="sku"]').type('sku' + Math.floor(Math.random() * 100000));
                cy.get('button[class="primary-button"]').click();
            })
    }

    fillProductDataFields(productName, categoryName) {
        cy.get('input[name="name"]').type(productName);
        cy.get('input[name="price"]').type('100');
        cy.get('input[name="weight"]').type('1');
        cy.get('label[for="status"]').click();
        cy.get('label[for="visible_individually"]').click();
        cy.get('label').contains(categoryName).click();
        this.updateTinyMceField('description_ifr', 'longer description');
        this.updateTinyMceField('short_description_ifr', 'short description');
    }

    createNewProduct(categoryName, productName) {
        this.clickOnButton('button', 'Create Product');
        this.fillCreateProductModal();

        cy.url().should('include', '/admin/catalog/products/edit/');

        this.fillProductDataFields(productName, categoryName);
        this.clickOnButton('button[class="primary-button"]', 'Save Product');

        cy.assertSuccessToast('Product updated successfully');

        // check if product is available on the storefront
        cy.visit("/" + productName).then(() => {
            cy.get('div.glow-404').should('not.exist');
        });

        this.visit();
    }

    deleteProduct(productName) {
        cy.get('p').contains(productName).parent().parent().within(() => {
            cy.get('label').click();
        })

        cy.get('a').contains('Delete').click({force: true});
        cy.get('button[class="primary-button"]').contains('Agree').click();
    }

    updateTinyMceField(id, content) {
        this.getIframeBody(id).click().type(content);
    }

    getIframeDocument(identifier) {
        return cy
            .get(`iframe[id="${identifier}"]`)
            .its('0.contentDocument').should('exist')
    }

    getIframeBody(identifier) {
        return this.getIframeDocument(identifier)
            .its('body').should('not.be.undefined')
            .then(cy.wrap)
    }

}

export default new ProductsPage();


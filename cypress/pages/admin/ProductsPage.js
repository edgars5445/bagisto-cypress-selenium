export class ProductsPage {

    elements = {

    }

    visit() {
        cy.visit("/admin/catalog/products");
    }

    fillCreateProductModal() {
        cy.get('div.flex div.box-shadow.absolute')
            .within(() => {
                cy.get('select[name="type"]').select('simple');
                cy.get('select[name="attribute_family_id"]').select('1');
                cy.get('input[name="sku"]').type('sku' + Math.floor(Math.random() * 100000), {delay: 0});
                cy.get('button[class="primary-button"]').click();
            })
    }

    fillProductDataFields(productName) {
        cy.get('input[name="name"]').type(productName, {delay: 0});
        cy.get('input[name="price"]').type('100', {delay: 0});
        cy.get('input[name="weight"]').type('1', {delay: 0});
        cy.get('label[for="status"]').click();
        cy.get('label[for="visible_individually"]').click();

        // assign the product first category
        cy.get('div.active.v-tree-item label').click();
        cy.get('textarea#short_description').type('short description', {delay: 0});
        cy.get('textarea#description').type('description', {delay: 0});
    }

    createNewProduct(productName) {
        this.visit();
        cy.get('div button.primary-button').click();
        this.fillCreateProductModal();

        cy.url().should('include', '/admin/catalog/products/edit/');

        this.fillProductDataFields(productName);
        cy.get('div button.primary-button').click();

        cy.assertSuccessToast('Product updated successfully');

        // check if product is available on the storefront
        cy.visit("/" + productName).then(() => {
            cy.get('div.glow-404').should('not.exist');
        });

        this.visit();
    }

    deleteProduct(productName) {
        cy.get('div.flex.gap-2\\.5 p.text-base').contains(productName).parent().parent().within(() => {
            cy.get('label').click();
        })
        cy.get('.focus\\3Aring-black > span:nth-child(1)').click();
        cy.get('a.flex.whitespace-no-wrap.rounded-b.px-4').click();
        cy.get('div.flex.justify-end button.primary-button').click();
    }

}

export default new ProductsPage();


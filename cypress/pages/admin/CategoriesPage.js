export class CategoriesPage {
    visit() {
        cy.visit("/admin/catalog/categories");
    }

    clickCreateCategory() {
        cy.get('div[class="primary-button"').contains('Create Category').click();
    }

    createNewCategory(name, position = '1') {
        this.visit();
        this.clickCreateCategory();

        // set category name
        cy.get('input[name="name"]').type(name,{ delay: 0 });

        // set parent category to root
        // select by xpath
        cy.get('i.icon-folder + label').click();


        // set position passed in from the test
        cy.get('input[name="position"]').type(position,{ delay: 0 });

        // make the category filterable by filters
        cy.get('label[class="cursor-pointer icon-uncheckbox peer-checked:icon-checked text-2xl peer-checked:text-blue-600"]')
            .click({ multiple: true });

        // set category as visible
        cy.get('label[for="status"]').click();

        // set the display mode to products only
        cy.get('select[name="display_mode"]').select('products_only');

        // save the category
        cy.get('button.primary-button').click();

        // verify the category was created
        cy.url().should('include', '/admin/catalog/categories');

        // get element by classes fixed top-5 z-[10002] grid justify-items-end and verify that there is a success message
        cy.assertSuccessToast('category created successfully.');

        // verify the category exists in the list
        cy.get('div[class="group/container sidebar-not-collapsed flex gap-4"]')
            .contains(name)
            .should('exist');
    }

    deleteCategory(name) {
        this.visit();
        // find the category in the list
        cy.get('.row:nth-child(2) .icon-uncheckbox').click();

        cy.get('.focus\\3Aring-black > span:nth-child(1)').click();
        cy.get('a.flex.whitespace-no-wrap.rounded-b.px-4').click();

        cy.get('div.flex.justify-end button.primary-button').click();

        // verify the category was deleted
        cy.get('div[style="background: rgb(5, 150, 105);"]').should('exist');
    }
}

export default new CategoriesPage();


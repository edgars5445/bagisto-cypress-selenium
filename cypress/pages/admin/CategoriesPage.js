export class CategoriesPage {
    visit() {
        cy.visit("/admin/catalog/categories");
    }

    clickCreateCategory() {
        cy.get('div[class="primary-button"').contains('Create Category').click();
    }

    assertCreateCategoryPage() {
        cy.url().should('include', '/admin/catalog/categories/create');
    }

    createNewCategory(name, position = '1') {
        this.clickCreateCategory();
        this.assertCreateCategoryPage();

        // set category name
        cy.get('input[name="name"]').type(name);

        // set parent category to root
        cy.get('div')
            .contains('Parent Category')
            .parent('div')
            .within(() => {
                cy.get('label').contains('Root').click();
            });


        // set position passed in from the test
        cy.get('input[name="position"]').type(position);

        // make the category filterable by filters
        cy.get('label[class="cursor-pointer icon-uncheckbox peer-checked:icon-checked text-2xl peer-checked:text-blue-600"]')
            .click({ multiple: true });

        // set category as visible
        cy.get('label[for="status"]').click();

        // set the display mode to products only
        cy.get('select[name="display_mode"]').select('products_only');

        // save the category
        cy.get('button[type="submit"]').contains('Save Category').click();

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
        // find the category in the list
        cy.get('div[class="group/container sidebar-not-collapsed flex gap-4"]')
            .contains(name)
            .parent('div')
            .within(() => {
                // click the delete button
                cy.get('.icon-delete').click();
            });

        cy.get('div').contains('Are you sure?').parent('div').within(() => {
            // confirm the delete
            cy.get('button[class="primary-button"]').contains('Agree').click();
        });

        // verify the category was deleted
        cy.get('div[style="background: rgb(5, 150, 105);"]')
            .contains('The category has been successfully deleted.')
            .should('exist');
    }
}

export default new CategoriesPage();


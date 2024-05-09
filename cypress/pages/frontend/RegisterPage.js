export class RegisterPage {

    elements = {
        firstName: "input[name=first_name]",
        lastName: "input[name=last_name]",
        email: "input[name=email]",
        password: "input[name=password]",
        confirmPassword: "input[name=password_confirmation]",
        submit: "button[type=submit]",
    }

    visit() {
        cy.visit("/customer/register");
    }

    clickSubmitButton() {
        return cy.get(this.elements.submit).click();
    }

    register() {
        this.visit();
        cy.get(this.elements.firstName).type("John", {delay: 0});
        cy.get(this.elements.lastName).type("Doe", {delay: 0});
        cy.get(this.elements.email).type(Math.random().toString(36).substring(7) + "@example.com", {delay: 0});
        cy.get(this.elements.password).type('password', {delay: 0});
        cy.get(this.elements.confirmPassword).type('password', {delay: 0});
        this.clickSubmitButton();
        cy.get('div[style="background: rgb(212, 237, 218);"]')
            .contains('Account created successfully.')
            .should('exist');
    }
}

export default new RegisterPage();


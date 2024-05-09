export class LoginPage {

    elements = {
        email: "input[name=email]",
        password: "input[name=password]",
        submit: "button[type=submit]",
    }

    data = {
        correct: {
            email: "test@test.com",
            password: "password"
        },
        incorrect: {
            email: "test@test.com",
            password: "wrongpassword"
        }
    }

    visit() {
        cy.visit("/customer/login");
    }

    getEmail() {
        return cy.get(this.elements.email);
    }

    getPassword() {
        return cy.get(this.elements.password);
    }

    clickSubmitButton() {
        return cy.get(this.elements.submit).click();
    }

    login(credentials) {
        this.getEmail().type(credentials.email, {delay: 0});
        this.getPassword().type(credentials.password, {delay: 0});
        this.clickSubmitButton();
    }

    visitProfile() {
        cy.visit('/customer/account/profile')
        cy.get('div.primary-button.rounded-2xl.px-11.py-3').should('exist');
    }
}

export default new LoginPage();


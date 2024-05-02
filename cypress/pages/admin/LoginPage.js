export class LoginPage {

    elements = {
        email: "input[name=email]",
        password: "input[name=password]",
        submit: "button[aria-label=\"Sign In\"]",
    }

    data = {
        correct: {
            email: "admin@test.com",
            password: "password"
        },
        incorrect: {
            email: "test@test.com",
            password: "wrongpassword"
        }
    }

    visit() {
        cy.visit("/admin/login");
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
}

export default new LoginPage();


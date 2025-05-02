Cypress.Commands.add('uiLogin', (email: string, password: string) => {
  // Open Drawer Menu
  cy.get('[data-testid=drawer-menu-btn]').click();

  // Open login form
  cy.get('[data-testid=open-account-btn]').click();

  // Login
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();

  // Close Drawer Menu when login dialog is closed
  cy.get('[data-testid=login-form]').should('not.exist');
  cy.get('.MuiBackdrop-root').click({ force: true });
});

declare namespace Cypress {
  interface Chainable {
    uiLogin(email: string, password: string): Chainable<void>;
  }
}

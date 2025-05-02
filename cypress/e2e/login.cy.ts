describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should successfully log in via drawer login form', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Outbox and Following should be diabled
    cy.get('[data-testid=outbox-btn]').should('have.attr', 'aria-disabled');
    cy.get('[data-testid=following-btn]').should('have.attr', 'aria-disabled');

    // Open login form
    cy.get('[data-testid=open-account-btn]').click();

    // Login
    cy.get('input[name="email"]').type('user1@example.com');
    cy.get('input[name="password"]').type('Password-1');
    cy.get('button[type="submit"]').click();

    // Outbox and Following should be enabled
    cy.get('[data-testid=outbox-btn]').should('not.be.disabled');
    cy.get('[data-testid=following-btn]').should('not.be.disabled');

    // Open Account Dialog
    cy.get('[data-testid=open-account-btn]').click();

    // Account and Username should be displayed
    cy.contains(/account/i).should('be.visible');
    cy.get('[data-testid=account-username]').should('have.text', 'User 1');

    // Logout
    cy.get('button[data-testid=logout-btn]').click();

    // Outbox and Following should be diabled
    cy.get('[data-testid=outbox-btn]').should('have.attr', 'aria-disabled');
    cy.get('[data-testid=following-btn]').should('have.attr', 'aria-disabled');
  });

  it('shows error for invalid credentials', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open login form
    cy.get('[data-testid=open-account-btn]').click();

    // Login
    cy.get('input[name="email"]').type('user1@example.com');
    cy.get('input[name="password"]').type('Wrong-Password-1234');
    cy.get('button[type="submit"]').click();

    // Invalid credentials
    cy.contains(/invalid login credentials/i).should('be.visible');
  });

  it('shows error for missing password', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open login form
    cy.get('[data-testid=open-account-btn]').click();

    // Login
    cy.get('input[name="email"]').type('user1@example.com');
    cy.get('button[type="submit"]').should('be.disabled');

    // Empty password
    cy.get('input[name="password"]').focus().blur();
    cy.contains(/password is required/i).should('be.visible');
  });

  it('shows error for missing email', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open login form
    cy.get('[data-testid=open-account-btn]').click();

    // Login
    cy.get('input[name="password"]').type('Password-1');
    cy.get('button[type="submit"]').should('be.disabled');

    // Empty email
    cy.get('input[name="email"]').focus().blur();
    cy.contains(/email is required/i).should('be.visible');
  });

  it('shows error for invalid email', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open login form
    cy.get('[data-testid=open-account-btn]').click();

    // Login
    cy.get('input[name="email"]').type('notemail');
    cy.get('button[type="submit"]').should('be.disabled');

    // Invalid email
    cy.contains(/please enter a valid email address/i).should('be.visible');
  });
});

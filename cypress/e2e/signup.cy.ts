describe('Sign up', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it.only('should successfully sign up via drawer sign up form', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Outbox and Following should be diabled
    cy.get('[data-testid=outbox-btn]').should('have.attr', 'aria-disabled');
    cy.get('[data-testid=following-btn]').should('have.attr', 'aria-disabled');

    // Open sign up form
    cy.get('[data-testid=open-account-btn]').click();
    cy.get('[data-testid=tab-1]')
      .contains(/register/i)
      .click();

    // Signup
    cy.get('input[name="username"]').type('New User');
    cy.get('input[name="email"]').type('new-user@example.com');
    cy.get('input[name="password"]').type('Password-New-User-1');
    cy.get('input[name="passwordConfirm"]').type('Password-New-User-1');
    cy.get('#license-key-upload-button input[type="file"]')
      .should('exist')
      .and('have.attr', 'accept', 'text/plain')
      .selectFile(
        {
          contents: Buffer.from('66666666-6666-6666-6666-666666666666'),
          fileName: 'test-license-key.txt',
          mimeType: 'text/plain',
        },
        { force: true },
      );

    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.get('button[type="submit"]').click();

    // Outbox and Following should be enabled
    cy.get('[data-testid=outbox-btn]').should('not.be.disabled');
    cy.get('[data-testid=following-btn]').should('not.be.disabled');

    // Open Account Dialog
    cy.get('[data-testid=open-account-btn]').click();

    // Account and Username should be displayed
    cy.contains(/account/i).should('be.visible');
    cy.get('[data-testid=account-username]').should('have.text', 'New User');

    // Logout
    cy.get('button[data-testid=logout-btn]').click();

    // Outbox and Following should be diabled
    cy.get('[data-testid=outbox-btn]').should('have.attr', 'aria-disabled');
    cy.get('[data-testid=following-btn]').should('have.attr', 'aria-disabled');

    // Should be able to login as new user
    cy.get('.MuiBackdrop-root').click({ force: true });
    cy.uiLogin('new-user@example.com', 'Password-New-User-1');

    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open Account Dialog
    cy.get('[data-testid=open-account-btn]').click();

    // Account and Username should be displayed
    cy.contains(/account/i).should('be.visible');
    cy.get('[data-testid=account-username]').should('have.text', 'New User');
  });

  it('shows error for missing username', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open sign up form
    cy.get('[data-testid=open-account-btn]').click();
    cy.get('[data-testid=tab-1]')
      .contains(/register/i)
      .click();

    // Sign up
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="email"]').type('new-user@example.com');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="password"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="passwordConfirm"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#license-key-upload-button input[type="file"]')
      .should('exist')
      .and('have.attr', 'accept', 'text/plain')
      .selectFile(
        {
          contents: Buffer.from('66666666-6666-6666-6666-666666666666'),
          fileName: 'test-license-key.txt',
          mimeType: 'text/plain',
        },
        { force: true },
      );
    cy.get('button[type="submit"]').should('be.disabled');

    // Empty username
    cy.get('input[name="username"]').focus().blur();
    cy.contains(/username is required/i).should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');

    // Enter username and enable button
    cy.get('input[name="username"]').type('New User');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('shows error for missing email', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open sign up form
    cy.get('[data-testid=open-account-btn]').click();
    cy.get('[data-testid=tab-1]')
      .contains(/register/i)
      .click();

    // Sign up
    cy.get('input[name="username"]').type('New User');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="password"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="passwordConfirm"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#license-key-upload-button input[type="file"]')
      .should('exist')
      .and('have.attr', 'accept', 'text/plain')
      .selectFile(
        {
          contents: Buffer.from('66666666-6666-6666-6666-666666666666'),
          fileName: 'test-license-key.txt',
          mimeType: 'text/plain',
        },
        { force: true },
      );
    cy.get('button[type="submit"]').should('be.disabled');

    // Empty email
    cy.get('input[name="email"]').focus().blur();
    cy.contains(/email is required/i).should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');

    // Enter email and enable button
    cy.get('input[name="email"]').type('new-user@example.com');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('shows error for missing password', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open sign up form
    cy.get('[data-testid=open-account-btn]').click();
    cy.get('[data-testid=tab-1]')
      .contains(/register/i)
      .click();

    // Sign up
    cy.get('input[name="username"]').type('New User');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="email"]').type('new-user@example.com');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="passwordConfirm"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#license-key-upload-button input[type="file"]')
      .should('exist')
      .and('have.attr', 'accept', 'text/plain')
      .selectFile(
        {
          contents: Buffer.from('66666666-6666-6666-6666-666666666666'),
          fileName: 'test-license-key.txt',
          mimeType: 'text/plain',
        },
        { force: true },
      );
    cy.get('button[type="submit"]').should('be.disabled');

    // Empty password
    cy.get('input[name="password"]').focus().blur();
    cy.contains(/password is required/i).should('be.visible');

    // Enter password and enable button
    cy.get('input[name="password"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('shows error for missing password confirmation', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open sign up form
    cy.get('[data-testid=open-account-btn]').click();
    cy.get('[data-testid=tab-1]')
      .contains(/register/i)
      .click();

    // Sign up
    cy.get('input[name="username"]').type('New User');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="email"]').type('new-user@example.com');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="password"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#license-key-upload-button input[type="file"]')
      .should('exist')
      .and('have.attr', 'accept', 'text/plain')
      .selectFile(
        {
          contents: Buffer.from('66666666-6666-6666-6666-666666666666'),
          fileName: 'test-license-key.txt',
          mimeType: 'text/plain',
        },
        { force: true },
      );
    cy.get('button[type="submit"]').should('be.disabled');

    // Empty password
    cy.get('input[name="passwordConfirm"]').focus().blur();
    cy.contains(/password confirmation is required/i).should('be.visible');

    // Enter email and enable button
    cy.get('input[name="passwordConfirm"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('shows error for license key file', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open sign up form
    cy.get('[data-testid=open-account-btn]').click();
    cy.get('[data-testid=tab-1]')
      .contains(/register/i)
      .click();

    // Sign up
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="username"]').type('New User');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="email"]').type('new-user@example.com');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="password"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="passwordConfirm"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('be.disabled');

    // Missing license
    cy.contains(/no file selected/i).should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');

    // Wrong file type
    cy.get('#license-key-upload-button input[type="file"]')
      .should('exist')
      .selectFile(
        {
          contents: Cypress.Buffer.from('fake-image-content', 'utf-8'),
          fileName: 'test-image.png',
          mimeType: 'image/png',
        },
        { force: true },
      );

    cy.contains(/please upload a .txt file/i).should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('shows error for invalid email', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open sign up form
    cy.get('[data-testid=open-account-btn]').click();
    cy.get('[data-testid=tab-1]')
      .contains(/register/i)
      .click();

    // Sign up
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="username"]').type('New User');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="email"]').type('notemail');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="password"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="passwordConfirm"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#license-key-upload-button input[type="file"]')
      .should('exist')
      .and('have.attr', 'accept', 'text/plain')
      .selectFile(
        {
          contents: Buffer.from('66666666-6666-6666-6666-666666666666'),
          fileName: 'test-license-key.txt',
          mimeType: 'text/plain',
        },
        { force: true },
      );

    // Invalid email
    cy.contains(/please enter a valid email address/i).should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('shows error for password strength', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open sign up form
    cy.get('[data-testid=open-account-btn]').click();
    cy.get('[data-testid=tab-1]')
      .contains(/register/i)
      .click();

    // Sign up
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="username"]').type('New User');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="email"]').type('new-user@example.com');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="passwordConfirm"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#license-key-upload-button input[type="file"]')
      .should('exist')
      .and('have.attr', 'accept', 'text/plain')
      .selectFile(
        {
          contents: Buffer.from('66666666-6666-6666-6666-666666666666'),
          fileName: 'test-license-key.txt',
          mimeType: 'text/plain',
        },
        { force: true },
      );

    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.contains(/password must include/i).should('be.visible');
    cy.get('input[name="password"]').invoke('val', '');

    cy.get('input[name="password"]').type('Password');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.contains(/password must include/i).should('be.visible');
    cy.get('input[name="password"]').invoke('val', '');

    cy.get('input[name="password"]').type('Password-');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.contains(/password must include/i).should('be.visible');
    cy.get('input[name="password"]').invoke('val', '');

    cy.get('input[name="password"]').type('P-1');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.contains(/password must be 8-24 characters long/i).should('be.visible');
    cy.get('input[name="password"]').invoke('val', '');

    cy.get('input[name="password"]').type('Very-Looooooooooooooong-1234');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.contains(/password must be 8-24 characters long/i).should('be.visible');
    cy.get('input[name="password"]').invoke('val', '');

    cy.get('input[name="password"]').type('Password-1');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('#signup-password-error').should('have.text', '');
  });

  it('shows error for password confirmation mismatch', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open sign up form
    cy.get('[data-testid=open-account-btn]').click();
    cy.get('[data-testid=tab-1]')
      .contains(/register/i)
      .click();

    // Sign up
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="username"]').type('New User');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="email"]').type('new-user@example.com');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="password"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="passwordConfirm"]').type('Another-Password-1');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#license-key-upload-button input[type="file"]')
      .should('exist')
      .and('have.attr', 'accept', 'text/plain')
      .selectFile(
        {
          contents: Buffer.from('66666666-6666-6666-6666-666666666666'),
          fileName: 'test-license-key.txt',
          mimeType: 'text/plain',
        },
        { force: true },
      );

    // Invalid email
    cy.get('input[name="passwordConfirm"]').blur();
    cy.contains(/passwords do not match/i).should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('input[name="passwordConfirm"]').invoke('val', '');
    cy.get('input[name="passwordConfirm"]').type('Password-New-User-1');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('shows error for already used username', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open sign up form
    cy.get('[data-testid=open-account-btn]').click();
    cy.get('[data-testid=tab-1]')
      .contains(/register/i)
      .click();

    cy.get('input[name="username"]').type('User 1');
    cy.get('input[name="email"]').type('new-user@example.com');
    cy.get('input[name="password"]').type('Password-New-User-1');
    cy.get('input[name="passwordConfirm"]').type('Password-New-User-1');
    cy.get('#license-key-upload-button input[type="file"]')
      .should('exist')
      .and('have.attr', 'accept', 'text/plain')
      .selectFile(
        {
          contents: Buffer.from('66666666-6666-6666-6666-666666666666'),
          fileName: 'test-license-key.txt',
          mimeType: 'text/plain',
        },
        { force: true },
      );

    // Error message
    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.get('button[type="submit"]').click();
    cy.contains(/database error saving new user/i).should('be.visible');
  });

  it('shows error for already used email', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open sign up form
    cy.get('[data-testid=open-account-btn]').click();
    cy.get('[data-testid=tab-1]')
      .contains(/register/i)
      .click();

    cy.get('input[name="username"]').type('New User');
    cy.get('input[name="email"]').type('user1@example.com');
    cy.get('input[name="password"]').type('Password-New-User-1');
    cy.get('input[name="passwordConfirm"]').type('Password-New-User-1');
    cy.get('#license-key-upload-button input[type="file"]')
      .should('exist')
      .and('have.attr', 'accept', 'text/plain')
      .selectFile(
        {
          contents: Buffer.from('66666666-6666-6666-6666-666666666666'),
          fileName: 'test-license-key.txt',
          mimeType: 'text/plain',
        },
        { force: true },
      );

    // Error message
    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.get('button[type="submit"]').click();
    cy.contains(/user already registered/i).should('be.visible');
  });

  it('shows error for already activated license', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open sign up form
    cy.get('[data-testid=open-account-btn]').click();
    cy.get('[data-testid=tab-1]')
      .contains(/register/i)
      .click();

    cy.get('input[name="username"]').type('New User');
    cy.get('input[name="email"]').type('new-user@example.com');
    cy.get('input[name="password"]').type('Password-New-User-1');
    cy.get('input[name="passwordConfirm"]').type('Password-New-User-1');
    cy.get('#license-key-upload-button input[type="file"]')
      .should('exist')
      .and('have.attr', 'accept', 'text/plain')
      .selectFile(
        {
          contents: Buffer.from('11111111-1111-1111-1111-111111111111'),
          fileName: 'test-license-key.txt',
          mimeType: 'text/plain',
        },
        { force: true },
      );

    // Error message
    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.get('button[type="submit"]').click();
    cy.contains(/license key is already activated/i).should('be.visible');
  });

  it('shows error for invalid license', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open sign up form
    cy.get('[data-testid=open-account-btn]').click();
    cy.get('[data-testid=tab-1]')
      .contains(/register/i)
      .click();

    cy.get('input[name="username"]').type('New User');
    cy.get('input[name="email"]').type('new-user@example.com');
    cy.get('input[name="password"]').type('Password-New-User-1');
    cy.get('input[name="passwordConfirm"]').type('Password-New-User-1');
    cy.get('#license-key-upload-button input[type="file"]')
      .should('exist')
      .and('have.attr', 'accept', 'text/plain')
      .selectFile(
        {
          contents: Buffer.from('00000000-0000-0000-0000-000000000000'),
          fileName: 'test-license-key.txt',
          mimeType: 'text/plain',
        },
        { force: true },
      );

    // Error message
    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.get('button[type="submit"]').click();
    cy.contains(/not a valid license key/i).should('be.visible');
  });
});

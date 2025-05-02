describe('Thread', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should see hidden content', () => {
    // Go to Thread 3 and check if hidden content is not visible
    cy.get('[data-testid=drawer-menu-btn]').click();
    cy.get('[data-testid=category-btn-2]').click();
    cy.get('[data-testid=thread-btn-3]').click();

    cy.get('.hidden-content').should('not.exist');

    // Login and check if hidden content is visible
    cy.get('[data-testid=thread-back-btn]').click();
    cy.uiLogin('user1@example.com', 'Password-1');

    cy.get('[data-testid=drawer-menu-btn]').click();
    cy.get('[data-testid=category-btn-2]').click();
    cy.get('[data-testid=thread-btn-3]').click();

    cy.get('.hidden-content').should('be.exist');
  });

  it('should sort by time or popularity', () => {
    // Go to Category 3
    cy.get('[data-testid=drawer-menu-btn]').click();
    cy.get('[data-testid=category-btn-3]').click();

    // Check first thread
    cy.get('[data-testid^=thread-btn-]')
      .first()
      .should('have.attr', 'data-testid', 'thread-btn-5');

    // Change to popular tab
    cy.get('[data-testid=tab-1]')
      .contains(/popular/i)
      .click();

    // Check first thread
    cy.get('[data-testid^=thread-btn-]')
      .first()
      .should('have.attr', 'data-testid', 'thread-btn-6');

    // Change to cecent tab
    cy.get('[data-testid=tab-0]')
      .contains(/recent/i)
      .click();

    // Check first thread
    cy.get('[data-testid^=thread-btn-]')
      .first()
      .should('have.attr', 'data-testid', 'thread-btn-5');
  });

  it('should be able to like and dislike after loggin in', () => {
    // Should not be able to like/dislike when not logged in
    cy.get('[data-testid=drawer-menu-btn]').click();
    cy.get('[data-testid=category-btn-1]').click();
    cy.get('[data-testid=thread-btn-1]').click();

    // Click on like button and Login Dialog should appear
    cy.get('[data-testid=thread-like-btn]').click();
    cy.get('[data-testid=login-form]').should('be.exist');
    cy.get('.MuiBackdrop-root').click({ force: true });

    // Click on dislike button and Login Dialog should appear
    cy.get('[data-testid=thread-dislike-btn]').click();
    cy.get('[data-testid=login-form]').should('be.exist');
    cy.get('.MuiBackdrop-root').click({ force: true });

    // Login
    cy.get('[data-testid=thread-back-btn]').click();
    cy.uiLogin('user1@example.com', 'Password-1');

    // Should be able to like when logged in
    cy.get('[data-testid=drawer-menu-btn]').click();
    cy.get('[data-testid=category-btn-1]').click();
    cy.get('[data-testid=thread-btn-1]').click();

    // Click on like button should change color
    cy.get('[data-testid=thread-like-btn] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=thread-like-btn]').click();
    cy.get('[data-testid=thread-like-btn] svg').should(
      'have.css',
      'color',
      'rgb(252, 186, 3)',
    );
    cy.get('[data-testid=thread-like-btn]').click();
    cy.get('[data-testid=thread-like-btn] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );

    // Click on dislike button should change color
    cy.get('[data-testid=thread-dislike-btn] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=thread-dislike-btn]').click();
    cy.get('[data-testid=thread-dislike-btn] svg').should(
      'have.css',
      'color',
      'rgb(252, 186, 3)',
    );
    cy.get('[data-testid=thread-dislike-btn]').click();
    cy.get('[data-testid=thread-dislike-btn] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );

    // Test like and dislike
    cy.get('[data-testid=thread-like-btn] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=thread-dislike-btn] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=thread-like-btn]').click();
    cy.get('[data-testid=thread-like-btn] svg').should(
      'have.css',
      'color',
      'rgb(252, 186, 3)',
    );
    cy.get('[data-testid=thread-dislike-btn] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=thread-dislike-btn]').click();
    cy.get('[data-testid=thread-like-btn] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=thread-dislike-btn] svg').should(
      'have.css',
      'color',
      'rgb(252, 186, 3)',
    );
    cy.get('[data-testid=thread-dislike-btn]').click();
    cy.get('[data-testid=thread-like-btn] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=thread-dislike-btn] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
  });

  it.only('should be able to create thread after loggin in', () => {
    // Should not be able to create thread when not logged in
    cy.get('[data-testid=thread-editor-btn]').click();
    cy.get('[data-testid=login-form]').should('be.exist');
    cy.get('.MuiBackdrop-root').click({ force: true });

    // Login
    cy.uiLogin('user1@example.com', 'Password-1');
    cy.get('[data-testid=thread-editor-btn]').click();
    cy.contains(/create thread/i).should('be.visible');

    // Editor can be closed directly when no input
    cy.get('.MuiBackdrop-root').click({ force: true });

    // Open editor
    cy.get('[data-testid=thread-editor-btn]').click();

    // Create thread button should only be enabled when title and content are inputted
    cy.get('[data-testid=create-thread-btn]').should('be.disabled');
    cy.get('input[id="new-thread-title"]').type('New Title');
    cy.get('[data-testid=create-thread-btn]').should('be.disabled');
    cy.get('div[contenteditable=true]').type('New Content');
    cy.get('[data-testid=create-thread-btn]').should('not.be.disabled');

    // Warning should appear when user tries to close the editor and there is still inputted content
    cy.get('.MuiBackdrop-root').click({ force: true });
    cy.contains(/warning/i).should('be.visible');
    cy.get('[data-testid=discard-input-btn]').click();

    // Discard the input and re-open the editor, the editor should be empty
    cy.get('[data-testid=thread-editor-btn]').click();
    cy.contains(/create thread/i).should('be.visible');
    cy.get('input[id="new-thread-title"]').should('have.value', '');

    // Test continue to input
    cy.get('input[id="new-thread-title"]').type('New Title');
    cy.get('div[contenteditable=true]').type('New Content');

    // Continue to input should close the warning and back to the editor
    cy.get('.MuiBackdrop-root').click({ force: true });
    cy.contains(/warning/i).should('be.visible');
    cy.get('[data-testid=continue-input-btn]').click();

    cy.get('input[id="new-thread-title"]').should('have.value', 'New Title');
    cy.contains(/new content/i).should('be.visible');

    // Test select category
    cy.get(`[id="category-select"]`).click();
    cy.get(`[data-value=2]`).click();
    cy.contains(/category 2/i).should('be.visible');

    // Create thread
    cy.get('[data-testid=create-thread-btn]').click();

    // Should navigate to category 2
    cy.contains(/category 2/i).should('be.visible');

    // New thread should appear in thread list
    cy.contains(/new title/i).should('be.visible');
    cy.contains('[data-testid^="thread-btn-"]', /new title/i).click();

    // Thread content should be displayed
    cy.contains(/new title/i).should('be.visible');
    cy.contains(/new content/i).should('be.visible');
  });
});

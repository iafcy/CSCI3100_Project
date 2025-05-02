describe('Comment', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be able to like and dislike after loggin in', () => {
    // Go to Thread 1
    cy.get('[data-testid=drawer-menu-btn]').click();
    cy.get('[data-testid=category-btn-1]').click();
    cy.get('[data-testid=thread-btn-1]').click();

    // Click on like button and Login Dialog should appear
    cy.get('[data-testid=comment-like-btn-1]').click();
    cy.get('[data-testid=login-form]').should('be.exist');
    cy.get('.MuiBackdrop-root').click({ force: true });

    // Click on dislike button and Login Dialog should appear
    cy.get('[data-testid=comment-dislike-btn-1]').click();
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
    cy.get('[data-testid=comment-like-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=comment-like-btn-1]').click();
    cy.get('[data-testid=comment-like-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(252, 186, 3)',
    );
    cy.get('[data-testid=comment-like-btn-1]').click();
    cy.get('[data-testid=comment-like-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );

    // Click on dislike button should change color
    cy.get('[data-testid=comment-dislike-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=comment-dislike-btn-1]').click();
    cy.get('[data-testid=comment-dislike-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(252, 186, 3)',
    );
    cy.get('[data-testid=comment-dislike-btn-1]').click();
    cy.get('[data-testid=comment-dislike-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );

    // Test like and dislike
    cy.get('[data-testid=comment-like-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=comment-dislike-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=comment-like-btn-1]').click();
    cy.get('[data-testid=comment-like-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(252, 186, 3)',
    );
    cy.get('[data-testid=comment-dislike-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=comment-dislike-btn-1]').click();
    cy.get('[data-testid=comment-like-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=comment-dislike-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(252, 186, 3)',
    );
    cy.get('[data-testid=comment-dislike-btn-1]').click();
    cy.get('[data-testid=comment-like-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
    cy.get('[data-testid=comment-dislike-btn-1] svg').should(
      'have.css',
      'color',
      'rgb(170, 170, 170)',
    );
  });

  it('should be able to create comment after loggin in', () => {
    // Go to Thread 1
    cy.get('[data-testid=drawer-menu-btn]').click();
    cy.get('[data-testid=category-btn-1]').click();
    cy.get('[data-testid=thread-btn-1]').click();

    // Login dialog should appear when trying to comment
    cy.get('[data-testid=comment-editor-btn]').click();
    cy.get('[data-testid=login-form]').should('be.exist');
    cy.get('.MuiBackdrop-root').click({ force: true });

    // Login
    cy.get('[data-testid=thread-back-btn]').click();
    cy.uiLogin('user1@example.com', 'Password-1');

    // Go to Thread 1
    cy.get('[data-testid=drawer-menu-btn]').click();
    cy.get('[data-testid=category-btn-1]').click();
    cy.get('[data-testid=thread-btn-1]').click();

    // Comment editor should appear
    cy.get('[data-testid=comment-editor-btn]').click();
    cy.contains(/comment on/i).should('be.visible');

    // Editor can be closed directly when no input
    cy.get('.MuiBackdrop-root').click({ force: true });

    // Open editor
    cy.get('[data-testid=comment-editor-btn]').click();

    // Create comment button should only be enabled when content is inputted
    cy.get('[data-testid=create-comment-btn]').should('be.disabled');
    cy.get('div[contenteditable=true]').type('New Comment');
    cy.get('[data-testid=create-comment-btn]').should('not.be.disabled');

    // Warning should appear when user tries to close the editor and there is still inputted content
    cy.get('.MuiBackdrop-root').click({ force: true });
    cy.contains(/warning/i).should('be.visible');
    cy.get('[data-testid=discard-input-btn]').click();

    // Discard the input and re-open the editor
    cy.get('[data-testid=comment-editor-btn]').click();
    cy.contains(/comment on/i).should('be.visible');

    cy.get('div[contenteditable=true]').type('New Comment');

    // Continue to input should close the warning and back to the editor
    cy.get('.MuiBackdrop-root').click({ force: true });
    cy.contains(/warning/i).should('be.visible');
    cy.get('[data-testid=continue-input-btn]').click();
    cy.contains(/new comment/i).should('be.visible');

    // Create comment
    cy.get('[data-testid=create-comment-btn]').click();

    // New comment should be displayed
    cy.contains(/user 1/i).should('be.visible');
    cy.contains(/new comment/i).should('be.visible');
  });
});

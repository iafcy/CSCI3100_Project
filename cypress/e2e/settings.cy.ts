describe('Settings', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('change light/dark mode', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open Settings Dialog
    cy.get('[data-testid=settings-btn]').click();

    // Change to dark mode
    cy.get('[data-testid=color-mode-toggle] input').click();

    cy.get('[data-testid=close-settings-btn]').click();
    cy.get('.MuiBackdrop-root').first().click({ force: true });

    // Should be in dark mode
    cy.get('[data-testid=main-container]').should(
      'have.css',
      'background-color',
      'rgb(34, 34, 34)',
    );
    cy.get('[data-testid=nav-category-name]').should(
      'have.css',
      'color',
      'rgb(255, 255, 255)',
    );
    cy.get('[data-testid=nav-appbar]').should(
      'have.css',
      'background-color',
      'rgb(59, 58, 57)',
    );

    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open Settings Dialog
    cy.get('[data-testid=settings-btn]').click();

    // Change to light mode
    cy.get('[data-testid=color-mode-toggle] input').click();

    cy.get('[data-testid=close-settings-btn]').click();
    cy.get('.MuiBackdrop-root').first().click({ force: true });

    // Should be in light mode
    cy.get('[data-testid=main-container]').should(
      'have.css',
      'background-color',
      'rgb(242, 242, 242)',
    );
    cy.get('[data-testid=nav-category-name]').should(
      'have.css',
      'color',
      'rgba(0, 0, 0, 0.87)',
    );
    cy.get('[data-testid=nav-appbar]').should(
      'have.css',
      'background-color',
      'rgb(232, 232, 232)',
    );
  });

  it('change font size', () => {
    // Open Drawer Menu
    cy.get('[data-testid=drawer-menu-btn]').click();

    // Open Settings Dialog
    cy.get('[data-testid=settings-btn]').click();

    // Change to large font size
    cy.get('[data-testid=font-size-slider] span[data-index=2]').first().click();
    cy.get('[data-testid=font-size-slider] input[type="range"]').should(
      'have.value',
      '2',
    );

    cy.get('[data-testid=font-size-slider-title]').then(
      ($el: JQuery<HTMLElement>) => {
        const fontSize = parseFloat($el.css('font-size'));
        expect(fontSize).to.be.greaterThan(16);
      },
    );

    // Change to small font size
    cy.get('[data-testid=font-size-slider] span[data-index=0]').first().click();
    cy.get('[data-testid=font-size-slider] input[type="range"]').should(
      'have.value',
      '0',
    );

    cy.get('[data-testid=font-size-slider-title]').then(
      ($el: JQuery<HTMLElement>) => {
        const fontSize = parseFloat($el.css('font-size'));
        expect(fontSize).to.be.lessThan(16);
      },
    );

    // Change to default font size
    cy.get('[data-testid=font-size-slider] span[data-index=1]').first().click();
    cy.get('[data-testid=font-size-slider] input[type="range"]').should(
      'have.value',
      '1',
    );

    cy.get('[data-testid=font-size-slider-title]').then(
      ($el: JQuery<HTMLElement>) => {
        const fontSize = parseFloat($el.css('font-size'));
        expect(fontSize).to.be.eq(16);
      },
    );
  });
});

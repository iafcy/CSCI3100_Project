describe('Home Page', () => {
  it('should go to category 1', () => {
    cy.visit('/');
    cy.contains(/category 1/i).should('be.visible');
  });
});

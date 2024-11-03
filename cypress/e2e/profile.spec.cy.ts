describe('Profile Update Test', () => {
  before(() => {
    cy.visit('http://localhost:4200/auth/login');
    cy.wait(1000);
    cy.get('[data-cy="email"]').type('user@example.com');
    cy.get('[data-cy="password"]').type('userpass');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/dashboard/incidents');
  });

  it('Should navigate to profile and update fields', () => {
    
    cy.get('[data-cy="nav-profile"]').click();

    cy.get('[data-cy="input-responsible"]').clear().type('Nuevo Responsable');
    cy.get('[data-cy="input-phone"]').clear().type('1234567890');
    cy.get('[data-cy="input-email"]').clear().type('nuevo.email@example.com');

    cy.get('[data-cy="btn-update-profile"]').click();

    cy.get('.toast-success', { timeout: 10000 }).should('be.visible');
    cy.get('.toast-success').invoke('text').should('not.be.empty');
  });
});

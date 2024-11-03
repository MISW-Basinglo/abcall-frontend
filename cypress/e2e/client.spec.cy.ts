describe('Client Form Test', () => {
  before(() => {
    cy.visit('http://localhost:4200/auth/login');
    cy.wait(1000);
    cy.get('[data-cy="email"]').type('user@example.com');
    cy.get('[data-cy="password"]').type('userpass');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/dashboard/incidents');
  });

  it('Should fill out and submit the client form', () => {
    cy.get('[data-cy="nav-clients"]').click();
    cy.get('[data-cy="btn-new-client"]').click();

    cy.get('[data-cy="input-company-name"]').type('Empresa Ejemplo');
    cy.get('[data-cy="input-nit"]').type('123456789');
    cy.get('[data-cy="input-user-name"]').type('Juan Perezz', { force: true });
    cy.get('[data-cy="input-phone"]').type('3001234567');
    cy.get('[data-cy="input-email"]').type('juan.perezzz@example.com');
    cy.get('[data-cy="select-plan"]').click({ force: true });
    cy.get('[data-cy="option-plan"]').contains('Emprendedor').click();

    cy.get('[data-cy="btn-save"]').click();

    cy.get('.toast-success', { timeout: 10000 }).should('be.visible');
    cy.get('.toast-success').invoke('text').should('not.be.empty');
  });
});

describe('Incident Creation Test', () => {
  before(() => {
    cy.visit('http://localhost:4200/auth/login');
    cy.wait(1000);
    cy.get('[data-cy="email"]').type('gestor-incidentes@abcall.lat');
    cy.get('[data-cy="password"]').type('gestor-incidentes-pass');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/dashboard/incidents');
  });

  it('Should open the incident creation form, fill it out, and submit', () => {
    cy.get('[data-cy="btn-new-incident"]').click();
    cy.get('[data-cy="dialog-title"]').should('exist');

    cy.get('[data-cy="input-dni"]').type('11111111');
    cy.get('[data-cy="select-issue-type"]').click();
    cy.get('[data-cy="option-issue-type"]').contains('Queja').click();

    cy.get('[data-cy="input-description"]').type(
      'Descripción detallada del problema.'
    );

    cy.get('[data-cy="btn-save"]').click();

    cy.get('.toast-success', { timeout: 3000 })
      .invoke('text')
      .should('not.be.empty');
  });
});

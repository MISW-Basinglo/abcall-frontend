describe('Reports Test', () => {
  before(() => {
    cy.visit('http://localhost:4200/auth/login');
    cy.wait(1000);
    cy.get('[data-cy="email"]').type('claroclient@example.com');
    cy.get('[data-cy="password"]').type('claroclientpass');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/dashboard/users');
  });

  it('Should show control table', () => {
    cy.get('[data-cy="nav-reports"]').click();
    cy.wait(4000);
    cy.get('[data-cy="bar-chart"]').should('exist');
    cy.get('[data-cy="bar-chart-title"]').should(
      'contain',
      'Historial de Incidentes'
    );
    cy.get('[data-cy="bar-chart-canvas"]').should('be.visible');
    cy.wait(4000);

    cy.get('[data-cy="line-chart"]').should('exist');
    cy.get('[data-cy="line-chart-title"]').should(
      'contain',
      'Tiempos de respuesta (Hora)'
    );
  });
});

import 'cypress-file-upload';

describe('CSV File Upload', () => {
  it('Should upload a CSV file and display a toaster message', () => {
    cy.visit('http://localhost:4200/auth/login');
    cy.get('[data-cy="email"]').type('user@example.com');
    cy.get('[data-cy="password"]').type('userpass');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/dashboard/incidents');

    cy.get('[data-cy="nav-users"]').click();
    cy.get('[data-cy="btn-upload-users"]').click();

    const fileName = 'usuarios4.csv';

    cy.fixture(fileName).then((fileContent) => {
      cy.get('.users-form__drop-zone').trigger('dragover');
      cy.get('.users-form__drop-zone').trigger('drop', {
        dataTransfer: {
          files: [new File([fileContent], fileName, { type: 'text/csv' })],
        },
      });
    });

    cy.get('.users-form__file-display p').should('contain', 'usuarios4.csv');

    cy.get('[data-cy="btn-send-file-users"]').click();
  });
});

describe("Login and redirection test", () => {
  const users = [
    { email: "user@example.com", password: "userpass" },
    { email: "admin@example.com", password: "adminpass" },
  ];

  users.forEach(({ email, password }) => {
    it(`Should log in and redirect to dashboard for user ${email}`, () => {
      cy.visit("http://localhost:4200/auth/login");
      cy.wait(1000);

      cy.get('[data-cy="email"]').type(email);
      cy.get('[data-cy="password"]').type(password);
      cy.get('[data-cy="login-button"]').click();

      cy.url().should("include", "/dashboard/incidents");
      cy.get('[data-cy="nav-incidents"]').should("have.class", "active");
      cy.get("router-outlet").should("exist");
    });
  });
});

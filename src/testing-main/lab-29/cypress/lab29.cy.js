describe('Lab 29 - Cypress E2E', () => {
  it('loads the lab page', () => {
    cy.visit('/');
    cy.contains('h1', 'Lab 29').should('be.visible');
  });

  it('increments the counter', () => {
    cy.visit('/');

    cy.get('[data-cy="count"]').should('contain.text', 'Count: 0');
    cy.get('[data-cy="increment"]').click();
    cy.get('[data-cy="count"]').should('contain.text', 'Count: 1');
  });

  it('adds a todo item', () => {
    cy.visit('/');

    cy.get('[data-cy="todo-input"]').type('Explain component testing');
    cy.get('[data-cy="todo-add"]').click();

    cy.get('[data-cy="todo-item"]').should('contain.text', 'Explain component testing');
  });
});

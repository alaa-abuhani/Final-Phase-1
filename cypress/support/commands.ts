/// <reference types="cypress" />
import "cypress-file-upload";
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getByPlaceholder: typeof getByPlaceholder;
      logout: typeof logout;
    }
  }
}
// declare namespace Cypress {
//   interface Chainable<Subject> {
//     getByPlaceholder: typeof getByPlaceholder;
//   }
// }
function getByPlaceholder(field: string) {
  return cy.get('[placeholder="' + field + '"]');
}
Cypress.Commands.add("getByPlaceholder", getByPlaceholder);

function logout() {
  cy.get(".oxd-userdropdown-tab").click({ force: true });
  cy.get(".oxd-dropdown-menu").contains("Logout").click({ force: true });
}
Cypress.Commands.add("logout", logout);

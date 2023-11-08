export const checkToastMessage = () => {
  cy.get(".oxd-toast").should("exist");
  cy.get(".oxd-toast").should("not.exist", { setTimeout: 10000 });
  cy.wait(2000);
};
// name report
export const checkReportName = (expectValue: string) => {
  cy.get("h6").eq(1).should("contain", expectValue);
};

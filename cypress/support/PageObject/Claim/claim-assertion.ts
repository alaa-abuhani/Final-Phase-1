export const ckeckClaimTableAssertion = (
  uniqueValue: any,
  expectValue: any
) => {
  cy.get(".oxd-table-body")
    .find(".oxd-table-card")
    .find(".oxd-table-row")
    .contains(uniqueValue)
    .invoke("index")
    .as("indexTargetRow")
    .then((indexrow) => {
      cy.get(".oxd-table-body")
        .find(".oxd-table-card")
        .find(".oxd-table-row")
        .eq(indexrow)
        .each((elem) => {
          cy.wrap(elem)
            .find(".oxd-table-cell")
            .each((cell, cellIndex) => {
              cy.wrap(cell)
                .invoke("text")
                .should("contain", expectValue[cellIndex]);
            });
        });
    });
};

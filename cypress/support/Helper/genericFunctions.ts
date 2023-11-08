export default class GenericHepler {
  //check table cell
  static GenericCheckTableCell(expectValue: any[]) {
    cy.get(".content-wrapper")
      .find(".rgRow")
      .each(($row, rowIndex) => {
        cy.wrap($row)
          .find(".rgCell")
          .each(($cell, cellIndex) => {
            cy.wrap($cell)
              .invoke("text")
              .should("contain", expectValue[rowIndex][cellIndex]);
          });
      });
  }
  //check table row number
  static GenericCheckTableRowNumber(expectValue: number) {
    cy.get(".content-wrapper")
      .find(".rgRow")
      .then((row) => {
        expect(row.length).to.equal(expectValue);
      });
  }
  // check first header}
  static GenricCheckReportFirstHeader(expectValue: any[]) {
    cy.get(".header-wrapper")
      .find(".group-rgRow")
      .each((elem) => {
        cy.wrap(elem)
          .find(".rgHeaderCell")
          .each((cell, cellIndex) => {
            cy.wrap(cell)
              .invoke("text")
              .should("contain", expectValue[cellIndex]);
          });
      });
  }
  // check second header}
  static genricCheckReportSecondHeader(expectValue: any[]) {
    cy.get(".header-wrapper")
      .find(".actual-rgRow")
      .each((elem) => {
        cy.wrap(elem)
          .find(".rgHeaderCell")
          .each((cell, cellIndex) => {
            cy.wrap(cell)
              .invoke("text")
              .should("contain", expectValue[cellIndex]);
          });
      });
  }
}

export default class ClaimAssign {
  static elements = {
    claimPage: () => cy.get(".oxd-main-menu").contains("Claim"),
    employeeClaimTab: () =>
      cy.get(".oxd-topbar-body-nav").contains("Employee Claims"),
    employeeInput: () => cy.get(".oxd-input-group").eq(0),
    dropDown: () => cy.get(".oxd-autocomplete-dropdown"),
    searchBtn: () => cy.get(".oxd-form-actions > .oxd-button--secondary"),
    tableRow: () => cy.get(".oxd-table-body"),
    approveBtn: () => cy.get(".oxd-button--secondary"),
    rejectBtn: () => cy.get(".oxd-button--danger"),
    loadingSpinner: () =>
      cy.get(".oxd-loading-spinner-container", { timeout: 40000 }),
  };

  static claimEmployee(firstName: string, lastName: string) {
    this.elements.claimPage().click();
    this.elements.employeeClaimTab().click();
    this.elements.employeeInput().type(firstName + " ");
    this.elements
      .dropDown()
      .contains(firstName + " " + lastName, { timeout: 40000 })
      .click({ force: true });
    this.elements.searchBtn().click({ force: true });
  }

  static claimApproveReject(status: string) {
    this.elements.tableRow().contains("View Details").click();
    this.elements
      .loadingSpinner()
      .should("exist")
      .then(() => {
        this.elements
          .loadingSpinner()
          .should("not.exist")
          .then(() => {
            if (status === "Paid") {
              this.elements.approveBtn().click({ force: true });
            } else {
              cy.wait(3000);
              this.elements.rejectBtn().click({ force: true });
            }
          })
          .then(() => {
            this.elements.claimPage().click();
            this.elements.employeeClaimTab().click();
          });
      });
  }
}

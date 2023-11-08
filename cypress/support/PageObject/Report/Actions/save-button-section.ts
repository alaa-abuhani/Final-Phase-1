export class button {
  elements = {
    saveBtn: () => cy.get(".oxd-button--secondary"),
  };
  saveReport() {
    this.elements.saveBtn().click({ force: true });
  }
}

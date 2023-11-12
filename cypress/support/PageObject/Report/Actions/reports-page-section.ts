export default class Report {
  elements = {
    mainMenue: () => cy.get(".oxd-main-menu").contains("PIM"),
    reportsTab: () =>
      cy.get(".oxd-topbar-body-nav-tab-item").contains("Reports"),
    addReportBtn: () => cy.get(".oxd-button").contains("Add"),
  };
  //open PIM tab
  getPIMPage() {
    this.elements.mainMenue().click();
  }
  //open report tab
  getReportsTab() {
    this.elements.reportsTab().click();
  }
  //open add report dialog
  getAddReportDialoge() {
    this.elements.addReportBtn().click();
  }
  // function execute all steps
  getReportPage() {
    this.getPIMPage();
    this.getReportsTab();
    this.getAddReportDialoge();
  }
}

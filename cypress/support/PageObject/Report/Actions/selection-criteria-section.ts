import {
  jobTitle,
  locationName,
} from "../../../../e2e/orangeHr/report-employee-spec.cy";

export default class SelectionCriteria {
  elements = {
    inputSelect: () => cy.get(" .oxd-select-text-input"),
    dropdownMenue: () => cy.get(".oxd-select-dropdown"),
    addBtn: () => cy.get(" .oxd-icon-button"),
    iconSelect: () => cy.get(" .oxd-select-text--after > .oxd-icon"),
  };
  // job elements data
  getinputSelectCriteria() {
    this.elements.inputSelect().eq(0).click({ force: true });
  }
  getDropdownMenueJob() {
    this.elements.dropdownMenue().contains("Job Title").click();
  }
  getAddBtn() {
    this.elements.addBtn().eq(2).click();
  }
  getIconSelectJob() {
    this.elements.iconSelect().eq(2).click();
  }
  getSelectJob() {
    this.elements.dropdownMenue().contains(jobTitle).click();
  }
  //  location elements data
  getDropdownMenueLocation() {
    this.elements.dropdownMenue().contains("Location").click();
  }
  getIconSelectlocation() {
    this.elements.iconSelect().eq(3).click();
  }
  getSelectlocation() {
    this.elements.dropdownMenue().contains(locationName).click();
  }
  // create job field
  jobAction() {
    this.getinputSelectCriteria();
    this.getDropdownMenueJob();
    this.getAddBtn();
    this.getIconSelectJob();
    this.getSelectJob();
  }
  //create location field
  locationAction() {
    this.getinputSelectCriteria();
    this.getDropdownMenueLocation();
    this.getAddBtn();
    this.getIconSelectlocation();
    this.getSelectlocation();
  }

  //function execute create job field & create location field
  selectionCriteriaAction = () => {
    this.jobAction();
    this.locationAction();
  };
}

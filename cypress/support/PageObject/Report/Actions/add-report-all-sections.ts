import DisplayFields from "./display-fields-section";
import ReportName from "./report-name-section";
import { button } from "./save-button-section";
import SelectionCriteria from "./selection-criteria-section";
import Report from "./reports-page-section";
const ReportNameObj: ReportName = new ReportName();
const selectionCriteriaObj: SelectionCriteria = new SelectionCriteria();
const DisplayFieldsObj: DisplayFields = new DisplayFields();
const buttonObj: button = new button();
const ReportObj: Report = new Report();

export default class AddReport {
  // open report page and add report dialog
  static ReportDialoge() {
    ReportObj.getReportPage();
  }
  //execute  components add report dialog
  static AddReportActions() {
    //type report name
    ReportNameObj.getInputNameReport();
    //create selectionCriteria
    selectionCriteriaObj.selectionCriteriaAction();
    //create DisplayField
    DisplayFieldsObj.DisplayFieldsActions();
    //click save report
    buttonObj.saveReport();
  }
}

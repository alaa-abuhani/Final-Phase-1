import login from "../../support/PageObject/login";
import {
  addEmployee,
  addJob,
  addJobAndLocationEmployee,
  addLocation,
  addSalaryEmployee,
  deleteEmployee,
  deleteJob,
  deleteLocation,
} from "../../support/Helper/api-helper";
import { checkReportAssetrion } from "../../support/PageObject/Report/Assertions/report-assertion";
import AddReport from "../../support/PageObject/Report/Actions/add-report-all-sections";
import {
  visitEmployeeInfo,
  visitHomePage,
} from "../../support/PageObject/common-page-visit";
const loginObj: login = new login();
export let jobTitle: string;
export let reportName: string;
let firstHeaderData: any; // store the values of first header table for Assertion
let secondHeaderData: any; // store the values of second header table for Assertion
export let locationName: string;
let tableData: any; // array of data use for Assertion  report table cell
let tableRowNumber: number; // number row of report table use it for Assertion
let idjob: any;
let idloc: any;
let empNumber: number[] = []; //store employeeNumber retrieve from API
let employees: any[] = []; // store employee firstName use it  for Assertion table
let salaryAmount: string;

beforeEach(() => {
  cy.intercept("/web/index.php/dashboard/index").as("loginpage");
  visitHomePage();
  //admin login
  cy.fixture("login.json").as("loginInfo");
  cy.get("@loginInfo").then((loginInfo: any) => {
    loginObj.loginValid(loginInfo.Admin, loginInfo.Password);
  });
  cy.fixture("employeeInfo.json").as("empInfo");
  cy.get("@empInfo").then((empInfo: any) => {
    jobTitle = empInfo[3].jobTitle;
    locationName = empInfo[3].locationName;
    salaryAmount = empInfo[3].salaryAmount;
    //greate job via api
    addJob(jobTitle).then((id) => {
      idjob = id;
    });
    //greate location via api
    addLocation(locationName, empInfo[3].countryCode).then((id) => {
      idloc = id;
    });
    //greate 3 employee via api and assign for that job &location & salary
    for (let i = 0; i < 3; i++) {
      employees.push(empInfo[i].firstName);
      addEmployee(
        empInfo[i].firstName,
        empInfo[i].id,
        empInfo[i].lastName
      ).then((empNum) => {
        // store employee Number
        empNumber.push(empNum);
        //open details employee page for that employee
        visitEmployeeInfo(empNum);
        //assign job &location & salary
        addJobAndLocationEmployee(idjob, idloc, empNum);
        //assign  salary
        addSalaryEmployee(
          empNum,
          empInfo[3].salaryComponent,
          empInfo[3].salaryAmount,
          empInfo[3].currencyId
        );
      });
    }
    tableData = [
      [employees[0], jobTitle, salaryAmount],
      [employees[1], jobTitle, salaryAmount],
      [employees[2], jobTitle, salaryAmount],
    ];
    tableRowNumber = employees.length;
  });
  // store data of report from fixture use this data for create report and Assertion
  cy.fixture("report.json").as("reportInfo");
  cy.get("@reportInfo").then((reportInfo: any) => {
    reportName = reportInfo.reportName;
    firstHeaderData = reportInfo.firstHeaderData;
    secondHeaderData = reportInfo.secondHeaderData;
  });
});

describe("Report functionality", () => {
  it("Report: Generate an Employee report with search criteria Personal,Job,Salary)", () => {
    visitHomePage();
    //open PIM Tab & Report page UI
    AddReport.ReportDialoge();
    //execute functions create report UI
    AddReport.AddReportActions();
    //execute functions assertion report data
    checkReportAssetrion(
      reportName,
      firstHeaderData,
      secondHeaderData,
      tableData,
      tableRowNumber
    );
  });
});

afterEach(() => {
  //delete all employee
  for (let i = 0; i < 3; i++) {
    deleteEmployee(empNumber[i]);
  }
  //delete job
  deleteJob(idjob);
  //delete location
  deleteLocation(idloc);
});

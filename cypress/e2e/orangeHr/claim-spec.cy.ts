import login from "../../support/PageObject/login";
import {
  addEmployee,
  addEvent,
  addExpenses,
  addUser,
  deleteEmployee,
  deleteExpenses,
  deleteEvents,
  addClaim,
  addClaimExpenses,
  submitClaim,
} from "../../support/Helper/Claim/api-helper";
import { visitHomePage } from "../../support/PageObject/common-page-visit";
import moment from "moment";
import { ckeckClaimTableAssertion } from "../../support/PageObject/Claim/claim-assertion";
import ClaimAssign from "../../support/PageObject/Claim/claim-action";
const loginObj: login = new login();
let eventTitle: string;
let exspensName: string;
let idEvent: any;
let idExpenses: any;
let empNumber: number; //store employeeNumber retrieve from API
let idClaim: any;
let employeeName: string;
let referenceId: any;
let status: any;
let amount = "100.00";
let date = moment().format("YYYY-MM-DD");
let currencyId = "JOD";
let currencyName = "Jordanian Dinar";
let expectValue: any;
let firstName: string;
let lastName: string;

beforeEach(() => {
  cy.log(date);
  cy.intercept("/web/index.php/dashboard/index").as("loginpage");
  visitHomePage();
  //admin login
  cy.fixture("login.json").as("loginInfo");
  cy.get("@loginInfo").then((loginInfo: any) => {
    loginObj.loginValid(loginInfo.Admin, loginInfo.Password);
  });
  cy.fixture("employee-claim-Info.json").as("empInfo");
  cy.get("@empInfo").then((empInfo: any) => {
    firstName = empInfo[0].firstName;
    lastName = empInfo[0].lastName;
    employeeName = empInfo[0].firstName + " " + empInfo[0].lastName;
    eventTitle = empInfo[1].eventTitle;
    exspensName = empInfo[1].expenseName;
    //greate  employee via api
    addEmployee(firstName, empInfo[0].id, lastName)
      .then((empNum) => {
        empNumber = empNum;
        addUser(empNum, empInfo[0].userName, empInfo[0].password);
      })
      .then(() => {
        //greate event via api
        addEvent(eventTitle).then((id) => (idEvent = id));
        //greate expenses via api
        addExpenses(exspensName).then((id) => (idExpenses = id));
      })
      .then(() => {
        cy.logout();
        //user login
        loginObj.loginValid(empInfo[0].userName, empInfo[0].password);
        cy.visit("/claim/submitClaim");
        addClaim(idEvent, currencyId).then((res) => {
          idClaim = res.body.data.id;
          referenceId = res.body.data.referenceId;
          addClaimExpenses(idExpenses, idClaim, date, amount);
          submitClaim(idClaim);
          cy.logout();
          visitHomePage();
        });
      });
  });
});

describe("Claim functionality", () => {
  it("Claim: verify admin can approve submited claim user )", () => {
    status = "Paid";
    expectValue = [
      referenceId,
      employeeName,
      eventTitle,
      "",
      currencyName,
      date,
      status,
      amount,
      "View Details",
    ];
    //admi login
    cy.fixture("login.json").as("loginInfo");
    cy.get("@loginInfo").then((loginInfo: any) => {
      loginObj.loginValid(loginInfo.Admin, loginInfo.Password);
    });
    //open claim page & claim employee tab & search for employee request claim
    ClaimAssign.claimEmployee(firstName, lastName);
    //assign claim appprove or reject
    ClaimAssign.claimApproveReject(status);
    ckeckClaimTableAssertion(`${referenceId}`, expectValue);
  });

  it("Claim: verify admin can reject submited claim user)", () => {
    status = "Rejected";
    expectValue = [
      referenceId,
      employeeName,
      eventTitle,
      "",
      currencyName,
      date,
      status,
      amount,
      "View Details",
    ];
    //admi login
    cy.fixture("login.json").as("loginInfo");
    cy.get("@loginInfo").then((loginInfo: any) => {
      loginObj.loginValid(loginInfo.Admin, loginInfo.Password);
    });
    //open claim page & claim employee tab & search for employee request claim
    ClaimAssign.claimEmployee(firstName, lastName);
    //assign claim appprove or reject
    ClaimAssign.claimApproveReject(status);
    ckeckClaimTableAssertion(`${referenceId}`, expectValue);
  });
});

afterEach(() => {
  deleteEmployee(empNumber);
  deleteExpenses(idExpenses);
  deleteEvents(idEvent);
});

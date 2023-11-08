export const visitEmployeeInfo = (empNum: any) => {
  cy.visit(`/pim/viewPersonalDetails/empNumber/${empNum}`);
};
export const visitHomePage = () => {
  cy.visit("/");
};

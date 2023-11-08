import {
  employeeData,
  jobAndLocationEmployeeData,
  jobData,
  locationData,
  salaryEmployeeData,
} from "./payload-function";

const baseUrl = Cypress.config().baseUrl;
export const URLs: any = {
  employee: `${baseUrl}/api/v2/pim/employees`,
  job: `${baseUrl}/api/v2/admin/job-titles`,
  location: `${baseUrl}/api/v2/admin/locations`,
  jobDetails: `${baseUrl}/api/v2/admin/locations`,
  jobDelete: `${baseUrl}/api/v2/admin/job-titles`,
  employeeDelete: `${baseUrl}/api/v2/pim/employees`,
  locationDelete: `${baseUrl}/api/v2/admin/locations`,
};
export const addJob = (jobTitle: any) => {
  return cy
    .AddNewJob(URLs.job, jobData(jobTitle))
    .then((res) => res.body.data.id);
};

export const addLocation = (locationName: any, countryCode: any) => {
  return cy
    .AddNewLocation(URLs.location, locationData(locationName, countryCode))
    .then((res) => res.body.data.id);
};

export const addEmployee = (
  firstName: string,
  id: string,
  lastName: string
) => {
  return cy
    .AddNewEmployee(URLs.employee, employeeData(firstName, id, lastName))
    .then((res) => res.body.data.empNumber);
};

export const addJobAndLocationEmployee = (
  jobId: any,
  locId: any,
  empNumber: any
) => {
  cy.api({
    method: "PUT",
    url: `${baseUrl}/api/v2/pim/employees/${empNumber}/job-details`,
    body: jobAndLocationEmployeeData(jobId, locId),
  });
};

export const addSalaryEmployee = (
  empNumber: any,
  salaryComponent: any,
  salaryAmount: any,
  currencyId: any
) => {
  cy.api({
    method: "Post",
    url: `${baseUrl}/api/v2/pim/employees/${empNumber}/salary-components`,
    body: salaryEmployeeData(salaryComponent, salaryAmount, currencyId),
  });
};

export const deleteEmployee = (empNumber: any) => {
  cy.api({
    method: "DELETE",
    url: URLs.employeeDelete,
    body: {
      ids: [empNumber],
    },
  });
};
export const deleteJob = (jobId: any) => {
  cy.api({
    method: "DELETE",
    url: URLs.jobDelete,
    body: {
      ids: [jobId],
    },
  });
};
export const deleteLocation = (LocId: any) => {
  cy.api({
    method: "DELETE",
    url: URLs.locationDelete,
    body: {
      ids: [LocId],
    },
  });
};

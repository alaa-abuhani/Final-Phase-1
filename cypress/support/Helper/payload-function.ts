export const employeeData = (
  firstName: string,
  id: string,
  lastName: string
): any => {
  let employee: any = {
    empPicture: null,
    employeeId: id,
    firstName: firstName,
    lastName: lastName,
    middleName: "",
  };
  return employee;
};

export const jobData = (jobTitle: any): any => {
  let job: any = {
    title: jobTitle,
    description: "",
    specification: null,
    note: "",
  };
  return job;
};
export const jobAndLocationEmployeeData = (jobId: any, locId: any): any => {
  let jobAndLocation: any = {
    joinedDate: null,
    jobTitleId: jobId,
    locationId: locId,
  };
  return jobAndLocation;
};
export const locationData = (locationName: any, countryCode: any): any => {
  let location: any = {
    name: locationName,
    countryCode: countryCode,
    province: "",
    city: "",
    address: "",
    zipCode: "",
    phone: "",
    fax: "",
    note: "",
  };
  return location;
};
export const salaryEmployeeData = (
  salaryComponent: any,
  salaryAmount: any,
  currencyId: string
): any => {
  let salary: any = {
    salaryComponent: salaryComponent,
    salaryAmount: salaryAmount,
    currencyId: currencyId,
    comment: null,
    addDirectDeposit: false,
  };
  return salary;
};

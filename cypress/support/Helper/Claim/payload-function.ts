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
export const userData = (empNum: any, userName: any, password: any) => {
  let user: any = {
    username: userName,
    password: password,
    status: true,
    userRoleId: 2,
    empNumber: empNum,
  };
  return user;
};

export const eventData = (eventName: any): any => {
  let event: any = {
    name: eventName,
    description: "",
    status: true,
  };
  return event;
};

export const ExpensesData = (expensesName: any): any => {
  let Expense: any = {
    name: expensesName,
    description: "",
    status: true,
  };
  return Expense;
};
export const addClaimData = (idEvent: any, currencyId: any): any => {
  let addClaim: any = {
    claimEventId: idEvent,
    currencyId: currencyId,
    remarks: null,
  };
  return addClaim;
};
export const claimExpensesData = (idExpenses: any, date: any, amount: any) => {
  let addClaim: any = {
    expenseTypeId: idExpenses,
    date: date,
    amount: amount,
    note: null,
  };
  return addClaim;
};

export const submitClaimData = () => {
  let submitClaim: any = {
    action: "SUBMIT",
  };
  return submitClaim;
};

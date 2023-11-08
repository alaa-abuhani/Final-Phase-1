import GenericHepler from "../../../Helper/genericFunctions";
import { checkReportName, checkToastMessage } from "./function-assertion";

export const checkReportAssetrion = (
  reportName: string,
  firstHeaderData: any,
  secondHeaderData: any,
  tableData: any,
  tableRowNumber: number
) => {
  //check message
  checkToastMessage();
  //check report name
  checkReportName(reportName);
  //check report first header
  GenericHepler.GenricCheckReportFirstHeader(firstHeaderData);
  //check report second header
  GenericHepler.genricCheckReportSecondHeader(secondHeaderData);
  //check report table row number
  GenericHepler.GenericCheckTableRowNumber(tableRowNumber);
  //check report table cell
  GenericHepler.GenericCheckTableCell(tableData);
};

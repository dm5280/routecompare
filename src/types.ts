import { Theme as MUITheme } from "@mui/material/styles";

declare module "@emotion/react" {
  // tslint:disable-next-line: no-empty-interface
  export interface Theme extends MUITheme {}
}

export interface IDataObj {
  destination: string;
  gateway: string;
  protocol: string;
}

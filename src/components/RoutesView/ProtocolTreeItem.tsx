import { useTheme } from "@mui/material/styles";
import { IDataObj } from "$/types";
import { TreeItem } from "@mui/x-tree-view";
import groupBy from "ramda/src/groupBy";
import difference from "ramda/src/difference";
import propOr from "ramda/src/propOr";
import { intersperseDashToString } from "$/helpers/intersperseDashToString";

import { GatewayTreeItem } from "./GatewayTreeItem";
import { TreeItemLabel } from "./TreeItemLabel";

interface IProps {
  protocol: string;
  rootIdx: string;
  data?: IDataObj[];
  dataToCompare?: IDataObj[];
  isCompareView?: boolean;
}

const MAP_PROTOCOLS: Record<string, string> = {
  "200": "iBGP",
  "20": "eBGP",
  "90": "iEIGRP",
  "170": "eEIGRP",
  "1": "Static",
  "0": "Direct",
  "N/A": "N/A",
};

const filterPrevGateway =
  (dataToCompare: IDataObj[] = []) =>
  (key?: string) =>
    dataToCompare.filter((item) => item.gateway === key);

const filterDiff = (diffData: IDataObj[], protocol: string) =>
  diffData.filter((item) => item.protocol.startsWith(`[${protocol}/`));

export const ProtocolTreeItem = ({
  data = [],
  isCompareView = false,
  dataToCompare = [],
  protocol,
  rootIdx,
}: IProps) => {
  const theme = useTheme();

  const isHighlighted =
    isCompareView &&
    filterDiff(difference([data], [dataToCompare]).flat(2), protocol).length;

  return (
    <TreeItem
      itemId={intersperseDashToString([protocol, rootIdx])}
      label={
        <TreeItemLabel
          qty={data.length}
          label={MAP_PROTOCOLS[protocol]}
          color={isHighlighted ? theme.palette.error.main : undefined}
        />
      }
    >
      {/* {Object.entries(groupedData).map(([key, value], idx) => {
        const prevGateway = getPrevGateway(key);

        return (
          <GatewayTreeItem
            data={value}
            gateway={key}
            dataToCompare={prevGateway}
            isCompareView={isCompareView}
            rootIdx={intersperseDashToString([rootIdx, String(idx)])}
            key={intersperseDashToString([key, rootIdx, String(idx)])}
          />
        );
      })} */}
    </TreeItem>
  );
};

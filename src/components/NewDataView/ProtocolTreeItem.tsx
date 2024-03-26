import symmetricDifference from "ramda/src/symmetricDifference";
import filter from "ramda/src/filter";
import groupBy from "ramda/src/groupBy";
import propOr from "ramda/src/propOr";
import { useTheme } from "@mui/material/styles";
import { IDataObj } from "$/types";
import { TreeItem } from "@mui/x-tree-view";
import { MAP_PROTOCOLS } from "$/constants/config";
import { usePrevDataContext } from "$/providers/PrevDataProvider";
import { intersperseDashToString } from "$/helpers/intersperseDashToString";

import { TreeItemLabel } from "./TreeItemLabel";
import { GatewayTreeItem } from "./GatewayTreeItem";

interface IProps {
  protocol: string;
  rootIdx: string;
  data: IDataObj[];
}

const groupByGateway = groupBy<IDataObj>(propOr("N/A", "gateway"));

const filterDataByProtocol = (protocol: string) =>
  filter((item: IDataObj) => item.protocol.startsWith(`[${protocol}/`));

export const ProtocolTreeItem = ({ protocol, rootIdx, data = [] }: IProps) => {
  const theme = useTheme();
  const { data: prevData } = usePrevDataContext();
  const groupedData = groupByGateway(data);

  const filterData = filterDataByProtocol(protocol);

  const differentData = symmetricDifference(data, filterData(prevData));

  return (
    <TreeItem
      itemId={intersperseDashToString([protocol, rootIdx])}
      label={
        <TreeItemLabel
          qty={Object.keys(data).length}
          label={MAP_PROTOCOLS[protocol]}
          color={differentData.length ? theme.palette.error.main : undefined}
        />
      }
    >
      {Object.entries(groupedData).map(([key, value], idx) => (
        <GatewayTreeItem
          data={value}
          gateway={key}
          rootIdx={intersperseDashToString([rootIdx, String(idx)])}
          key={intersperseDashToString([key, rootIdx, String(idx)])}
        />
      ))}
    </TreeItem>
  );
};

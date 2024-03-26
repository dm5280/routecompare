import symmetricDifference from "ramda/src/symmetricDifference";
import filter from "ramda/src/filter";
import propEq from "ramda/src/propEq";
import { TreeItem } from "@mui/x-tree-view";
import { useTheme } from "@mui/material/styles";
import { IDataObj } from "$/types";
import { intersperseDashToString } from "$/helpers/intersperseDashToString";
import { usePrevDataContext } from "$/providers/PrevDataProvider";

import { DestinationTreeItem } from "./DestinationTreeItem";
import { TreeItemLabel } from "./TreeItemLabel";

interface IProps {
  gateway: string;
  rootIdx: string;
  data?: IDataObj[];
}

const filterDataByGateway = (gateway: string) =>
  filter(propEq(gateway, "gateway"));

export const GatewayTreeItem = ({ data = [], ...props }: IProps) => {
  const theme = useTheme();
  const { data: prevData } = usePrevDataContext();

  const filterData = filterDataByGateway(props.gateway);
  const filteredPrevData = filterData(prevData);

  const differentData = symmetricDifference(data, filteredPrevData);

  return (
    <TreeItem
      itemId={intersperseDashToString([props.gateway, props.rootIdx])}
      label={
        <TreeItemLabel
          qty={data.length}
          label={props.gateway}
          color={differentData.length ? theme.palette.error.main : undefined}
        />
      }
    >
      {data.map((item, idx) => {
        const prevData = filteredPrevData.find(
          (prevItem) =>
            prevItem.destination === item.destination &&
            prevItem.gateway === item.gateway &&
            prevItem.protocol === item.protocol
        );

        return (
          <DestinationTreeItem
            isHighlighted={!prevData}
            destination={item.destination}
            rootIdx={intersperseDashToString([props.rootIdx, String(idx)])}
            key={intersperseDashToString([
              item.destination,
              props.rootIdx,
              String(idx),
            ])}
          />
        );
      })}
    </TreeItem>
  );
};

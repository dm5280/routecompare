import filter from "ramda/src/filter";
import intersection from "ramda/src/intersection";
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
  protocol: string;
  data?: IDataObj[];
}

const filterDataByGateway = (gateway: string) =>
  filter(propEq(gateway, "gateway"));

export const GatewayTreeItem = ({ data = [], ...props }: IProps) => {
  const theme = useTheme();
  const { data: prevData } = usePrevDataContext();

  const filterGatewayData = filterDataByGateway(props.gateway);

  const filteredPrevData = filterGatewayData(prevData);
  const filteredNewData = filterGatewayData(data);

  const differentData = intersection(filteredPrevData, filteredNewData);

  return (
    <TreeItem
      itemId={intersperseDashToString([props.protocol, props.gateway])}
      label={
        <TreeItemLabel
          qty={data.length}
          label={props.gateway}
          color={!differentData.length ? theme.palette.error.main : undefined}
        />
      }
    >
      {data.map((item) => {
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
            rootId={intersperseDashToString([props.protocol, props.gateway])}
            key={intersperseDashToString([
              props.protocol,
              props.gateway,
              item.destination,
            ])}
          />
        );
      })}
    </TreeItem>
  );
};

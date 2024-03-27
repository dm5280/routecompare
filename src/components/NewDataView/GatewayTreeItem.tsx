import filter from "ramda/src/filter";
import difference from "ramda/src/difference";
import symmetricDifference from "ramda/src/symmetricDifference";
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

const filterDataByProtocol = (protocol: string) =>
  filter((item: IDataObj) => item.protocol.startsWith(`[${protocol}/`));

export const GatewayTreeItem = ({ data = [], ...props }: IProps) => {
  const theme = useTheme();
  const { data: prevData } = usePrevDataContext();

  const filterGatewayData = filterDataByGateway(props.gateway);
  const filterProtocolData = filterDataByProtocol(props.protocol);

  const filteredPrevData = filterProtocolData(filterGatewayData(prevData));
  const filteredNewData = filterGatewayData(data);

  const differentData = symmetricDifference(filteredPrevData, filteredNewData);

  return (
    <TreeItem
      itemId={intersperseDashToString([props.protocol, props.gateway])}
      label={
        <TreeItemLabel
          qty={data.length}
          label={props.gateway}
          added={difference(filteredNewData, filteredPrevData).length}
          removed={difference(filteredPrevData, filteredNewData).length}
          color={differentData.length ? theme.palette.error.main : undefined}
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

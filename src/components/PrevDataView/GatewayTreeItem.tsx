import { IDataObj } from "$/types";
import filter from "ramda/src/filter";
import difference from "ramda/src/difference";
import propEq from "ramda/src/propEq";
import { TreeItem } from "@mui/x-tree-view";
import { intersperseDashToString } from "$/helpers/intersperseDashToString";

import { DestinationTreeItem } from "./DestinationTreeItem";
import { TreeItemLabel } from "./TreeItemLabel";
import { useNewDataContext } from "$/providers/NewDataProvider";

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
  const { data: newData } = useNewDataContext();
  const filterGatewayData = filterDataByGateway(props.gateway);
  const filterProtocolData = filterDataByProtocol(props.protocol);

  const filteredPrevData = filterProtocolData(filterGatewayData(data));
  const filteredNewData = filterGatewayData(newData);

  return (
    <TreeItem
      itemId={intersperseDashToString([props.protocol, props.gateway])}
      label={
        <TreeItemLabel
          qty={data.length}
          label={props.gateway}
          removed={difference(filteredPrevData, filteredNewData).length}
        />
      }
    >
      {data.map((item, idx) => (
        <DestinationTreeItem
          destination={item.destination}
          rootId={intersperseDashToString([props.protocol, props.gateway])}
          key={intersperseDashToString([
            props.protocol,
            props.gateway,
            item.destination,
          ])}
        />
      ))}
    </TreeItem>
  );
};

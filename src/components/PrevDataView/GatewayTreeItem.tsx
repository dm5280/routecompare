import { IDataObj } from "$/types";
import { TreeItem } from "@mui/x-tree-view";
import { intersperseDashToString } from "$/helpers/intersperseDashToString";

import { DestinationTreeItem } from "./DestinationTreeItem";
import { TreeItemLabel } from "./TreeItemLabel";

interface IProps {
  gateway: string;
  protocol: string;
  isCompareView?: boolean;
  data?: IDataObj[];
  dataToCompare?: IDataObj[];
}

export const GatewayTreeItem = ({ data = [], ...props }: IProps) => (
  <TreeItem
    itemId={intersperseDashToString([props.protocol, props.gateway])}
    label={<TreeItemLabel qty={data.length} label={props.gateway} />}
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

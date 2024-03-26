import { IDataObj } from "$/types";
import { TreeItem } from "@mui/x-tree-view";
import { intersperseDashToString } from "$/helpers/intersperseDashToString";

import { DestinationTreeItem } from "./DestinationTreeItem";
import { TreeItemLabel } from "./TreeItemLabel";

interface IProps {
  gateway: string;
  rootIdx: string;
  isCompareView?: boolean;
  data?: IDataObj[];
  dataToCompare?: IDataObj[];
}

export const GatewayTreeItem = ({ data = [], ...props }: IProps) => (
  <TreeItem
    itemId={props.gateway + "-" + props.rootIdx}
    label={<TreeItemLabel qty={data.length} label={props.gateway} />}
  >
    {data.map((item, idx) => (
      <DestinationTreeItem
        destination={item.destination}
        rootIdx={intersperseDashToString([props.rootIdx, String(idx)])}
        key={intersperseDashToString([
          item.destination,
          props.rootIdx,
          String(idx),
        ])}
      />
    ))}
  </TreeItem>
);

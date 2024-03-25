import { IDataObj } from "$/types";
import { TreeItem } from "@mui/x-tree-view";

import { DestinationTreeItem } from "./DestinationTreeItem";
import { TreeItemLabel } from "./TreeItemLabel";

interface IProps {
  gateway: string;
  rootIdx: string;
  data?: IDataObj[];
}

export const GatewayTreeItem = ({ data = [], ...props }: IProps) => (
  <TreeItem
    itemId={props.gateway + "-" + props.rootIdx}
    label={<TreeItemLabel label={props.gateway} qty={data.length} />}
  >
    {data.map((item, idx) => (
      <DestinationTreeItem
        destination={item.destination}
        rootIdx={props.rootIdx + "-" + idx}
        key={item.destination + "-" + props.rootIdx + "-" + idx}
      />
    ))}
  </TreeItem>
);

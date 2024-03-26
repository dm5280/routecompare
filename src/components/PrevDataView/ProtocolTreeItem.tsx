import { IDataObj } from "$/types";
import { TreeItem } from "@mui/x-tree-view";
import { intersperseDashToString } from "$/helpers/intersperseDashToString";
import { MAP_PROTOCOLS } from "$/constants/config";

import { TreeItemLabel } from "./TreeItemLabel";
import { GatewayTreeItem } from "./GatewayTreeItem";

interface IProps {
  protocol: string;
  data: Partial<Record<string, IDataObj[]>>;
}

export const ProtocolTreeItem = ({ protocol, data }: IProps) => (
  <TreeItem
    itemId={protocol}
    label={
      <TreeItemLabel
        qty={Object.keys(data).length}
        label={MAP_PROTOCOLS[protocol]}
      />
    }
  >
    {Object.entries(data).map(([key, value]) => (
      <GatewayTreeItem
        data={value}
        gateway={key}
        protocol={protocol}
        key={intersperseDashToString([protocol, key])}
      />
    ))}
  </TreeItem>
);

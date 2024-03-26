import { IDataObj } from "$/types";
import { TreeItem } from "@mui/x-tree-view";
import { intersperseDashToString } from "$/helpers/intersperseDashToString";
import { MAP_PROTOCOLS } from "$/constants/config";

import { TreeItemLabel } from "./TreeItemLabel";
import { GatewayTreeItem } from "./GatewayTreeItem";

interface IProps {
  protocol: string;
  rootIdx: string;
  data: Partial<Record<string, IDataObj[]>>;
}

export const ProtocolTreeItem = ({ protocol, rootIdx, data }: IProps) => (
  <TreeItem
    itemId={intersperseDashToString([protocol, rootIdx])}
    label={
      <TreeItemLabel
        qty={Object.keys(data).length}
        label={MAP_PROTOCOLS[protocol]}
      />
    }
  >
    {Object.entries(data).map(([key, value], idx) => (
      <GatewayTreeItem
        data={value}
        gateway={key}
        rootIdx={intersperseDashToString([rootIdx, String(idx)])}
        key={intersperseDashToString([key, rootIdx, String(idx)])}
      />
    ))}
  </TreeItem>
);

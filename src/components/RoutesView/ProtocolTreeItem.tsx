import { IDataObj } from "$/types";
import { TreeItem } from "@mui/x-tree-view";
import groupBy from "ramda/src/groupBy";
import propOr from "ramda/src/propOr";
import { GatewayTreeItem } from "./GatewayTreeItem";
import { TreeItemLabel } from "./TreeItemLabel";

interface IProps {
  protocol: string;
  rootIdx: string;
  data?: IDataObj[];
}

const groupByGateway = groupBy<IDataObj>(propOr("N/A", "gateway"));

export const ProtocolTreeItem = ({ data = [], protocol, rootIdx }: IProps) => {
  const groupedData = groupByGateway(data);

  return (
    <TreeItem
      itemId={protocol + "-" + rootIdx}
      label={<TreeItemLabel label={protocol} qty={data.length} />}
    >
      {Object.entries(groupedData).map(([key, value], idx) => (
        <GatewayTreeItem
          data={value}
          gateway={key}
          rootIdx={rootIdx + "-" + idx}
          key={key + "-" + rootIdx + "-" + idx}
        />
      ))}
    </TreeItem>
  );
};

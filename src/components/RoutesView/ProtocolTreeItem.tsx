import { useTheme } from "@mui/material/styles";
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
  dataToCompare?: IDataObj[];
  isCompareView?: boolean;
}

const groupByGateway = groupBy<IDataObj>(propOr("N/A", "gateway"));

const filterPrevGateway =
  (dataToCompare: IDataObj[] = []) =>
  (key?: string) =>
    dataToCompare.filter((item) => item.gateway === key);

export const ProtocolTreeItem = ({
  data = [],
  isCompareView = false,
  dataToCompare = [],
  protocol,
  rootIdx,
}: IProps) => {
  const groupedData = groupByGateway(data);
  const theme = useTheme();

  const isHighlighted =
    dataToCompare.length && dataToCompare.length !== data.length;

  const getPrevGateway = filterPrevGateway(dataToCompare);

  return (
    <TreeItem
      itemId={protocol + "-" + rootIdx}
      label={
        <TreeItemLabel
          label={protocol}
          qty={data.length}
          color={isHighlighted ? theme.palette.error.main : undefined}
        />
      }
    >
      {Object.entries(groupedData).map(([key, value], idx) => {
        const prevGateway = getPrevGateway(key);

        return (
          <GatewayTreeItem
            data={value}
            gateway={key}
            dataToCompare={prevGateway}
            rootIdx={rootIdx + "-" + idx}
            isCompareView={isCompareView}
            key={key + "-" + rootIdx + "-" + idx}
          />
        );
      })}
    </TreeItem>
  );
};

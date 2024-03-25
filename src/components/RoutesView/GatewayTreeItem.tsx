import { IDataObj } from "$/types";
import { useTheme } from "@mui/material/styles";
import { TreeItem } from "@mui/x-tree-view";

import { DestinationTreeItem } from "./DestinationTreeItem";
import { TreeItemLabel } from "./TreeItemLabel";

interface IProps {
  gateway: string;
  rootIdx: string;
  isCompareView?: boolean;
  data?: IDataObj[];
  dataToCompare?: IDataObj[];
}

const filterPrevDestination =
  (dataToCompare: IDataObj[] = []) =>
  (key?: string) =>
    dataToCompare.filter((item) => item.destination === key);

export const GatewayTreeItem = ({
  data = [],
  isCompareView = false,
  dataToCompare = [],
  ...props
}: IProps) => {
  const theme = useTheme();

  const isHighlighted = isCompareView && dataToCompare.length !== data.length;

  const getPrevDestination = filterPrevDestination(dataToCompare);

  return (
    <TreeItem
      itemId={props.gateway + "-" + props.rootIdx}
      label={
        <TreeItemLabel
          qty={data.length}
          label={props.gateway}
          color={isHighlighted ? theme.palette.error.main : undefined}
        />
      }
    >
      {data.map((item, idx) => {
        const prevDestination = getPrevDestination(item.destination);

        return (
          <DestinationTreeItem
            destination={item.destination}
            rootIdx={props.rootIdx + "-" + idx}
            isHighlighted={isCompareView && !prevDestination.length}
            key={item.destination + "-" + props.rootIdx + "-" + idx}
          />
        );
      })}
    </TreeItem>
  );
};

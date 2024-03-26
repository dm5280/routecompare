import { TreeItem } from "@mui/x-tree-view";
import { useTheme } from "@mui/material/styles";

import { TreeItemLabel } from "./TreeItemLabel";
import { intersperseDashToString } from "$/helpers/intersperseDashToString";

interface IProps {
  destination: string;
  rootId: string;
  isHighlighted?: boolean;
}

export const DestinationTreeItem = ({
  isHighlighted = false,
  ...props
}: IProps) => {
  const theme = useTheme();

  return (
    <TreeItem
      itemId={intersperseDashToString([props.rootId, props.destination])}
      label={
        <TreeItemLabel
          label={props.destination || "N/A"}
          color={isHighlighted ? theme.palette.error.main : undefined}
        />
      }
    />
  );
};

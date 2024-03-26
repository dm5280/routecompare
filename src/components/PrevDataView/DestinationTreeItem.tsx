import { TreeItem } from "@mui/x-tree-view";
import { useTheme } from "@mui/material/styles";

import { TreeItemLabel } from "./TreeItemLabel";

interface IProps {
  destination: string;
  rootIdx: string;
  isHighlighted?: boolean;
}

export const DestinationTreeItem = ({
  isHighlighted = false,
  ...props
}: IProps) => {
  const theme = useTheme();

  return (
    <TreeItem
      itemId={props.destination + "-" + props.rootIdx}
      label={
        <TreeItemLabel
          label={props.destination || "N/A"}
          color={isHighlighted ? theme.palette.error.main : undefined}
        />
      }
    />
  );
};

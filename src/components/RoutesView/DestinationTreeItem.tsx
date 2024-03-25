import { TreeItem } from "@mui/x-tree-view";

interface IProps {
  destination: string;
  rootIdx: string;
}

export const DestinationTreeItem = (props: IProps) => (
  <TreeItem
    label={props.destination}
    itemId={props.destination + "-" + props.rootIdx}
  />
);

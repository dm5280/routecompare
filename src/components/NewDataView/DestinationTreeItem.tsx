import { TreeItem } from "@mui/x-tree-view";
import { useTheme } from "@mui/material/styles";
import append from "ramda/src/append";
import propEq from "ramda/src/propEq";
import uniq from "ramda/src/uniq";
import compose from "ramda/src/compose";
import { intersperseDashToString } from "$/helpers/intersperseDashToString";
import { usePrevDataContext } from "$/providers/PrevDataProvider";
import { normalizeProtocol } from "$/helpers/normalizeProtocol";

import { TreeItemLabel } from "./TreeItemLabel";

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
  const { setSelectedDestination, setExpandedItems, data } =
    usePrevDataContext();

  const itemId = intersperseDashToString([props.rootId, props.destination]);

  const handleClick = () => {
    const prevDest = data.find(propEq(props.destination, "destination"));

    if (prevDest) {
      const prevDestId = intersperseDashToString([
        normalizeProtocol(prevDest.protocol),
        prevDest.gateway,
        prevDest.destination,
      ]);
      setSelectedDestination((prevSelectedDest) =>
        prevSelectedDest === prevDestId ? null : prevDestId
      );

      setExpandedItems(
        compose(
          uniq,
          append(
            intersperseDashToString([
              normalizeProtocol(prevDest.protocol),
              prevDest.gateway,
            ])
          ),
          append(normalizeProtocol(prevDest.protocol))
        )
      );
    }
  };

  return (
    <TreeItem
      onClick={handleClick}
      itemId={itemId}
      label={
        <TreeItemLabel
          label={props.destination || "N/A"}
          color={isHighlighted ? theme.palette.error.main : undefined}
        />
      }
    />
  );
};

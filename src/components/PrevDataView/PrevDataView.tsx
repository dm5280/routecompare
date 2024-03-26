import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import groupBy from "ramda/src/groupBy";
import propOr from "ramda/src/propOr";
import compose from "ramda/src/compose";
import mapObjIndexed from "ramda/src/mapObjIndexed";
import { IDataObj } from "$/types";
import Typography from "@mui/material/Typography";
import { usePrevDataContext } from "$/providers/PrevDataProvider";

import { ProtocolTreeItem } from "./ProtocolTreeItem";

const PROTOCOL_REGEX = /\[(\d+)\/\d+\]/;

const handleProtocol = (data: IDataObj): string => {
  const splitedProtocol = data.protocol?.match(PROTOCOL_REGEX);

  if (!splitedProtocol) {
    return "N/A";
  }

  return splitedProtocol[1] || "N/A";
};

const groupByProtocol = groupBy<IDataObj>(handleProtocol);

const groupByGateway = groupBy<IDataObj>(propOr("N/A", "gateway"));

const handleGateway = mapObjIndexed(groupByGateway);

const transformData = compose(handleGateway, groupByProtocol as any);

export const PrevDataView = () => {
  const {
    data,
    selectedDestination,
    expandedItems,
    setExpandedItems,
    setSelectedDestination,
  } = usePrevDataContext();
  const groupedData = transformData(data);

  const handleExpandedItemsChange = (
    _: React.SyntheticEvent,
    itemIds: string[]
  ) => {
    setExpandedItems(itemIds);
  };

  const handleSelectedItemsChange = (
    _: React.SyntheticEvent,
    id: string | null
  ) => {
    setSelectedDestination(id);
  };

  if (!data.length) {
    return (
      <Typography align="center" color="textSecondary">
        Please, upload a file
      </Typography>
    );
  }

  return (
    <SimpleTreeView
      expandedItems={expandedItems}
      selectedItems={selectedDestination}
      onSelectedItemsChange={handleSelectedItemsChange}
      onExpandedItemsChange={handleExpandedItemsChange}
    >
      {Object.entries(groupedData).map(([key, value]) => (
        <ProtocolTreeItem data={value} protocol={key} key={key} />
      ))}
    </SimpleTreeView>
  );
};

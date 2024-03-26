import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import groupBy from "ramda/src/groupBy";
import prop from "ramda/src/prop";
import compose from "ramda/src/compose";
import { IDataObj } from "$/types";
import Typography from "@mui/material/Typography";
import { useNewDataContext } from "$/providers/NewDataProvider";
import { normalizeProtocol } from "$/helpers/normalizeProtocol";

import { ProtocolTreeItem } from "./ProtocolTreeItem";

const groupByProtocol = groupBy<IDataObj>(
  compose(normalizeProtocol, prop("protocol"))
);

export const NewDataView = () => {
  const { data } = useNewDataContext();
  const groupedData = groupByProtocol(data);

  if (!data.length) {
    return (
      <Typography align="center" color="textSecondary">
        Please, upload a file
      </Typography>
    );
  }

  return (
    <SimpleTreeView>
      {Object.entries(groupedData).map(([key, value], idx) => (
        <ProtocolTreeItem data={value} protocol={key} key={key} />
      ))}
    </SimpleTreeView>
  );
};

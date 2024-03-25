import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import groupBy from "ramda/src/groupBy";

import { IDataObj } from "$/types";
import { ProtocolTreeItem } from "./ProtocolTreeItem";

interface IProps {
  data: IDataObj[];
}

const PROTOCOL_REGEX = /\[(\d+)\/\d+\]/;

const handleProtocol = (data: IDataObj) => {
  const splitedProtocol = data.protocol?.match(PROTOCOL_REGEX);

  if (!splitedProtocol) {
    return "N/A";
  }

  return splitedProtocol[1] || "N/A";
};

const groupByProtocol = groupBy<IDataObj>(handleProtocol);

export const RoutesView = (props: IProps) => {
  const groupedData = groupByProtocol(props.data);

  return (
    <SimpleTreeView>
      {Object.entries(groupedData).map(([key, value], idx) => (
        <ProtocolTreeItem
          key={key + "-" + idx}
          data={value}
          protocol={key}
          rootIdx={String(idx)}
        />
      ))}
    </SimpleTreeView>
  );
};

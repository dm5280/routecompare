import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import groupBy from "ramda/src/groupBy";
import { IDataObj } from "$/types";

import { ProtocolTreeItem } from "./ProtocolTreeItem";

interface IProps {
  data: IDataObj[];
  dataToCompare?: IDataObj[];
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

const filterPrevProtocol =
  (dataToCompare: IDataObj[] = []) =>
  (key?: string) =>
    dataToCompare.filter(
      (item) => item.protocol === key || !!item.protocol?.startsWith(`[${key}/`)
    );

export const RoutesView = (props: IProps) => {
  const groupedData = groupByProtocol(props.data);

  const getPrevProtocol = filterPrevProtocol(props.dataToCompare);

  return (
    <SimpleTreeView>
      {Object.entries(groupedData).map(([key, value], idx) => {
        const prevProtocol = getPrevProtocol(key);

        return (
          <ProtocolTreeItem
            data={value}
            protocol={key}
            rootIdx={String(idx)}
            key={key + "-" + idx}
            dataToCompare={prevProtocol}
            isCompareView={!!props.dataToCompare?.length}
          />
        );
      })}
    </SimpleTreeView>
  );
};

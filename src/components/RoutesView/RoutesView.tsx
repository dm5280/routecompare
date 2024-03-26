import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import groupBy from "ramda/src/groupBy";
import propOr from "ramda/src/propOr";
import compose from "ramda/src/compose";
import mapObjIndexed from "ramda/src/mapObjIndexed";
import { IDataObj } from "$/types";
import { intersperseDashToString } from "$/helpers/intersperseDashToString";

import { ProtocolTreeItem } from "./ProtocolTreeItem";

interface IProps {
  data: IDataObj[];
  dataToCompare?: IDataObj[];
}

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

export const RoutesView = ({ dataToCompare = [], ...props }: IProps) => {
  const groupedData = groupByProtocol(props.data);

  return (
    <SimpleTreeView>
      {Object.entries(groupedData).map(([key, value], idx) => (
        <ProtocolTreeItem
          data={value}
          protocol={key}
          rootIdx={String(idx)}
          dataToCompare={dataToCompare}
          isCompareView={!!dataToCompare?.length}
          key={intersperseDashToString([key, String(idx)])}
        />
      ))}
    </SimpleTreeView>
  );
};

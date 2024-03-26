import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import groupBy from "ramda/src/groupBy";
import propOr from "ramda/src/propOr";
import compose from "ramda/src/compose";
import mapObjIndexed from "ramda/src/mapObjIndexed";
import { IDataObj } from "$/types";
import Typography from "@mui/material/Typography";
import { intersperseDashToString } from "$/helpers/intersperseDashToString";
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
  const { data } = usePrevDataContext();
  const groupedData = transformData(data);

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
        <ProtocolTreeItem
          data={value}
          protocol={key}
          rootIdx={String(idx)}
          key={intersperseDashToString([key, String(idx)])}
        />
      ))}
    </SimpleTreeView>
  );
};

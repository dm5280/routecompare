import Alert from "@mui/material/Alert";
import symmetricDifference from "ramda/src/symmetricDifference";
import difference from "ramda/src/difference";
import { useNewDataContext } from "$/providers/NewDataProvider";
import { usePrevDataContext } from "$/providers/PrevDataProvider";

export const CompareSummary = () => {
  const { data: prevData } = usePrevDataContext();
  const { data: newData } = useNewDataContext();

  const totalChanges = symmetricDifference(prevData, newData);
  const removed = difference(prevData, newData);
  const added = difference(newData, prevData);

  return (
    <>
      {!totalChanges.length && (
        <Alert severity="success">No difference found</Alert>
      )}
      {totalChanges.length && (
        <Alert severity="warning">
          Found {totalChanges.length} differences - {added.length} directions
          added, {removed.length} directions removed
        </Alert>
      )}
    </>
  );
};

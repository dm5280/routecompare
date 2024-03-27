"use client";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { UploadFile } from "$/components/UploadFile";
import { useMediaQuery } from "$/hooks/useMediaQuery";
import { usePrevDataContext } from "$/providers/PrevDataProvider";
import { useNewDataContext } from "$/providers/NewDataProvider";
import { ScrollWrapper } from "$/components/ScrollWrapper";
import { PrevDataView } from "$/components/PrevDataView";
import { NewDataView } from "$/components/NewDataView";
import { CompareSummary } from "../CompareSummary";

const mapDataToKeys = (data: string[][]) =>
  data.map(([destination = "N/A", gateway = "N/A", protocol = "N/A"]) => ({
    destination,
    gateway,
    protocol,
  }));

export const RoutesCompare = () => {
  const { isUpMd } = useMediaQuery();
  const { setData: setPrevData, data: prevData } = usePrevDataContext();
  const { setData: setNewData, data: newData } = useNewDataContext();

  const onRightUploadAccepted = (result: { data: string[][] }) =>
    setNewData(mapDataToKeys(result.data));
  const onLeftUploadAccepted = (result: { data: string[][] }) =>
    setPrevData(mapDataToKeys(result.data));

  const onRightUploadRemoved = () => setNewData([]);
  const onLeftUploadRemoved = () => setPrevData([]);

  return (
    <Grid
      gap={4}
      container
      wrap="nowrap"
      height="100%"
      direction={{ xs: "column", md: "row" }}
    >
      <Grid item xs display="flex" alignItems="center" justifyContent="center">
        <ScrollWrapper>
          <Grid container gap={4} direction="column">
            <Grid item>
              <UploadFile
                onRemoveFile={onLeftUploadRemoved}
                onUploadAccepted={onLeftUploadAccepted}
              />
            </Grid>
            <Grid item xs>
              <PrevDataView />
            </Grid>
          </Grid>
        </ScrollWrapper>
      </Grid>
      <Grid item>
        <Divider orientation={isUpMd ? "vertical" : "horizontal"} />
      </Grid>
      <Grid item xs display="flex" alignItems="center" justifyContent="center">
        <ScrollWrapper>
          <Grid
            gap={4}
            container
            direction="column"
            sx={{ overflowY: "scroll" }}
          >
            <Grid item>
              <UploadFile
                onUploadAccepted={onRightUploadAccepted}
                onRemoveFile={onRightUploadRemoved}
              />
            </Grid>
            <Grid item xs>
              <NewDataView />
            </Grid>
            {!!prevData.length && !!newData.length && (
              <Grid item>
                <CompareSummary />
              </Grid>
            )}
          </Grid>
        </ScrollWrapper>
      </Grid>
    </Grid>
  );
};

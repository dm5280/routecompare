"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import { UploadFile } from "$/components/UploadFile";
import { useMediaQuery } from "$/hooks/useMediaQuery";
import { RoutesView } from "$/components/RoutesView";
import { ScrollWrapper } from "../ScrollWrapper";

const mapDataToKeys = (data: string[][]) =>
  data.map(
    ([destination = "N/A", gateway = "N/A", protocol = "N/A"]) =>
      protocol && {
        destination,
        gateway,
        protocol,
      }
  );

export const RoutesCompare = () => {
  const { isUpMd } = useMediaQuery();
  const [leftData, setLeftData] = useState<string[][]>([]);
  const [rightData, setRightData] = useState<string[][]>([]);

  const onRightUploadAccepted = (result: { data: string[][] }) =>
    setRightData(result.data);
  const onLeftUploadAccepted = (result: { data: string[][] }) =>
    setLeftData(result.data);

  const onRightUploadRemoved = () => setRightData([]);
  const onLeftUploadRemoved = () => setLeftData([]);

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
                onUploadAccepted={onLeftUploadAccepted}
                onRemoveFile={onLeftUploadRemoved}
              />
            </Grid>
            {!!leftData.length && (
              <Grid item xs>
                <RoutesView data={mapDataToKeys(leftData)} />
              </Grid>
            )}
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
            {!!rightData.length && (
              <Grid item xs>
                <RoutesView
                  data={mapDataToKeys(rightData)}
                  dataToCompare={mapDataToKeys(leftData)}
                />
              </Grid>
            )}
          </Grid>
        </ScrollWrapper>
      </Grid>
    </Grid>
  );
};

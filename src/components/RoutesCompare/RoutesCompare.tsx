"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import { UploadFile } from "$/components/UploadFile";
import { useMediaQuery } from "$/hooks/useMediaQuery";
import { RoutesView } from "$/components/RoutesView";
import { ScrollWrapper } from "../ScrollWrapper";

// Destination/Gateway/Protocol.
const mapDataToKeys = (data: string[][]) =>
  data.map(([destination, gateway, protocol]) => ({
    destination,
    gateway,
    protocol,
  }));

export const RoutesCompare = () => {
  const { isUpMd } = useMediaQuery();
  const [leftData, setLeftData] = useState<string[][]>([]);
  const [rightData, setRightData] = useState<string[][]>([]);

  const onRightUploadAccepted = (result: { data: string[][] }) =>
    setRightData(result.data);
  const onLeftUploadAccepted = (result: { data: string[][] }) =>
    setLeftData(result.data);

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
              <UploadFile onUploadAccepted={onLeftUploadAccepted} />
            </Grid>
            <Grid item xs>
              <RoutesView data={mapDataToKeys(leftData)} />
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
            container
            gap={4}
            direction="column"
            sx={{ overflowY: "scroll" }}
          >
            <Grid item>
              <UploadFile onUploadAccepted={onRightUploadAccepted} />
            </Grid>
            <Grid item xs>
              <RoutesView data={mapDataToKeys(rightData)} />
            </Grid>
          </Grid>
        </ScrollWrapper>
      </Grid>
    </Grid>
  );
};

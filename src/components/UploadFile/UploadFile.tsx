"use client";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useCSVReader } from "react-papaparse";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

interface IProps {
  onUploadAccepted: (results: { data: string[][] }) => void;
}

export const UploadFile = (props: IProps) => {
  const theme = useTheme();
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={props.onUploadAccepted}>
      {({ getRootProps, acceptedFile, getRemoveFileProps }: any) => (
        <>
          <Grid container spacing={2}>
            <Grid item>
              <Button {...getRootProps()} startIcon={<UploadFileIcon />}>
                Upload file
              </Button>
            </Grid>
            <Grid item xs>
              <Box
                px={2}
                border={1}
                height="100%"
                display="flex"
                borderRadius={1}
                alignItems="center"
                borderColor={theme.palette.divider}
              >
                <Typography>{acceptedFile && acceptedFile.name}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Button
                {...getRemoveFileProps()}
                color="error"
                startIcon={<DeleteIcon />}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </CSVReader>
  );
};

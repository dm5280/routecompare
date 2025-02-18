import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface IProps {
  label: string;
  color?: string;
  qty?: number | string;
  added?: number;
}

export const TreeItemLabel = (props: IProps) => (
  <Stack direction="row" alignItems="center">
    <Typography color={props.color}>{props.label}</Typography>
    <Box flexGrow={1} ml={1}>
      {!!props.added && (
        <Chip
          label={`+${props.added}`}
          size="small"
          color="success"
          variant="outlined"
          sx={{ mr: 1 }}
        />
      )}
    </Box>
    {props.qty && <Typography color={props.color}>{props.qty}</Typography>}
  </Stack>
);

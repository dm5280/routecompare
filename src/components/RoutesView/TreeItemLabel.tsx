import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface IProps {
  label: string;
  qty: number | string;
}

export const TreeItemLabel = (props: IProps) => (
  <Stack direction="row" justifyContent="space-between">
    <Typography>{props.label}</Typography>
    <Typography>{props.qty}</Typography>
  </Stack>
);

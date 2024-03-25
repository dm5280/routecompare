import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface IProps {
  label: string;
  color?: string;
  qty?: number | string;
}

export const TreeItemLabel = (props: IProps) => (
  <Stack direction="row" justifyContent="space-between">
    <Typography color={props.color}>{props.label}</Typography>
    {props.qty && <Typography color={props.color}>{props.qty}</Typography>}
  </Stack>
);

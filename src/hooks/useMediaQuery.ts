import { useTheme } from "@mui/material/styles";
import useMUIMediaQuery from "@mui/material/useMediaQuery";

export const useMediaQuery = () => {
  const theme = useTheme();
  const isUpMd = useMUIMediaQuery(theme.breakpoints.up("md"));
  const isUpSm = useMUIMediaQuery(theme.breakpoints.up("sm"));
  const isUpLg = useMUIMediaQuery(theme.breakpoints.up("lg"));

  return {
    isUpMd,
    isUpLg,
    isUpSm,
  };
};

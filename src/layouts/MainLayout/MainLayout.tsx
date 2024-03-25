import Box from "@mui/material/Box";
import { ThemeRegistry } from "$/components/ThemeRegistry";

export const MainLayout = (props: React.PropsWithChildren) => (
  <ThemeRegistry>
    <Box component="main">{props.children}</Box>
  </ThemeRegistry>
);

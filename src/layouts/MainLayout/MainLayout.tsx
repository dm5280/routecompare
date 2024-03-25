import Box from "@mui/material/Box";
import { ThemeRegistry } from "$/components/ThemeRegistry";

export const MainLayout = (props: React.PropsWithChildren) => (
  <ThemeRegistry>
    <Box component="main" height="100%" p={4}>
      {props.children}
    </Box>
  </ThemeRegistry>
);

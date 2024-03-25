import Box from "@mui/material/Box";

export const ScrollWrapper = (props: React.PropsWithChildren) => (
  <Box
    height="100%"
    width="100%"
    sx={{
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        display: "none",
        width: 0,
      },
    }}
    {...props}
  />
);

"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { css, Global as EmotionGlobal, useTheme } from "@emotion/react";

export const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <EmotionGlobal
        styles={css`
          * {
            font-family: ${theme.typography.fontFamily};
            font-weight: ${theme.typography.fontWeightRegular};
            font-size: ${theme.typography.fontSize}px;
          }
          html,
          body {
            height: 100%;
          }
          body {
            display: flex;
            flex-direction: column;
          }
        `}
      />
    </>
  );
};

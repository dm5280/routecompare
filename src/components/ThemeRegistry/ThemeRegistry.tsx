"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { generateTheme } from "$/constants/theme";
import { GlobalStyles } from "$/components/GlobalStyles";

import NextAppDirEmotionCacheProvider from "./EmotionCache";

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={generateTheme("dark")}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}

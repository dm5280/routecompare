import compose from "ramda/src/compose";
import { Montserrat } from "next/font/google";
import { PaletteMode } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const montserrat = Montserrat({ subsets: ["latin"] });

export const COLOR_PRIMARY = "#A53ECC";

export const FONT_FAMILY = montserrat.style.fontFamily;

const themeConfig = (mode: PaletteMode = "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: COLOR_PRIMARY,
      },
    },
    typography: {
      fontFamily: FONT_FAMILY,
    },
  });

export const generateTheme = compose(responsiveFontSizes, themeConfig);

export const CONTENT_MAX_WIDTH = 1032;

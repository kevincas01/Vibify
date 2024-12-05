"use client";  // Mark this as a client component

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNode } from "react";

const ClientThemeWrapper = ({ children }: { children: ReactNode }) => {
  const theme = createTheme({
    components: {
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: 'gray', 
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ClientThemeWrapper;

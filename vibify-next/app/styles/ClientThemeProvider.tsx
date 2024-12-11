"use client"; // Mark this as a client component

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNode } from "react";

const ClientThemeWrapper = ({ children }: { children: ReactNode }) => {
  const theme = createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: 'black',
            color: 'white',
            overflow: 'auto', // Allow scrolling when content overflows
      
            /* For Chrome, Safari, and newer Edge */
            '&::-webkit-scrollbar': {
              display: 'none', // Hide the scrollbar
            },
      
            /* For Firefox */
            scrollbarWidth: 'none', // Hide scrollbar in Firefox
          },
        },
      },
      
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: "gray",
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ClientThemeWrapper;

import { createTheme } from "@mui/material";
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgba(0, 0, 0, 1)",
    },
    secondary: {
      main: "rgba(255, 0, 0, 1)",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: "white",
            background: "none",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            background: "none",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: "white",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: "rgba(130, 0, 0, 1)",
        },
        list: {
          color: "red",
          '&[role="menu"]': {
            color: "rgba(221, 218, 0, 1)",
          },
        },
      },
    },
  },
});

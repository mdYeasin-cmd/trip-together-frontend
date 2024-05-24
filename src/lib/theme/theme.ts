import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3AB0A2",
    },
    secondary: {
      main: "#35A29F",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          padding: "8px 24px",
        },
      },
      variants: [
        {
          props: (props) => props.variant === "contained",
          style: {
            color: "#FFFFFF",
          },
        },
      ],
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
});

theme.shadows[1] = "0px 5px 22px lightgray";

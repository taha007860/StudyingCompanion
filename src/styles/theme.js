import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  platte: {
    mode: "light",
  },
  typography: { fontFamily: ["Space Grotesk", "sans serif"].join(",") },
});

export default theme;

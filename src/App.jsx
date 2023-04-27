import Views from "./Views";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Header />
          <Views />
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

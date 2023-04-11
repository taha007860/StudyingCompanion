import Views from "./Views";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <CssBaseline>
      <BrowserRouter>
        <Header />
        <Views />
      </BrowserRouter>
    </CssBaseline>
  );
}

export default App;

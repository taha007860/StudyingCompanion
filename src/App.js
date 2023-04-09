import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Views from "./Views";
import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { auth } from "./config/firebase";

function App() {
  let authStatus = auth.currentUser;
  useEffect(() => {
    authStatus = auth.currentUser;
  }, []);

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

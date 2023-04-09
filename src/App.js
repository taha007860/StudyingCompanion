import Views from "./Views";
import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { auth } from "./config/firebase";

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
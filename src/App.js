import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import Views from "./Views";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from 'styles/theme';

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

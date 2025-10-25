import "./App.css";
import Climate from "./Climate";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["IBM"],
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Climate />
      </ThemeProvider>
    </>
  );
}

export default App;

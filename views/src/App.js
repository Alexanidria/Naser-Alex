import logo from "./logo.svg";
import "./App.css";

import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  // UNSAFE_RouteContext,
} from "react-router-dom";

import {
  ThemeProvider,
  createTheme,
  // useColorScheme,
} from "@mui/material/styles";

import Root from "./pages/main/Root";
import Mainapp from "./pages/main/Mainapp";


const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Mainapp />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>     */}
      </ThemeProvider>
    </>
  );
}

export default App;

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

import Car from "./pages/items/car/car";
import CarCreate from "./pages/items/car/carCreate";
import CarInfo from "./pages/items/car/carInfo";
import CarUpdate from "./pages/items/car/carUpdate";

import Genral from "./pages/items/genral/genral";
import GenralCreate from "./pages/items/genral/genralCreate";
import GenralInfo from "./pages/items/genral/genralInfo";
import GenralUpdate from "./pages/items/genral/genralUpdate";

import Item from "./pages/items/item/item";
import ItemCreate from "./pages/items/item/itemCreate";
import ItemInfo from "./pages/items/item/itemInfo";
import ItemUpdate from "./pages/items/item/itemUpdate";

import StoreSupler from "./pages/items/storeSupler/storeSupler";
import StoreSuplerCreate from "./pages/items/storeSupler/storeSuplerCreate";
import StoreSuplerInfo from "./pages/items/storeSupler/storeSuplerInfo";
import StoreSuplerUpdate from "./pages/items/storeSupler/storeSuplerUpdate";

import Unit from "./pages/items/unit/unit";
import UnitCreate from "./pages/items/unit/unitCreate";
import UnitInfo from "./pages/items/unit/unitInfo";
import UnitUpdate from "./pages/items/unit/unitUpdate";

import Store from "./pages/stored/store/store";
import StoreCreate from "./pages/stored/store/storeCreate";
import StoreInfo from "./pages/stored/store/storeInfo";
import StoreUpdate from "./pages/stored/store/storeUpdate";

import TranMove from "./pages/stored/tranMove/tranMove";
import TranMoveCreate from "./pages/stored/tranMove/tranMoveCreate";
import TranMoveInfo from "./pages/stored/tranMove/tranMoveInfo";
import TranMoveUpdate from "./pages/stored/tranMove/tranMoveUpdate";

import User from "./pages/users/user/user";
import UserCreate from "./pages/users/user/userCreate";
import UserInfo from "./pages/users/user/userInfo";
import UserUpdate from "./pages/users/user/userUpdate";
import UserActive from "./pages/users/user/userUpdateActive";
import UserPasswd from "./pages/users/user/userUpdatePasswd";

import DataGrid from "./pages/component/dataGridST";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Mainapp />} />
      {/**** Store ****/}
      {/* car */}
      <Route path="/store/car" element={<Car />} />
      <Route path="/store/car/new" element={<CarCreate />} />
      <Route path="/store/car/info/:id" element={<CarInfo />} />
      <Route path="/store/car/update/:id" element={<CarUpdate />} />
      {/* genral */}
      <Route path="/store/genral" element={<Genral />} />
      <Route path="/store/genral/new" element={<GenralCreate />} />
      <Route path="/store/genral/info/:id" element={<GenralInfo />} />
      <Route path="/store/genral/update/:id" element={<GenralUpdate />} />
      {/* Item */}
      <Route path="/store/item" element={<Item />} />
      <Route path="/store/item/new" element={<ItemCreate />} />
      <Route path="/store/item/info/:id" element={<ItemInfo />} />
      <Route path="/store/item/update/:id" element={<ItemUpdate />} />
      {/* store-supler */}
      <Route path="/store/storeSupler" element={<StoreSupler />} />
      <Route path="/store/storeSupler/new" element={<StoreSuplerCreate />} />
      <Route path="/store/storeSupler/info/:id" element={<StoreSuplerInfo />} />
      <Route
        path="/store/storeSupler/update/:id"
        element={<StoreSuplerUpdate />}
      />
      {/* unit */}
      <Route path="/store/unit" element={<Unit />} />
      <Route path="/store/unit/new" element={<UnitCreate />} />
      <Route path="/store/unit/info/:id" element={<UnitInfo />} />
      <Route path="/store/unit/update/:id" element={<UnitUpdate />} />
      {/* store */}
      <Route path="/store/store" element={<Store />} />
      <Route path="/store/store/new" element={<StoreCreate />} />
      <Route path="/store/store/info/:id" element={<StoreInfo />} />
      <Route path="/store/store/update/:id" element={<StoreUpdate />} />
      {/* Tran Move */}
      <Route path="/store/move" element={<TranMove />} />
      <Route path="/store/move/new" element={<TranMoveCreate />} />
      <Route path="/store/move/info/:id" element={<TranMoveInfo />} />
      <Route path="/store/move/update/:id" element={<TranMoveUpdate />} />

      {/**** Users ****/}
      {/* user */}
      <Route path="/user/user" element={<User />} />
      <Route path="/user/user/new" element={<UserCreate />} />
      <Route path="/user/user/info/:id" element={<UserInfo />} />
      <Route path="/user/user/update/:id" element={<UserUpdate />} />
      <Route path="/user/user/active/:id" element={<UserActive />} />
      <Route path="/user/user/password/:id" element={<UserPasswd />} />

      <Route path="datagrid" element={<DataGrid />} />
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

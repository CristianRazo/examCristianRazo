import { useState } from "react";
import Employeeprovider from "./context/employees/Provider";
import UserContextProvider from "./context/UserContext/Provider";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle";

function App() {
  return (
    <UserContextProvider>
      <Employeeprovider>
        <Routes />
      </Employeeprovider>
    </UserContextProvider>
  );
}

export default App;

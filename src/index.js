import React from "react";
import ReactDOM from "react-dom";
import { NearEnvironment, NearProvider } from "near-react-hooks";
import App from "./App";

ReactDOM.render(
  <NearProvider environment={NearEnvironment.TestNet}>
    <App />
  </NearProvider>,
  document.getElementById("root")
);

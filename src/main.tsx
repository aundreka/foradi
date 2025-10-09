import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppProviders from "./app/AppProviders";
import RoutesConfig from "./app/routes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProviders>
        <RoutesConfig />
      </AppProviders>
    </BrowserRouter>
  </React.StrictMode>
);

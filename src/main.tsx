import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";

import translations from "@/intl/translations";

import App from "./App";
import "./index.css";

const usersLocale = "en";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IntlProvider locale={usersLocale} messages={translations[usersLocale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);

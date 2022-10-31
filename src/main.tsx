import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";

import App from "./App";
import "./index.css";

const usersLocale = "en";
const translationsForUsersLocale = {};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IntlProvider locale={usersLocale} messages={translationsForUsersLocale}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);

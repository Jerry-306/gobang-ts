import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <React.StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </React.StrictMode>
  </HashRouter>
);

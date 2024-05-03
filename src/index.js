import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// add external-integrations.js to dom
const script = document.createElement("script");
script.src =
  "https://qa6-staticcf.sprinklr.com/apps/integrations/_next/static/external-integrations.js";
script.async = true;
script.onload = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
document.body.appendChild(script);

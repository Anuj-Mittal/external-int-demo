import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// add external-integrations.js to dom
const script = document.createElement("script");
// script.src = "https://localhost:8000/_next/static/external-integrations.js";

script.src =
  "https://qa6-staticcf.sprinklr.com/apps/integrations/cec2981c-e2a9-47e1-a1ca-f889f98f5e22/_next/static/external-integrations.js";
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

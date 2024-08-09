import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// declare the api_url property on the Window interface
declare global {
  interface Window {
    api_url: string;
  }
}

// set the api url
window.api_url = process.env.REACT_APP_API_URL || "http://localhost:3001";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

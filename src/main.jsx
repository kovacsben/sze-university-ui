import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import 'quill/dist/quill.snow.css';

import { SzeProvider } from "./sze-ui"; // a helyi könyvtárat használjuk
import "primeicons/primeicons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SzeProvider>
      <App />
    </SzeProvider>
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@docs.plus/extension-hyperlink/styles.css";
import "./index.css";
import App from "./App.tsx";
import { AppProviders } from "./components/AppProviders";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root not found");
}

createRoot(rootEl).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@docs.plus/extension-hyperlink/styles.css";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ThemeProvider } from "next-themes";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root not found");
}

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);

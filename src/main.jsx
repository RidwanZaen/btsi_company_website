import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App.jsx";
import { ClientsProvider } from "./context/ClientsContext.jsx";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <LanguageProvider>
          <ClientsProvider>
            <App />
          </ClientsProvider>
        </LanguageProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>
);

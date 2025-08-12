import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store";
import { registerSW } from "virtual:pwa-register";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

// Register PWA service worker (toggle via VITE_ENABLE_PWA)
if (import.meta.env.VITE_ENABLE_PWA !== "false") {
  registerSW({ immediate: true });
}

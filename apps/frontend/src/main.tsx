import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { loadRuntimeConfig } from "./config/runtime";

(async () => {
  await loadRuntimeConfig();
  createRoot(document.getElementById("root")!).render(<App />);
})();

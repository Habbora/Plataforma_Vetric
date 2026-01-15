import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const env = import.meta.env;
const visibleEnv = Object.fromEntries(Object.entries(env));
console.log('[VETRIC FRONTEND ENV]', visibleEnv);

window.addEventListener('error', (e) => {
  console.error('[GLOBAL ERROR]', e.message, e.error);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('[UNHANDLED REJECTION]', e.reason);
});

createRoot(document.getElementById("root")!).render(<App />);

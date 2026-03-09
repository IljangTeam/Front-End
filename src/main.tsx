import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/global.css";
import { AppRouter } from "./app/route/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);

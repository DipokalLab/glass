import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router";
import HomePage from "./pages/Main";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import EditorPage from "./pages/Editor";
import CreditPage from "./pages/Credit";
import RenderPage from "./pages/Render";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route index element={<EditorPage />} />
          <Route path="credit" element={<CreditPage />} />

          <Route path="render/*" element={<RenderPage />} />
        </Routes>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>,
);

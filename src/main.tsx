import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import ListsPage from "./pages/Lists";
import CreditPage from "./pages/Credit";
import CapturePage from "./pages/Capture";
import LandingPage from "./pages/Main";
import RenderPage from "./pages/Render";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="list" element={<ListsPage />} />
          <Route path="credit" element={<CreditPage />} />

          <Route path="capture/*" element={<CapturePage />} />
          <Route path="render/*" element={<RenderPage />} />
        </Routes>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
);

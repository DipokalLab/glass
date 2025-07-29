import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router";
import HomePage from "./pages/Main";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import ListsPage from "./pages/Lists";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="list" element={<ListsPage />} />
        </Routes>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
);

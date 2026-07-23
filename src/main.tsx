import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import ContentProvider from "./ContentProvider";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ContentProvider>
          <App />
        </ContentProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

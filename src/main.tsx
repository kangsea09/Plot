import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import "./App.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </StrictMode>
  </BrowserRouter>,
);

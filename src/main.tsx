import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import Root from "./views/Root.tsx";
import { AliveScope } from "react-activation";
import EnhancedConfigProvider from "./components/EnhanceConfigProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <EnhancedConfigProvider>
    <BrowserRouter>
      <AliveScope>
        <Root />
      </AliveScope>
    </BrowserRouter>
  </EnhancedConfigProvider>
);

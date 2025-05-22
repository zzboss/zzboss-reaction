import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import Root from "./views/Root.tsx";
import { AliveScope } from "react-activation";
import "./global.css";
import { ConfigProvider } from "antd";
import primaryTheme from "./styles/primaryTheme.ts";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={primaryTheme}>
    <BrowserRouter>
      <AliveScope>
        <Root />
      </AliveScope>
    </BrowserRouter>
  </ConfigProvider>
);

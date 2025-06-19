import { theme, ThemeConfig } from "antd";
import { getDynamicFontSize } from "./fontConfig";
const createPrimaryTheme = (): ThemeConfig => {
  // antd 组件有的依赖 theme.token.fontSize, 有的依赖页面根元素的 fontSize, 同时设置保持一致性
  const fontSize = getDynamicFontSize();
  document.documentElement.style.fontSize = `${fontSize}px`;
  return {
    cssVar: true,
    algorithm: theme.darkAlgorithm,
    token: {
      fontSize,
      fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    components: {
      Layout: {
        colorBgLayout: "var(--bg-primary)",
      },
      Menu: {
        darkItemSelectedBg: "#6717a6",
      },
      Radio: {
        buttonSolidCheckedBg: "#6717a6",
        buttonSolidCheckedHoverBg: "#8e2cd9",
        borderRadius: 0,
      },
      Typography: {
        titleMarginBottom: 0,
        titleMarginTop: 0,
      },
    },
  };
};
export default createPrimaryTheme;

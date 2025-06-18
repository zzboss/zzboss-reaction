import { theme, ThemeConfig } from "antd";
const createPrimaryTheme = (): ThemeConfig => {


  return {
  cssVar: true,
  hashed: false,
  algorithm: theme.darkAlgorithm,
  token: {
    fontSize: 14,
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  components: {
    Layout: {
      colorBgLayout: "var(--main-bg)",
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
      titleMarginBottom: 0
    }
  },}
};
export default createPrimaryTheme;
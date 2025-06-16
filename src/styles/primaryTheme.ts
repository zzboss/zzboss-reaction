import { theme, ThemeConfig } from "antd";
const primaryTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    fontSize: document.documentElement.clientWidth > 1900 ? 20:14,
    // fontSize: 14,
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
    }
  },
};
export default primaryTheme;
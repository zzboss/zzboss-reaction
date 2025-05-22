import { theme, ThemeConfig } from "antd";

const primaryTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  components: {
    Layout: {
      colorBgLayout: "var(--main-bg)",
    },
    Select: {
      selectorBg: "#1e2534", // 输入框背景色
      colorBgElevated: "#1e2534", // 下拉菜单背景色
      optionActiveBg: "#b47ce1", // 鼠标悬浮项背景色
      optionSelectedBg: "#6717a6", // 选中项背景色（下拉菜单中）
      colorText: "var(--text-color)", // 文字颜色
      colorTextPlaceholder: "rgba(255,255,255,0.5)",
      colorTextQuaternary: "var(--text-color)",
      colorPrimary: "var(--text-color)",
      colorPrimaryHover: "var(--text-color)",
    },
    Typography: {
      colorTextHeading: "var(--text-color)",
      colorText: "var(--text-color)",
    },
    Menu: {
      darkItemSelectedBg: "#581C87",
    },
    Slider: {
      railBg: "#6717a6",
      handleColor: "var(--text-color)",
      trackBg: "#9d52d8",
      trackHoverBg: "#b47ce1",
    },

    InputNumber: {
      colorBgContainer: "#1e2534", // 数字输入框背景色
      colorText: "var(--text-color)",
      handleBg: "var(--text-color)",
      colorTextPlaceholder: "rgba(255,255,255,0.5)",
      colorBorder: "#1e2534",
    },
  },
};
export default primaryTheme;
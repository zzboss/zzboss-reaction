import React, { useCallback, useEffect, useState } from "react";
import { ConfigProvider, ThemeConfig } from "antd";
import { getDynamicFontSize } from "@/utils/fontConfig";
import createPrimaryTheme from "@/utils/primaryTheme";

interface EnhancedConfigProviderProps {
  children: React.ReactNode;
}

const EnhancedConfigProvider: React.FC<EnhancedConfigProviderProps> = ({
  children,
}) => {

  const [theme, setTheme] = useState<ThemeConfig>(createPrimaryTheme());
  const [htmlFontSize, setHtmlFontSize] = useState<number>(theme.token?.fontSize || 14);

  // 优化字体大小更新逻辑
  const updateFontSize = useCallback(() => {
    const newSize = getDynamicFontSize();
    if (newSize !== htmlFontSize) {
      setHtmlFontSize(newSize);
      setTheme(createPrimaryTheme())
    }
  }, [htmlFontSize]);
  
  // 初始化和清理ResizeObserver
  useEffect(() => {
    // 初始设置
    updateFontSize();
    window.addEventListener("resize", updateFontSize);
    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  }, [updateFontSize]); // 添加依赖项
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default EnhancedConfigProvider;

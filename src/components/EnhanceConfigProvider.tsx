import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ConfigProvider, ThemeConfig } from 'antd';
import { getDynamicFontSize } from '@/utils/fontConfig';
import createPrimaryTheme from '@/utils/primaryTheme';



interface EnhancedConfigProviderProps {
  children: React.ReactNode;
}

const EnhancedConfigProvider: React.FC<EnhancedConfigProviderProps> = ({ children }) => {
  const [htmlFontSize, setHtmlFontSize] = useState<number>(getDynamicFontSize());
  const [theme, setTheme] = useState<ThemeConfig>(createPrimaryTheme());
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // 优化字体大小更新逻辑
  const updateFontSize = useCallback(() => {
    const newSize = getDynamicFontSize();
    console.log(newSize)
    if (newSize !== htmlFontSize) {
      setHtmlFontSize(newSize);
      const newTheme = createPrimaryTheme();
      newTheme.token!.fontSize = newSize;
      setTheme(newTheme);
      console.log(newSize)
      document.documentElement.style.fontSize = `${newSize}px`;
    }
  }, [htmlFontSize]);

  // 初始化和清理ResizeObserver
  useEffect(() => {
    // 初始设置
    updateFontSize();
    // 创建ResizeObserver
    resizeObserverRef.current = new ResizeObserver(entries => {
      // 只在视口变化明显时更新
      if (entries[0].contentRect.width !== window.innerWidth) {
        updateFontSize();
      }
    });

    resizeObserverRef.current.observe(document.documentElement);

    // 窗口大小变化备用监听
    window.addEventListener('resize', updateFontSize);

    return () => {
      // 完整清理
      resizeObserverRef.current?.disconnect();
      window.removeEventListener('resize', updateFontSize);
    };
  }, [updateFontSize]); // 添加依赖项

  return (
    <ConfigProvider
      theme={theme} // 统一设置到主题token
    >
      {children}
    </ConfigProvider>
  );
};

export default EnhancedConfigProvider;
// 动态计算字体大小
export const getDynamicFontSize = (): number => {
  const baseSize = 14; // 基准大小(1K屏幕)
  
  // 定义分辨率范围 (1K到4K)
  const minWidth = 1280; // 1K宽度
  const maxWidth = 3840; // 4K宽度
  
  const screenWidth = Math.min(maxWidth, Math.max(minWidth, window.visualViewport?.width || window.innerWidth)) 
  // 根据百分比计算基础字体大小 (14px到24px平滑过渡)
  const resolutionBasedSize =  (screenWidth - minWidth) / (maxWidth - minWidth) * 10 + baseSize
  console.log(resolutionBasedSize, screenWidth)
  return resolutionBasedSize
};
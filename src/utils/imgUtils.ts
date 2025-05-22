type TransformOption = {
  thresholdValue: number;
  width: number;
  height: number;
};
type RGB = {
  r: number;
  g: number;
  b: number;
};
type ImageHandler = (
  imgData: Uint8ClampedArray<ArrayBufferLike>,
  options: TransformOption
) => void;
// 配置图片处理相似阈值
const MAX_THRESHOLD = 50;
// 通过 mode 使用不同的方式处理图片
const transformImg = (
  mode: number,
  base64: string,
  thresholdValue: number
): Promise<string> => {
  const img: HTMLImageElement = document.createElement("img");
  img.src = base64;
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const width = img.width;
      const height = img.height;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imgData: ImageData | undefined = ctx.getImageData(
          0,
          0,
          width,
          height
        );
        if (imgData) {
          modes[mode](imgData.data, { thresholdValue, width, height });
          ctx.putImageData(imgData, 0, 0);
          const url = canvas.toDataURL('image/png');
          resolve(url);
        } else reject("not support canvas");
      } else reject("not support canvas");
    };
  });
};

// 实现图片转黑白图
const toGrayImg = (imgData: Uint8ClampedArray<ArrayBufferLike>) => {
  for (let i = 0; i < imgData.length; i += 4) {
    const avg = Math.floor((imgData[i] + imgData[i + 1] + imgData[i + 2]) / 3);
    setRgb(imgData, i, avg);
  }
};
// 图片转黑白图
const toBlackImg: ImageHandler = (
  imgData: Uint8ClampedArray<ArrayBufferLike>,
  { thresholdValue }
) => {
  for (let i = 0; i < imgData.length; i += 4) {
    const avg = Math.floor((imgData[i] + imgData[i + 1] + imgData[i + 2]) / 3);
    const target = avg >= (thresholdValue / MAX_THRESHOLD) * 255 ? 255 : 0;
    setRgb(imgData, i, target);
  }
};

// 将图片转为灰色图片再取轮廓
const toLineImgWithGray: ImageHandler = (
  imgData: Uint8ClampedArray<ArrayBufferLike>,
  { thresholdValue, width, height }
) => {
  // 一行像素点的长度
  const mcol = width * 4;
  const mRow = (mcol - 1) * height;
  for (let i = 0; i < imgData.length; i += 4) {
    const s = imgData[i] + imgData[i + 1] + imgData[i + 2];
    const r = i + 4;
    const d = i + mcol;
    const sr = isSimilar(s, r);
    const sd = isSimilar(s, d);
    const target = sr && sd ? 255 : 0;
    setRgb(imgData, i, target);
  }
  function isSimilar(s: number, t: number) {
    if (t > mRow || (t - 4) % mcol === 0) return false;
    const sum = imgData[t] + imgData[t + 1] + imgData[t + 2];
    return Math.abs(s - sum) <= thresholdValue;
  }
};

const toLineImgWithRGB: ImageHandler = (
  imgData: Uint8ClampedArray<ArrayBufferLike>,
  { thresholdValue, width, height }
) => {
  // 一行像素点的长度
  const mcol = width * 4;
  const mRow = (mcol - 1) * height;
  for (let i = 0; i < imgData.length; i += 4) {
    const r = i + 4;
    const d = i + mcol;
    const target = isSimilar(i, r) && isSimilar(i, d) ? 255 : 0;
    setRgb(imgData, i, target);
  }
  function isSimilar(i: number, t: number) {
    if (t > mRow || (t - 4) % mcol === 0) return false;
    const rgb1 = {
      r: imgData[i],
      g: imgData[i + 1],
      b: imgData[i + 2],
    };
    const rgb2 = {
      r: imgData[t],
      g: imgData[t + 1],
      b: imgData[t + 2],
    };
    const distance = weighted_rgb_distance(rgb1, rgb2);
    return distance < thresholdValue;
  }
};

// 加权欧式距离判断像素点是否相似
function weighted_rgb_distance(rgb1: RGB, rgb2: RGB) {
  const { r: r1, b: b1, g: g1 } = rgb1;
  const { r: r2, b: b2, g: g2 } = rgb2;
  const r_mean = (r1 + r2) / 2;
  const r_term = (2 + r_mean / 256) * (r1 - r2) ** 2;
  const g_term = 4 * (g1 - g2) ** 2;
  const b_term = (2 + (255 - r_mean) / 256) * (b1 - b2) ** 2;
  return Math.floor(Math.sqrt(r_term + g_term + b_term));
}

function setRgb(
  imgData: Uint8ClampedArray<ArrayBufferLike>,
  pos: number,
  val: number
) {
  imgData[pos] = val;
  imgData[pos + 1] = val;
  imgData[pos + 2] = val;
}

const urlToBase64 = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    const img: HTMLImageElement = document.createElement("img");
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const width = img.width;
      const height = img.height;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0);
      const base64 = canvas.toDataURL();
      resolve(base64);
    };
  });
};

const contour: ImageHandler = (
  data: Uint8ClampedArray<ArrayBufferLike>,
  { thresholdValue, width, height }
) => {
  const grayscaleData = new Uint8ClampedArray(data.length);
  console.log('trans', thresholdValue)
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    grayscaleData[i] = grayscaleData[i + 1] = grayscaleData[i + 2] = avg;
    grayscaleData[i + 3] = 255;
  }

  // Apply simple edge detection
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;

      // Sobel operator (simplified)
      const idx_up = ((y - 1) * width + x) * 4;
      const idx_down = ((y + 1) * width + x) * 4;
      const idx_left = (y * width + (x - 1)) * 4;
      const idx_right = (y * width + (x + 1)) * 4;

      const gx = grayscaleData[idx_right] - grayscaleData[idx_left];
      const gy = grayscaleData[idx_down] - grayscaleData[idx_up];

      // Calculate gradient magnitude
      let mag = Math.sqrt(gx * gx + gy * gy);

      // Threshold
      mag = mag < thresholdValue ? 0 : 255;

      data[idx] = data[idx + 1] = data[idx + 2] = 255 - mag; // Invert for better visibility
    }
  }
};

const modes: ImageHandler[] = [
  toGrayImg,
  toBlackImg,
  contour,
  toLineImgWithRGB,
];

export { transformImg, urlToBase64, toLineImgWithGray, MAX_THRESHOLD};

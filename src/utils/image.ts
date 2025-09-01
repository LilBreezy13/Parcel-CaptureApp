function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.src = url;
  });
}
export async function downscaleImage(file: File, maxW=1280, maxH=1280, quality=0.78): Promise<Blob> {
  const img = await fileToImage(file);
  const ratio = Math.min(maxW/img.width, maxH/img.height, 1);
  const w = Math.round(img.width * ratio), h = Math.round(img.height * ratio);
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, w, h);
  return await new Promise(res => canvas.toBlob(b => res(b!), "image/webp", quality));
}
function gray(data: Uint8ClampedArray, i: number) { return 0.299*data[i] + 0.587*data[i+1] + 0.114*data[i+2]; }
function grayAt(data: Uint8ClampedArray, width: number, x: number, y: number) { const i = (y*width + x) * 4; return gray(data, i); }
export async function framingScore(file: File): Promise<number> {
  const img = await fileToImage(file);
  const canvas = document.createElement("canvas");
  const targetW = 512, scale = targetW / img.width;
  canvas.width = targetW; canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let edgeCount = 0;
  for (let y=1; y<height-1; y+=2) for (let x=1; x<width-1; x+=2) {
    const gx = grayAt(data, width, x+1, y) - grayAt(data, width, x-1, y);
    const gy = grayAt(data, width, x, y+1) - grayAt(data, width, x, y-1);
    const mag = Math.abs(gx) + Math.abs(gy);
    if (mag > 40) edgeCount++;
  }
  const cx0 = Math.floor(width*0.2), cx1 = Math.floor(width*0.8);
  const cy0 = Math.floor(height*0.2), cy1 = Math.floor(height*0.8);
  let sum=0, sum2=0, n=0;
  for (let y=cy0; y<cy1; y+=2) for (let x=cx0; x<cx1; x+=2) { const g = grayAt(data, width, x, y); sum+=g; sum2+=g*g; n++; }
  const mean = sum/n, variance = sum2/n - mean*mean;
  const maxSamples = Math.ceil(((height-2)/2) * ((width-2)/2));
  const edgeDensity = edgeCount / maxSamples;
  return edgeDensity * 0.7 + Math.min(variance/1500,1) * 0.3;
}

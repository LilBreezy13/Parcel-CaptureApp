import Tesseract from "tesseract.js";
export async function extractText(file: File) {
  const worker = await Tesseract.createWorker("eng", 1, { logger: () => {} });
  const url = URL.createObjectURL(file);
  const { data } = await worker.recognize(url);
  URL.revokeObjectURL(url);
  await worker.terminate();
  const text = (data.text||"").replace(/\r/g,"").trim();
  const fields = parse(text);
  return { text, fields };
}
function parse(text: string) {
  const lines = text.split("\n").map(s=>s.trim()).filter(Boolean);
  let name="", addr="", details="";
  for (const line of lines) {
    const l=line.toLowerCase();
    if (!name && (l.startsWith("name:")||l.startsWith("recipient:"))) name=line.split(":").slice(1).join(":").trim();
    if (!addr && (l.startsWith("address:")||l.startsWith("location:"))) addr=line.split(":").slice[1].join(":").trim();
  }
  if (!name) name = lines[0] || "";
  if (!addr) addr = lines.slice(-2).join(", ");
  details = lines.slice(1,3).join(" ");
  return { parcelName: name, parcelAddress: addr, parcelDetails: details };
}
export function keywordsFromAddress(address: string) {
  return address.toLowerCase().replace(/[^a-z0-9\s]/g," ").split(/\s+/).filter(Boolean).slice(0,10);
}

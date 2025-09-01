let lastPlay = 0;
export function playDing() {
  const now = Date.now();
  if (now - lastPlay < 300) return;
  lastPlay = now;
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.type="sine"; o.frequency.value=880;
  o.connect(g); g.connect(ctx.destination);
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.linearRampToValueAtTime(0.15, ctx.currentTime+0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+0.3);
  o.start(); o.stop(ctx.currentTime+0.35);
}

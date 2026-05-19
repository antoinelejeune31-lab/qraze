"use client"
import { useState, useRef, useEffect } from "react";


const IG_GRADIENT = `data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><defs><radialGradient id='g' cx='30%25' cy='107%25' r='150%25'><stop offset='0%25' stop-color='%23fdf497'/><stop offset='45%25' stop-color='%23fd5949'/><stop offset='60%25' stop-color='%23d6249f'/><stop offset='90%25' stop-color='%23285AEB'/></radialGradient></defs><rect width='24' height='24' rx='5' fill='url(%23g)'/><rect x='2.5' y='2.5' width='19' height='19' rx='3.5' fill='none' stroke='white' stroke-width='1.5'/><circle cx='12' cy='12' r='4.5' fill='none' stroke='white' stroke-width='1.5'/><circle cx='17.5' cy='6.5' r='1.2' fill='white'/></svg>`;

// Draw Instagram logo directly on canvas with custom color
function drawInstagramOnCanvas(ctx, x, y, size, color) {
  const s = size, r = s * 0.2;
  ctx.save();
  ctx.translate(x, y);
  // Background rounded rect
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.roundRect(0, 0, s, s, r); ctx.fill();
  // Inner shapes in bg color (the "cutout" look)
  const bg = ctx.canvas._bg || "#faf6ee";
  ctx.strokeStyle = bg;
  ctx.lineWidth = s * 0.07;
  // Outer square border
  ctx.beginPath(); ctx.roundRect(s*0.11, s*0.11, s*0.78, s*0.78, s*0.14); ctx.stroke();
  // Circle
  ctx.beginPath(); ctx.arc(s/2, s/2, s*0.21, 0, Math.PI*2); ctx.stroke();
  // Dot
  ctx.fillStyle = bg;
  ctx.beginPath(); ctx.arc(s*0.73, s*0.27, s*0.065, 0, Math.PI*2); ctx.fill();
  ctx.restore();
}

const TABS         = [{id:"url",label:"URL"},{id:"wifi",label:"Wi-Fi"},{id:"vcard",label:"vCard"},{id:"sms",label:"SMS"}];
const MOD_SHAPES   = [{id:"square",label:"Carré"},{id:"round",label:"Rond"},{id:"diamond",label:"Losange"},{id:"star",label:"Étoile"},{id:"heart",label:"Cœur"},{id:"cross",label:"Croix"},{id:"triangle",label:"Triangle"},{id:"dot",label:"Point"}];
const EYE_SHAPES   = [{id:"square",label:"Carré"},{id:"round",label:"Rond"},{id:"leaf",label:"Feuille"}];
const FRAMES       = [{id:"none",label:"Aucun"},{id:"simple",label:"Simple"},{id:"double",label:"Double"},{id:"rounded",label:"Arrondi"},{id:"shadow",label:"Ombre"}];
const EXPORTS      = [{id:"png",label:"PNG"},{id:"svg",label:"SVG"},{id:"jpeg",label:"JPEG"}];
const GRAD_DIRS    = [{id:"diagonal",label:"↗ Diagonal"},{id:"horizontal",label:"→ Horizontal"},{id:"vertical",label:"↓ Vertical"},{id:"radial",label:"◎ Radial"}];

// ── helpers ──────────────────────────────────────────────────────────────────
function loadImg(src) {
  return new Promise((res, rej) => {
    const i = new Image();
    i.crossOrigin = "anonymous";
    i.onload  = () => res(i);
    i.onerror = () => rej();
    i.src = src;
  });
}

function buildText(tab, f) {
  if (tab==="wifi")  return `WIFI:T:${f.wifiEnc||"WPA"};S:${f.wifiSsid||""};P:${f.wifiPass||""};H:false;;`;
  if (tab==="vcard") return `BEGIN:VCARD\nVERSION:3.0\nFN:${f.vcName||""}\nORG:${f.vcOrg||""}\nTEL:${f.vcTel||""}\nEMAIL:${f.vcEmail||""}\nURL:${f.vcUrl||""}\nEND:VCARD`;
  if (tab==="sms")   return `SMSTO:${f.smsTo||""}:${f.smsMsg||""}`;
  const u = f.url||""; return u.startsWith("http") ? u : u ? `https://${u}` : "";
}

function getMatrix(text, ec) {
  const qr = window.qrcode(0, ec);
  qr.addData(text); qr.make();
  const n = qr.getModuleCount();
  return Array.from({length:n}, (_,r) => Array.from({length:n}, (_,c) => qr.isDark(r,c)));
}

function starPath(ctx, cx, cy, r, points, innerRatio) {
  const step = Math.PI / points;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = i * step - Math.PI / 2;
    const rad   = i % 2 === 0 ? r : r * innerRatio;
    if (i === 0) ctx.moveTo(cx + Math.cos(angle)*rad, cy + Math.sin(angle)*rad);
    else         ctx.lineTo(cx + Math.cos(angle)*rad, cy + Math.sin(angle)*rad);
  }
  ctx.closePath();
}

function heartPath(ctx, cx, cy, r) {
  ctx.beginPath();
  ctx.moveTo(cx, cy + r * 0.3);
  ctx.bezierCurveTo(cx - r*1.1, cy - r*0.3, cx - r*1.1, cy - r*1.1, cx, cy - r*0.4);
  ctx.bezierCurveTo(cx + r*1.1, cy - r*1.1, cx + r*1.1, cy - r*0.3, cx, cy + r*0.3);
  ctx.closePath();
}

function drawMod(ctx, x, y, size, shape) {
  const p=size*0.1, s=size-p*2, cx=x+size/2, cy=y+size/2, r=s/2;
  ctx.beginPath();
  if (shape==="round") {
    ctx.arc(cx, cy, r, 0, Math.PI*2);
  } else if (shape==="dot") {
    ctx.arc(cx, cy, r*0.6, 0, Math.PI*2);
  } else if (shape==="diamond") {
    ctx.moveTo(cx, cy-r); ctx.lineTo(cx+r, cy); ctx.lineTo(cx, cy+r); ctx.lineTo(cx-r, cy); ctx.closePath();
  } else if (shape==="star") {
    starPath(ctx, cx, cy, r, 5, 0.42);
  } else if (shape==="heart") {
    heartPath(ctx, cx, cy, r*0.75);
  } else if (shape==="cross") {
    const t=r*0.35;
    ctx.moveTo(cx-t, cy-r); ctx.lineTo(cx+t, cy-r); ctx.lineTo(cx+t, cy-t);
    ctx.lineTo(cx+r, cy-t); ctx.lineTo(cx+r, cy+t); ctx.lineTo(cx+t, cy+t);
    ctx.lineTo(cx+t, cy+r); ctx.lineTo(cx-t, cy+r); ctx.lineTo(cx-t, cy+t);
    ctx.lineTo(cx-r, cy+t); ctx.lineTo(cx-r, cy-t); ctx.lineTo(cx-t, cy-t);
    ctx.closePath();
  } else if (shape==="triangle") {
    ctx.moveTo(cx, cy-r); ctx.lineTo(cx+r, cy+r*0.7); ctx.lineTo(cx-r, cy+r*0.7); ctx.closePath();
  } else {
    ctx.roundRect(x+p, y+p, s, s, size*0.15);
  }
  ctx.fill();
}

function drawEye(ctx, ox, oy, cell, shape, outerC, innerC, bgC) {
  const full=cell*7, cx=ox+full/2, cy=oy+full/2;
  // outer
  ctx.fillStyle = outerC;
  ctx.beginPath();
  if (shape==="round")  { ctx.roundRect(ox, oy, full, full, cell*1.4); }
  else if (shape==="leaf") { ctx.roundRect(ox, oy, full, full, [cell*1.4,cell*0.2,cell*1.4,cell*0.2]); }
  else { ctx.rect(ox, oy, full, full); }
  ctx.fill();
  // clear inner ring
  ctx.fillStyle = bgC;
  ctx.beginPath();
  if (shape==="round")  { ctx.roundRect(ox+cell, oy+cell, cell*5, cell*5, cell*0.9); }
  else if (shape==="leaf") { ctx.roundRect(ox+cell, oy+cell, cell*5, cell*5, [cell*0.8,cell*0.1,cell*0.8,cell*0.1]); }
  else { ctx.rect(ox+cell, oy+cell, cell*5, cell*5); }
  ctx.fill();
  // inner dot
  ctx.fillStyle = innerC;
  ctx.beginPath();
  if (shape==="round") { ctx.arc(cx, cy, cell*1.5, 0, Math.PI*2); }
  else if (shape==="leaf") { ctx.roundRect(ox+cell*2, oy+cell*2, cell*3, cell*3, [cell*0.6,cell*0.1,cell*0.6,cell*0.1]); }
  else { ctx.rect(ox+cell*2, oy+cell*2, cell*3, cell*3); }
  ctx.fill();
}

// Draw a liquid-glass shape — no clip() to avoid corrupting context
function drawGlass(ctx, path2d, cx, cy, size, fgColor, glassOpacity) {
  const op = Math.max(glassOpacity, 0.1);

  // 1. Solid opaque base — guarantees scanner contrast
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = fgColor;
  ctx.fill(path2d);
  ctx.restore();

  // 2. Frosted glass overlay — semi-transparent tint
  ctx.save();
  ctx.globalAlpha = op * 0.5;
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fill(path2d);
  ctx.restore();

  // 3. Top specular highlight
  ctx.save();
  const hi = ctx.createLinearGradient(cx, cy - size*0.5, cx, cy + size*0.15);
  hi.addColorStop(0,   "rgba(255,255,255,0.7)");
  hi.addColorStop(0.45,"rgba(255,255,255,0.15)");
  hi.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = hi;
  ctx.fill(path2d);
  ctx.restore();

  // 4. Bottom refraction glow
  ctx.save();
  const bot = ctx.createLinearGradient(cx, cy + size*0.1, cx, cy + size*0.5);
  bot.addColorStop(0,   "rgba(255,255,255,0)");
  bot.addColorStop(1,   "rgba(255,255,255,0.2)");
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = bot;
  ctx.fill(path2d);
  ctx.restore();

  // 5. Luminous border
  ctx.save();
  ctx.globalAlpha = 0.8;
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.lineWidth = size * 0.045;
  ctx.stroke(path2d);
  ctx.restore();
}

// Build a Path2D for a given shape at position
function buildPath(x, y, size, shape) {
  const p=size*0.1, s=size-p*2, cx=x+size/2, cy=y+size/2, r=s/2;
  const path = new Path2D();
  if (shape==="round") {
    path.arc(cx, cy, r, 0, Math.PI*2);
  } else if (shape==="dot") {
    path.arc(cx, cy, r*0.6, 0, Math.PI*2);
  } else if (shape==="diamond") {
    path.moveTo(cx,cy-r); path.lineTo(cx+r,cy); path.lineTo(cx,cy+r); path.lineTo(cx-r,cy); path.closePath();
  } else if (shape==="star") {
    const step=Math.PI/5;
    for(let i=0;i<10;i++){const a=i*step-Math.PI/2,rd=i%2===0?r:r*0.42;if(i===0)path.moveTo(cx+Math.cos(a)*rd,cy+Math.sin(a)*rd);else path.lineTo(cx+Math.cos(a)*rd,cy+Math.sin(a)*rd);}
    path.closePath();
  } else if (shape==="heart") {
    path.moveTo(cx, cy+r*0.22);
    path.bezierCurveTo(cx-r*0.82,cy-r*0.22,cx-r*0.82,cy-r*0.82,cx,cy-r*0.3);
    path.bezierCurveTo(cx+r*0.82,cy-r*0.82,cx+r*0.82,cy-r*0.22,cx,cy+r*0.22);
    path.closePath();
  } else if (shape==="cross") {
    const t=r*0.35;
    path.moveTo(cx-t,cy-r);path.lineTo(cx+t,cy-r);path.lineTo(cx+t,cy-t);
    path.lineTo(cx+r,cy-t);path.lineTo(cx+r,cy+t);path.lineTo(cx+t,cy+t);
    path.lineTo(cx+t,cy+r);path.lineTo(cx-t,cy+r);path.lineTo(cx-t,cy+t);
    path.lineTo(cx-r,cy+t);path.lineTo(cx-r,cy-t);path.lineTo(cx-t,cy-t);
    path.closePath();
  } else if (shape==="triangle") {
    path.moveTo(cx,cy-r);path.lineTo(cx+r,cy+r*0.7);path.lineTo(cx-r,cy+r*0.7);path.closePath();
  } else {
    path.roundRect(x+p, y+p, s, s, size*0.15);
  }
  return path;
}

// Build Path2D for eye outer ring
function buildEyePath(ox, oy, cell, shape) {
  const full = cell*7;
  const path = new Path2D();
  if (shape==="round")  path.roundRect(ox, oy, full, full, cell*1.4);
  else if (shape==="leaf") path.roundRect(ox, oy, full, full, [cell*1.4,cell*0.2,cell*1.4,cell*0.2]);
  else path.rect(ox, oy, full, full);
  return path;
}

async function renderToCanvas(canvas, matrix, opts) {
  const {
    fgColor, bgColor,
    useGradient, gradStart, gradEnd, gradDir, gradMid, gradMidPos, gradStartPos, gradEndPos,
    moduleShape, eyeShape, eyeOuter, eyeInner,
    logoSrc, logoRatio,
    frame, frameColor,
    bgMode, bgImage, bgOpacity,
  } = opts;

  const S     = 1024;
  const QUIET = 4;
  const n     = matrix.length;
  const cell  = S / (n + QUIET*2);

  canvas.width = canvas.height = S;
  const ctx = canvas.getContext("2d");
  canvas._bg = bgColor;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // ── 1. Background ──
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, S, S);

  if (bgMode==="image" && bgImage) {
    try {
      const img = await loadImg(bgImage);
      ctx.save();
      ctx.globalAlpha = bgOpacity;
      const sc = Math.max(S/img.width, S.img.height);
      ctx.drawImage(img, (S-img.width*sc)/2, (S-img.height*sc)/2, img.width*sc, img.height*sc);
      ctx.restore();
    } catch(e) { console.warn('Failed to load background image', e); }
  }

  // ── 2. Gradient / fill style ──
  let fill = fgColor;
  if (useGradient) {
    let g;
    if (gradDir==="radial")      g = ctx.createRadialGradient(S/2,S/2,0,S/2,S/2,S*0.65);
    else if (gradDir==="horizontal") g = ctx.createLinearGradient(0,0,S,0);
    else if (gradDir==="vertical")   g = ctx.createLinearGradient(0,0,0,S);
    else                             g = ctx.createLinearGradient(0,0,S,S);
    g.addColorStop(Math.max(0,gradStartPos), gradStart);
    if (gradMid) g.addColorStop(Math.min(Math.max(gradMidPos,0),1), gradMid);
    g.addColorStop(Math.min(1,gradEndPos), gradEnd);
    fill = g;
  }

  // ── 3. Eye zones to skip ──
  const eyePos = [[0,0],[0,n-7],[n-7,0]];
  const eyeSet = new Set();
  eyePos.forEach(([er,ec]) => {
    for(let dr=0;dr<7;dr++) for(let dc=0;dc<7;dc++) eyeSet.add(`${er+dr},${ec+dc}`);
  });

  // ── 4. Modules ──
  const useGlassMod = opts.glassMode === "modules" || opts.glassMode === "both";
  ctx.fillStyle = fill;
  for (let r=0; r<n; r++) {
    for (let c=0; c<n; c++) {
      if (!matrix[r][c] || eyeSet.has(`${r},${c}`)) continue;
      const ms = cell * (opts.moduleSize || 0.85);
      const mo = (cell - ms) / 2;
      const mx = (c+QUIET)*cell + mo, my = (r+QUIET)*cell + mo;
      const cx = mx + ms/2, cy = my + ms/2;
      if (useGlassMod) {
        const path = buildPath(mx, my, ms, moduleShape);
        drawGlass(ctx, path, cx, cy, ms, fgColor, opts.glassOpacity);
      } else {
        drawMod(ctx, mx, my, ms, moduleShape);
      }
    }
  }

  // ── 5. Eyes ──
  const useGlassEye = opts.glassMode === "eyes" || opts.glassMode === "both";
  eyePos.forEach(([er,ec]) => {
    const ox=(ec+QUIET)*cell, oy=(er+QUIET)*cell;
    const full=cell*7, ecx=ox+full/2, ecy=oy+full/2;
    if (useGlassEye) {
      // Draw background-colored clearing first
      ctx.fillStyle = bgColor;
      ctx.fillRect(ox, oy, full, full);
      // Glass outer ring
      const outerPath = buildEyePath(ox, oy, cell, eyeShape);
      const innerPath = new Path2D();
      if (eyeShape==="round") innerPath.roundRect(ox+cell, oy+cell, cell*5, cell*5, cell*0.9);
      else if (eyeShape==="leaf") innerPath.roundRect(ox+cell, oy+cell, cell*5, cell*5, [cell*0.8,cell*0.1,cell*0.8,cell*0.1]);
      else innerPath.rect(ox+cell, oy+cell, cell*5, cell*5);
      // Subtract inner from outer for the ring
      ctx.save();
      ctx.beginPath();
      if (eyeShape==="round") ctx.roundRect(ox,oy,full,full,cell*1.4);
      else if (eyeShape==="leaf") ctx.roundRect(ox,oy,full,full,[cell*1.4,cell*0.2,cell*1.4,cell*0.2]);
      else ctx.rect(ox,oy,full,full);
      ctx.clip();
      ctx.fillStyle = bgColor;
      ctx.fill(innerPath);
      ctx.restore();
      drawGlass(ctx, outerPath, ecx, ecy, full, eyeOuter, opts.glassOpacity);

      // Inner dot glass
      const dotPath = new Path2D();
      if (eyeShape==="round") dotPath.arc(ecx, ecy, cell*1.5, 0, Math.PI*2);
      else if (eyeShape==="leaf") dotPath.roundRect(ox+cell*2,oy+cell*2,cell*3,cell*3,[cell*0.6,cell*0.1,cell*0.6,cell*0.1]);
      else dotPath.rect(ox+cell*2, oy+cell*2, cell*3, cell*3);
      drawGlass(ctx, dotPath, ecx, ecy, cell*3, eyeInner, opts.glassOpacity);
    } else {
      drawEye(ctx, ox, oy, cell, eyeShape, eyeOuter, eyeInner, bgColor);
    }
  });

  // ── 6. Frame ──
  if (frame!=="none") {
    ctx.strokeStyle = frameColor;
    const fp=8;
    if (frame==="simple")  { ctx.lineWidth=8;  ctx.strokeRect(fp,fp,S-fp*2,S-fp*2); }
    if (frame==="double")  { ctx.lineWidth=6;  ctx.strokeRect(fp,fp,S-fp*2,S-fp*2); ctx.strokeRect(fp+16,fp+16,S-fp*2-32,S-fp*2-32); }
    if (frame==="rounded") { ctx.lineWidth=10; ctx.beginPath(); ctx.roundRect(fp,fp,S-fp*2,S-fp*2,48); ctx.stroke(); }
    if (frame==="shadow")  { ctx.shadowColor=frameColor+"99"; ctx.shadowBlur=30; ctx.lineWidth=6; ctx.strokeRect(fp,fp,S-fp*2,S-fp*2); ctx.shadowBlur=0; }
  }

  // ── 7. Logo ──
  if (logoSrc) {
    try {
      const img = await loadImg(logoSrc);
      const lw  = S * logoRatio;
      const lx  = (S-lw)/2, ly=(S-lw)/2;
      const pad = lw*0.06;
      // White background behind logo
      ctx.fillStyle = bgColor;
      ctx.fillRect(lx-pad, ly-pad, lw+pad*2, lw+pad*2);

      if (opts.logoTint && opts.isInstagram) {
        // Instagram: draw directly with custom color using canvas primitives
        drawInstagramOnCanvas(ctx, lx, ly, lw, opts.logoTint);
      } else if (opts.logoTint) {
        // Custom logos: mask tint color with logo alpha
        const off = document.createElement("canvas");
        off.width = off.height = Math.ceil(lw);
        const octx = off.getContext("2d");
        octx.fillStyle = opts.logoTint;
        octx.fillRect(0, 0, lw, lw);
        octx.globalCompositeOperation = "destination-in";
        octx.drawImage(img, 0, 0, lw, lw);
        ctx.drawImage(off, lx, ly, lw, lw);
      } else {
        ctx.drawImage(img, lx, ly, lw, lw);
      }
    } catch(e) { console.warn('Failed to load logo image', e); }
  }
}

function exportSVG(matrix, opts) {
  const {fgColor,bgColor,moduleShape} = opts;
  const n=matrix.length, Q=4, cell=10, S=(n+Q*2)*cell;
  let p="";
  for(let r=0;r<n;r++) for(let c=0;c<n;c++) {
    if(!matrix[r][c]) continue;
    const x=(c+Q)*cell, y=(r+Q)*cell, cx=x+cell/2, cy=y+cell/2, h=cell*0.45;
    if(moduleShape==="round") p+=`<circle cx="${cx}" cy="${cy}" r="${cell*0.42}" fill="${fgColor}"/>`;
    else if(moduleShape==="diamond") p+=`<polygon points="${cx},${cy-h} ${cx+h},${cy} ${cx},${cy+h} ${cx-h},${cy}" fill="${fgColor}"/>`;
    else p+=`<rect x="${x+1}" y="${y+1}" width="${cell-2}" height="${cell-2}" rx="1.5" fill="${fgColor}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}"><rect width="${S}" height="${S}" fill="${bgColor}"/>${p}</svg>`;
}

// eslint-disable-next-line no-unused-vars
function ModalActions({ valid, hasCustom, onSubmit, onCancel }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
      <button
        onClick={()=>{ if(valid) onSubmit(); }}
        style={{
          width:"100%",
          background:valid?"#0d1b3e":"rgba(13,27,62,0.1)",
          color:valid?"#faf6ee":"rgba(13,27,62,0.3)",
          border:"none",
          padding:"1rem",
          fontSize:"0.62rem",
          fontWeight:700,
          letterSpacing:"0.18em",
          textTransform:"uppercase",
          cursor:valid?"pointer":"not-allowed",
          fontFamily:"'DM Sans',sans-serif",
          transition:"all 0.18s",
        }}
      >
        {hasCustom ? "Continuer vers le paiement →" : "Télécharger gratuitement →"}
      </button>
      <button onClick={onCancel}
        style={{background:"none",border:"none",fontSize:"0.5rem",color:"#0d1b3e",opacity:0.3,cursor:"pointer",letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",padding:"0.3rem"}}>
        Annuler
      </button>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function SH({n, t}) {
  return (
    <div style={{display:"flex",alignItems:"baseline",gap:"0.6rem",marginBottom:"1rem",paddingBottom:"0.6rem",borderBottom:"1px solid rgba(13,27,62,0.07)"}}>
      <span style={{fontSize:"0.48rem",fontWeight:800,letterSpacing:"0.1em",color:"#0d1b3e",opacity:0.2,fontFamily:"'DM Mono',monospace"}}>{n}</span>
      <span style={{fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"#0d1b3e",opacity:0.45}}>{t}</span>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function QRGenerator() {
  const [tab,        setTab]        = useState("url");
  const [fields,     setFields]     = useState({url:"",wifiSsid:"",wifiPass:"",wifiEnc:"WPA",vcName:"",vcOrg:"",vcTel:"",vcEmail:"",vcUrl:"",smsTo:"",smsMsg:""});
  const [fgColor,    setFgColor]    = useState("#0d1b3e");
  const [bgColor,    setBgColor]    = useState("#faf6ee");
  const [bgMode,     setBgMode]     = useState("color");
  const [bgImage,    setBgImage]    = useState(null);
  const [bgOpacity,  setBgOpacity]  = useState(1);
  const [useGrad,    setUseGrad]    = useState(false);
  const [gradStart,  setGradStart]  = useState("#0d1b3e");
  const [gradEnd,    setGradEnd]    = useState("#1a6bc4");
  const [gradDir,    setGradDir]    = useState("diagonal");
  const [gradMid,    setGradMid]    = useState("#c9a84c");
  const [useMid,     setUseMid]     = useState(false);
  const gradMidPos = 0.5;
  const gradSPos   = 0;
  const gradEPos   = 1;
  const [modShape,   setModShape]   = useState("square");
  const [modSize,    setModSize]    = useState(0.85); // 0.4 to 1.0
  const [glassMode,  setGlassMode]  = useState("none"); // none | modules | eyes | both
  const [glassOpacity, setGlassOpacity] = useState(0.18);
  const [eyeShape,   setEyeShape]   = useState("square");
  const [eyeOuter,   setEyeOuter]   = useState("#0d1b3e");
  const [eyeInner,   setEyeInner]   = useState("#0d1b3e");
  const [syncEyes,   setSyncEyes]   = useState(true);
  const [logoMode,   setLogoMode]   = useState("none");
  const [customLogo, setCustomLogo] = useState(null);
  const [logoRatio,  setLogoRatio]  = useState(0.22);
  const [syncLogo,   setSyncLogo]   = useState(false);
  const [logoTint,   setLogoTint]   = useState("#0d1b3e");
  const [frame,      setFrame]      = useState("none");
  const [frameColor, setFrameColor] = useState("#0d1b3e");
  const [exportFmt,  setExportFmt]  = useState("png");
  const [generated,  setGenerated]  = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [libReady,   setLibReady]   = useState(false);
  const [matrix,     setMatrix]     = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showModal,    setShowModal]    = useState(false);
  const [modalFirst,   setModalFirst]   = useState('');
  const [modalLast,    setModalLast]    = useState('');
  const [modalEmail,   setModalEmail]   = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [qrName,       setQrName]       = useState('');
  const [savingQr,     setSavingQr]     = useState(false);
  const [savedQr,      setSavedQr]      = useState(false);

  const canvasRef  = useRef(null);
  const fileRef    = useRef(null);
  const bgFileRef  = useRef(null);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js";
    s.onload = () => setLibReady(true);
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    fetch('/api/qr/list')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.user) setLoggedInUser(d.user); })
      .catch(() => {});
  }, []);

  const sf = (k,v) => setFields(f=>({...f,[k]:v}));
  const syncFg = (v) => { setFgColor(v); if(syncEyes){setEyeOuter(v);setEyeInner(v);} if(syncLogo){setLogoTint(v);} };
  const syncGs = (v) => { setGradStart(v); if(syncEyes){setEyeOuter(v);setEyeInner(v);} if(syncLogo){setLogoTint(v);} };

  const logoSrc = logoMode==="instagram" ? IG_GRADIENT : logoMode==="custom" ? customLogo : null;

  const getOpts = () => ({
    fgColor, bgColor, bgMode, bgImage, bgOpacity,
    useGradient:useGrad, gradStart, gradEnd, gradDir,
    gradMid: useMid?gradMid:null, gradMidPos,
    gradStartPos:gradSPos, gradEndPos:gradEPos,
    moduleShape:modShape, moduleSize:modSize, glassMode, glassOpacity, eyeShape, eyeOuter, eyeInner,
  logoSrc, logoRatio, logoTint, isInstagram: logoMode==="instagram", frame, frameColor,
  });

  const generate = async () => {
    if (!libReady) return;
    const text = buildText(tab, fields);
    if (!text) return;
    setLoading(true); setGenerated(false); setPreviewUrl(null);
    try {
      const m = getMatrix(text, logoSrc ? "H" : "M");
      setMatrix(m);
      const cvs = canvasRef.current;
      await renderToCanvas(cvs, m, getOpts());
      const url = cvs.toDataURL("image/png");
      setPreviewUrl(url);
      setGenerated(true);
    } catch(e) { alert("Erreur : "+e.message); }
    setLoading(false);
  };

  const download = () => {
    if (!previewUrl && !matrix) return;
    if (exportFmt==="svg" && matrix) {
      const blob = new Blob([exportSVG(matrix, getOpts())], {type:"image/svg+xml"});
      trigger(URL.createObjectURL(blob), "qrcode.svg"); return;
    }
    if (exportFmt==="jpeg") {
      const img = new Image();
      img.onload = () => {
        const c=document.createElement("canvas"); c.width=img.width; c.height=img.height;
        const x=c.getContext("2d"); x.fillStyle="#fff"; x.fillRect(0,0,c.width,c.height); x.drawImage(img,0,0);
        trigger(c.toDataURL("image/jpeg",0.95), "qrcode.jpeg");
      };
      img.src = previewUrl; return;
    }
    trigger(previewUrl, "qrcode.png");
  };

  const trigger = (href, name) => {
    const a=document.createElement("a"); a.href=href; a.download=name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const saveQr = async () => {
    if (!qrName.trim() || !generated) return;
    setSavingQr(true);
    try {
      const opts = { fgColor, bgColor, useGradient: useGrad, gradStart, gradEnd, gradDir, moduleShape: modShape, eyeShape, frame, frameColor, exportFmt };
      const res = await fetch('/api/qr/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: qrName.trim(), content: buildText(tab, fields), type: tab, options: opts }),
      });
      if (res.ok) { setSavedQr(true); setTimeout(() => setSavedQr(false), 3000); }
      else { alert('Erreur lors de la sauvegarde.'); }
    } catch { alert('Erreur lors de la sauvegarde.'); }
    setSavingQr(false);
  };

  const isReady = libReady && buildText(tab,fields).length > 2;

  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    if (document.cookie.split(';').some(c => c.trim() === 'qr_unlocked=1')) {
      setIsPro(true);
    }
  }, []);

  const hasCustom = !isPro && (
    fgColor !== "#0d1b3e" || bgColor !== "#faf6ee" || bgMode !== "color" ||
    bgImage !== null || useGrad || modShape !== "square" || eyeShape !== "square" ||
    logoMode !== "none" || glassMode !== "none" || frame !== "none" || exportFmt !== "png"
  );

  const gradPreview = (() => {
    const s0=Math.round(gradSPos*100), s1=Math.round(gradEPos*100);
    const stops = useMid ? `${gradStart} ${s0}%, ${gradMid} ${Math.round(gradMidPos*100)}%, ${gradEnd} ${s1}%`
                         : `${gradStart} ${s0}%, ${gradEnd} ${s1}%`;
    if(gradDir==="radial")      return `radial-gradient(circle, ${stops})`;
    if(gradDir==="horizontal")  return `linear-gradient(to right, ${stops})`;
    if(gradDir==="vertical")    return `linear-gradient(to bottom, ${stops})`;
    return `linear-gradient(135deg, ${stops})`;
  })();




  return (
    <>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        ::placeholder{color:#b0a898;font-family:'DM Mono',monospace;font-size:0.82rem}
        input[type=text]:focus,input[type=password]:focus,input[type=tel]:focus,input[type=email]:focus{border-bottom:2px solid #0d1b3e!important;outline:none}
        .gen-wrap{display:grid;grid-template-columns:1fr 560px;align-items:start}
        .gen-panel{padding:2.5rem 2.5rem 4rem 6vw;display:flex;flex-direction:column;gap:2.25rem}
        .gen-side{position:sticky;top:10rem;padding:2rem 2rem 2rem 2rem;display:flex;flex-direction:column;gap:0.75rem}
        .gen-sec{display:flex;flex-direction:column;gap:0}
        .tab-row{display:flex;border-bottom:2px solid rgba(13,27,62,0.1);margin-bottom:1.25rem}
        .tab-item{flex:1;padding:0.6rem 0.25rem;font-size:0.58rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;font-family:'DM Sans',sans-serif;background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-2px;color:#0d1b3e;opacity:0.3;cursor:pointer;transition:all 0.15s}
        .tab-item.on{opacity:1;border-bottom-color:#0d1b3e}
        .opt-btn{cursor:pointer;border:1.5px solid rgba(13,27,62,0.2);padding:0.55rem 1.1rem;font-size:0.68rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;font-family:'DM Sans',sans-serif;background:transparent;color:#0d1b3e;transition:all 0.12s;border-radius:8px}
        .opt-btn.on{background:#0d1b3e;border-color:#0d1b3e;color:#faf6ee}
        .opt-btn:hover:not(.on){border-color:#0d1b3e;background:rgba(13,27,62,0.04)}
        .cswatch{width:34px;height:34px;border:1.5px solid rgba(13,27,62,0.2);cursor:pointer;padding:2px;background:none;flex-shrink:0;transition:border-color 0.12s}
        .cswatch:hover,.cswatch:focus{border-color:#0d1b3e;outline:none}
        .grad-strip{height:8px;border:1px solid rgba(13,27,62,0.1);margin:0.65rem 0}
        .inp-field{width:100%;background:transparent;border:none;border-bottom:1.5px solid rgba(13,27,62,0.15);color:#0d1b3e;padding:0.5rem 0;font-size:0.88rem;font-family:'DM Mono',monospace;outline:none;transition:border-color 0.15s}
        .inp-lbl{font-size:0.52rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#0d1b3e;opacity:0.38;margin-bottom:0.3rem}
        .chk-wrap{display:flex;align-items:center;gap:0.5rem;cursor:pointer}
        .chk-wrap input{width:13px;height:13px;accent-color:#0d1b3e;cursor:pointer;flex-shrink:0}
        .chk-lbl{font-size:0.58rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#0d1b3e;opacity:0.5}
        .sl-lbl{font-size:0.52rem;color:#0d1b3e;opacity:0.38;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.2rem}
        @media(max-width:860px){.gen-wrap{grid-template-columns:1fr}.gen-panel{border-right:none;border-bottom:2px solid #0d1b3e;padding:1.5rem}.gen-side{position:static;padding:1.5rem 1.5rem 2rem}}
      `}</style>

      <div className="gen-wrap">

        {/* ── LEFT PANEL ── */}
        <div className="gen-panel">

          {/* 01 · Contenu */}
          <div className="gen-sec">
            <SH n="01" t="Contenu"/>
            <div className="tab-row">
              {TABS.map(t=>(
                <button key={t.id} className={`tab-item${tab===t.id?" on":""}`}
                  onClick={()=>{setTab(t.id);setGenerated(false);}}>
                  {t.label}
                </button>
              ))}
            </div>
            {tab==="url" && (
              <div style={{marginBottom:"0.65rem"}}>
                <div className="inp-lbl">URL</div>
                <input className="inp-field" value={fields.url} onChange={e=>sf("url",e.target.value)} placeholder="https://exemple.com"/>
              </div>
            )}
            {tab==="wifi" && <>
              <div style={{marginBottom:"0.65rem"}}><div className="inp-lbl">Réseau</div><input className="inp-field" value={fields.wifiSsid} onChange={e=>sf("wifiSsid",e.target.value)} placeholder="MonWifi"/></div>
              <div style={{marginBottom:"0.65rem"}}><div className="inp-lbl">Mot de passe</div><input className="inp-field" type="password" value={fields.wifiPass} onChange={e=>sf("wifiPass",e.target.value)} placeholder="••••••"/></div>
              <div style={{marginBottom:"0.65rem"}}>
                <div className="inp-lbl" style={{marginBottom:"0.4rem"}}>Chiffrement</div>
                <div style={{display:"flex",gap:"0.35rem"}}>
                  {["WPA","WEP","nopass"].map(id=>(
                    <button key={id} className={`opt-btn${fields.wifiEnc===id?" on":""}`} onClick={()=>sf("wifiEnc",id)}>{id==="nopass"?"Aucun":id}</button>
                  ))}
                </div>
              </div>
            </>}
            {tab==="vcard" && <>
              {[["vcName","Nom","Jean Dupont"],["vcOrg","Organisation","Acme Corp"],["vcTel","Téléphone","+33 6 …"],["vcEmail","Email","contact@…"],["vcUrl","Site web","https://…"]].map(([k,l,p])=>(
                <div key={k} style={{marginBottom:"0.65rem"}}><div className="inp-lbl">{l}</div><input className="inp-field" value={fields[k]} onChange={e=>sf(k,e.target.value)} placeholder={p} type={k==="vcTel"?"tel":k==="vcEmail"?"email":"text"}/></div>
              ))}
            </>}
            {tab==="sms" && <>
              <div style={{marginBottom:"0.65rem"}}><div className="inp-lbl">Numéro</div><input className="inp-field" type="tel" value={fields.smsTo} onChange={e=>sf("smsTo",e.target.value)} placeholder="+33 6 …"/></div>
              <div style={{marginBottom:"0.65rem"}}><div className="inp-lbl">Message</div><input className="inp-field" value={fields.smsMsg} onChange={e=>sf("smsMsg",e.target.value)} placeholder="Bonjour !"/></div>
            </>}
          </div>

          {/* 02 · Couleurs */}
          <div className="gen-sec">
            <SH n="02" t="Couleurs"/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem",marginBottom:"1rem"}}>
              <div>
                <div className="inp-lbl" style={{marginBottom:"0.4rem"}}>Modules</div>
                <div style={{display:"flex",alignItems:"center",gap:"0.6rem"}}>
                  <input type="color" value={fgColor} onChange={e=>syncFg(e.target.value)} className="cswatch"/>
                </div>
              </div>
              <div>
                <div className="inp-lbl" style={{marginBottom:"0.4rem"}}>Fond</div>
                <div style={{display:"flex",gap:"0.3rem",marginBottom:"0.45rem"}}>
                  {[{id:"color",label:"Uni"},{id:"image",label:"Image"}].map(o=>(
                    <button key={o.id} className={`opt-btn${bgMode===o.id?" on":""}`} onClick={()=>setBgMode(o.id)}>{o.label}</button>
                  ))}
                </div>
                {bgMode==="color" && (
                  <div style={{display:"flex",alignItems:"center",gap:"0.6rem"}}>
                    <input type="color" value={bgColor} onChange={e=>setBgColor(e.target.value)} className="cswatch"/>
                  </div>
                )}
                {bgMode==="image" && <>
                  <button className="opt-btn" onClick={()=>bgFileRef.current.click()}>{bgImage?"Changer…":"Importer…"}</button>
                  <input ref={bgFileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setBgImage(ev.target.result);r.readAsDataURL(f);}}/>
                  {bgImage && <div style={{marginTop:"0.5rem"}}><div className="sl-lbl">{`Opacité — ${Math.round(bgOpacity*100)}%`}</div><input type="range" min={10} max={100} value={Math.round(bgOpacity*100)} onChange={e=>setBgOpacity(+e.target.value/100)} style={{width:"100%",accentColor:"#0d1b3e",cursor:"pointer"}}/></div>}
                </>}
              </div>
            </div>
            <label className="chk-wrap" style={{marginBottom:"0.65rem"}}>
              <input type="checkbox" checked={useGrad} onChange={e=>setUseGrad(e.target.checked)}/>
              <span className="chk-lbl">Dégradé</span>
            </label>
            {useGrad && (
              <div style={{padding:"0.9rem",background:"rgba(13,27,62,0.025)"}}>
                <div className="inp-lbl" style={{marginBottom:"0.4rem"}}>Direction</div>
                <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginBottom:"0.65rem"}}>
                  {GRAD_DIRS.map(o=><button key={o.id} className={`opt-btn${gradDir===o.id?" on":""}`} onClick={()=>setGradDir(o.id)}>{o.label}</button>)}
                </div>
                <div className="grad-strip" style={{background:gradPreview}}/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem",marginBottom:"0.65rem"}}>
                  <div><div className="inp-lbl" style={{marginBottom:"0.35rem"}}>Début</div><input type="color" value={gradStart} onChange={e=>syncGs(e.target.value)} className="cswatch"/></div>
                  <div><div className="inp-lbl" style={{marginBottom:"0.35rem"}}>Fin</div><input type="color" value={gradEnd} onChange={e=>setGradEnd(e.target.value)} className="cswatch"/></div>
                </div>
                <label className="chk-wrap">
                  <input type="checkbox" checked={useMid} onChange={e=>setUseMid(e.target.checked)}/>
                  <span className="chk-lbl">Couleur intermédiaire</span>
                </label>
                {useMid && <div style={{marginTop:"0.55rem"}}><input type="color" value={gradMid} onChange={e=>setGradMid(e.target.value)} className="cswatch"/></div>}
              </div>
            )}
          </div>

          {/* 03 · Modules */}
          <div className="gen-sec">
            <SH n="03" t="Forme des modules"/>
            <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginBottom:"0.85rem"}}>
              {MOD_SHAPES.map(o=><button key={o.id} className={`opt-btn${modShape===o.id?" on":""}`} onClick={()=>setModShape(o.id)}>{o.label}</button>)}
            </div>
            <div className="sl-lbl">{`Taille — ${Math.round(modSize*100)}%`}</div>
            <input type="range" min={30} max={100} value={Math.round(modSize*100)} onChange={e=>setModSize(+e.target.value/100)} style={{width:"100%",accentColor:"#0d1b3e",cursor:"pointer"}}/>
          </div>

          {/* 04 · Yeux */}
          <div className="gen-sec">
            <SH n="04" t="Style des yeux"/>
            <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginBottom:"0.75rem"}}>
              {EYE_SHAPES.map(o=><button key={o.id} className={`opt-btn${eyeShape===o.id?" on":""}`} onClick={()=>setEyeShape(o.id)}>{o.label}</button>)}
            </div>
            <label className="chk-wrap">
              <input type="checkbox" checked={syncEyes} onChange={e=>{setSyncEyes(e.target.checked);if(e.target.checked){setEyeOuter(fgColor);setEyeInner(fgColor);}}}/>
              <span className="chk-lbl">Suivre la couleur des modules</span>
            </label>
            {!syncEyes && (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem",marginTop:"0.65rem"}}>
                <div><div className="inp-lbl" style={{marginBottom:"0.35rem"}}>Contour</div><div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}><input type="color" value={eyeOuter} onChange={e=>setEyeOuter(e.target.value)} className="cswatch"/></div></div>
                <div><div className="inp-lbl" style={{marginBottom:"0.35rem"}}>Centre</div><div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}><input type="color" value={eyeInner} onChange={e=>setEyeInner(e.target.value)} className="cswatch"/></div></div>
              </div>
            )}
          </div>

          {/* 05 · Logo */}
          <div className="gen-sec">
            <SH n="05" t="Logo au centre"/>
            <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginBottom:"0.65rem"}}>
              {[{id:"none",label:"Aucun"},{id:"instagram",label:"Instagram"},{id:"custom",label:customLogo?"Changer…":"Importer…"}].map(o=>(
                <button key={o.id} className={`opt-btn${logoMode===o.id?" on":""}`} onClick={()=>{if(o.id==="custom")fileRef.current.click();else setLogoMode(o.id);}}>{o.label}</button>
              ))}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{setCustomLogo(ev.target.result);setLogoMode("custom");};r.readAsDataURL(f);}}/>
            {logoMode!=="none" && <>
              <div className="sl-lbl">{`Taille — ${Math.round(logoRatio*100)}%`}</div>
              <input type="range" min={10} max={35} value={Math.round(logoRatio*100)} onChange={e=>setLogoRatio(+e.target.value/100)} style={{width:"100%",accentColor:"#0d1b3e",cursor:"pointer",marginBottom:"0.5rem"}}/>
              <label className="chk-wrap">
                <input type="checkbox" checked={syncLogo} onChange={e=>{setSyncLogo(e.target.checked);if(e.target.checked)setLogoTint(fgColor);}}/>
                <span className="chk-lbl">Lier la couleur au logo</span>
              </label>
            </>}
          </div>

          {/* 06 · Effets */}
          <div className="gen-sec">
            <SH n="06" t="Effets & cadre"/>
            <div style={{marginBottom:"1rem"}}>
              <div className="inp-lbl" style={{marginBottom:"0.4rem"}}>Liquid Glass</div>
              <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginBottom:"0.55rem"}}>
                {[{id:"none",label:"Aucun"},{id:"modules",label:"Modules"},{id:"eyes",label:"Yeux"},{id:"both",label:"Les deux"}].map(o=>(
                  <button key={o.id} className={`opt-btn${glassMode===o.id?" on":""}`} onClick={()=>setGlassMode(o.id)}>{o.label}</button>
                ))}
              </div>
              {glassMode!=="none" && <>
                <div className="sl-lbl">{`Transparence — ${Math.round(glassOpacity*100)}%`}</div>
                <input type="range" min={5} max={60} value={Math.round(glassOpacity*100)} onChange={e=>setGlassOpacity(+e.target.value/100)} style={{width:"100%",accentColor:"#0d1b3e",cursor:"pointer"}}/>
              </>}
            </div>
            <div>
              <div className="inp-lbl" style={{marginBottom:"0.4rem"}}>Cadre décoratif</div>
              <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginBottom:"0.55rem"}}>
                {FRAMES.map(o=><button key={o.id} className={`opt-btn${frame===o.id?" on":""}`} onClick={()=>setFrame(o.id)}>{o.label}</button>)}
              </div>
              {frame!=="none" && <div style={{marginTop:"0.5rem"}}><input type="color" value={frameColor} onChange={e=>setFrameColor(e.target.value)} className="cswatch"/></div>}
            </div>
          </div>

          {/* 07 · Export */}
          <div className="gen-sec">
            <SH n="07" t="Format d'export"/>
            <div style={{display:"flex",gap:"0.3rem"}}>
              {EXPORTS.map(o=><button key={o.id} className={`opt-btn${exportFmt===o.id?" on":""}`} onClick={()=>setExportFmt(o.id)}>{o.label}</button>)}
            </div>
          </div>

        </div>

        {/* ── RIGHT SIDE ── */}
        <div className="gen-side">

          {/* Status bar */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:"1.5rem"}}>
            <span style={{fontSize:"0.5rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"#0d1b3e",opacity:0.3}}>Aperçu</span>
            {hasCustom && <span style={{fontSize:"0.48rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",background:"#0d1b3e",color:"#faf6ee",padding:"2px 6px"}}>Personnalisé</span>}
          </div>

          {/* Preview — canvas affiché directement, jamais d'img src exposée */}
          <div
            style={{position:"relative",background:generated?bgColor:"rgba(13,27,62,0.03)",aspectRatio:generated?"auto":"1",userSelect:"none"}}
            onContextMenu={e=>e.preventDefault()}
          >
            <canvas
              ref={canvasRef}
              onContextMenu={e=>e.preventDefault()}
              style={{width:"100%",height:"auto",display:generated?"block":"none",padding:"1.25rem",boxSizing:"border-box"}}
            />
            {/* Overlay transparent bloquant le clic droit et le drag */}
            {generated && (
              <div
                style={{position:"absolute",inset:0,zIndex:1,cursor:"default"}}
                onContextMenu={e=>e.preventDefault()}
                onDragStart={e=>e.preventDefault()}
              />
            )}
            {!generated && (
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"0.75rem"}}>
                <div style={{fontSize:"3.5rem",lineHeight:1,color:"#0d1b3e",opacity:0.07}}>◼</div>
                <div style={{fontSize:"0.52rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"#0d1b3e",opacity:0.18,textAlign:"center",fontFamily:"'DM Sans',sans-serif"}}>Aperçu<br/>QR code</div>
              </div>
            )}
          </div>

          {/* Pricing notice */}
          {hasCustom && (
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.55rem 0.75rem",background:"rgba(13,27,62,0.04)"}}>
              <span style={{fontSize:"0.5rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"#0d1b3e",opacity:0.4}}>Personnalisation</span>
              <span style={{fontSize:"0.85rem",fontWeight:800,color:"#0d1b3e",fontFamily:"'Syne',sans-serif"}}>1,99 €</span>
            </div>
          )}

          {/* Generate */}
          <button onClick={generate} disabled={!isReady||loading}
            style={{width:"100%",background:isReady&&!loading?"#0d1b3e":"rgba(13,27,62,0.12)",color:isReady&&!loading?"#faf6ee":"rgba(13,27,62,0.25)",border:"none",padding:"1rem 1.25rem",fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",cursor:isReady&&!loading?"pointer":"not-allowed",fontFamily:"'DM Sans',sans-serif",transition:"all 0.18s"}}>
            {loading ? "Génération…" : !libReady ? "Chargement…" : hasCustom ? "Générer l'aperçu →" : "Générer gratuitement →"}
          </button>

          {/* Download */}
          {generated && previewUrl && (
            <button
              onClick={() => {
                if (loggedInUser) {
                  if (hasCustom) {
                    const [first, ...rest] = loggedInUser.name.split(' ');
                    window.location.href = `/checkout?email=${encodeURIComponent(loggedInUser.email)}&first=${encodeURIComponent(first)}&last=${encodeURIComponent(rest.join(' '))}`;
                  } else {
                    download();
                  }
                } else {
                  setShowModal(true);
                }
              }}
              style={{width:"100%",background:hasCustom?"#0d1b3e":"transparent",border:"2px solid #0d1b3e",color:hasCustom?"#faf6ee":"#0d1b3e",padding:"0.85rem 1.25rem",fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.15s"}}>
              {hasCustom ? "Télécharger · 1,99 € →" : `↓ Télécharger ${exportFmt.toUpperCase()}`}
            </button>
          )}

          {/* Save to account — logged-in users only */}
          {generated && previewUrl && loggedInUser && (
            <div style={{borderTop:"1px solid rgba(13,27,62,0.1)",paddingTop:"0.75rem",display:"flex",flexDirection:"column",gap:"0.5rem"}}>
              <input
                type="text"
                placeholder="Nom du QR code…"
                value={qrName}
                onChange={e => setQrName(e.target.value)}
                className="inp-field"
                style={{fontSize:"0.82rem"}}
              />
              <button
                onClick={saveQr}
                disabled={!qrName.trim() || savingQr || savedQr}
                style={{width:"100%",background:"transparent",border:"1.5px solid rgba(13,27,62,0.3)",color:"#0d1b3e",padding:"0.7rem 1rem",fontSize:"0.58rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",cursor:!qrName.trim()||savingQr||savedQr?"not-allowed":"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.15s",opacity:!qrName.trim()||savingQr?0.4:1}}
              >
                {savedQr ? "Sauvegardé ✓" : savingQr ? "Sauvegarde…" : "Sauvegarder dans mon espace →"}
              </button>
            </div>
          )}

          {/* Hint */}
          {!isReady && libReady && (
            <p style={{fontSize:"0.5rem",color:"#0d1b3e",opacity:0.3,textAlign:"center",letterSpacing:"0.08em",fontFamily:"'DM Mono',monospace"}}>
              Saisissez un contenu pour générer
            </p>
          )}
        </div>

      </div>

      {/* ── Modal téléchargement ── */}
      {showModal && (
        <div
          onClick={e=>{if(e.target===e.currentTarget)setShowModal(false)}}
          style={{position:"fixed",inset:0,background:"rgba(13,27,62,0.55)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:"1.5rem"}}
        >
          <div style={{background:"#faf6ee",width:"100%",maxWidth:"420px",padding:"2.5rem",display:"flex",flexDirection:"column",gap:"1.5rem",animation:"fadeIn 0.2s ease"}}>

            {/* Header */}
            <div>
              <p style={{fontSize:"0.52rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"#0d1b3e",opacity:0.4,marginBottom:"0.5rem"}}>
                {hasCustom ? "Personnalisation · 1,99 €" : "Téléchargement gratuit"}
              </p>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.4rem",fontWeight:800,textTransform:"uppercase",color:"#0d1b3e",lineHeight:1.1}}>
                Vos coordonnées
              </h2>
              <p style={{fontSize:"0.75rem",color:"#0d1b3e",opacity:0.45,marginTop:"0.4rem",lineHeight:1.5}}>
                {hasCustom
                  ? "Renseignez vos informations pour continuer vers le paiement. Votre QR code vous sera envoyé par email."
                  : "Renseignez vos informations pour télécharger votre QR code gratuitement."}
              </p>
            </div>

            {/* Fields */}
            <div style={{display:"flex",flexDirection:"column",gap:"1.1rem"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
                <div>
                  <div style={{fontSize:"0.52rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#0d1b3e",opacity:0.4,marginBottom:"0.35rem"}}>Prénom</div>
                  <input
                    type="text" value={modalFirst} onChange={e=>setModalFirst(e.target.value)}
                    placeholder="Jean"
                    style={{width:"100%",background:"transparent",border:"none",borderBottom:"1.5px solid rgba(13,27,62,0.25)",color:"#0d1b3e",padding:"0.4rem 0",fontSize:"0.9rem",fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box"}}
                  />
                </div>
                <div>
                  <div style={{fontSize:"0.52rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#0d1b3e",opacity:0.4,marginBottom:"0.35rem"}}>Nom</div>
                  <input
                    type="text" value={modalLast} onChange={e=>setModalLast(e.target.value)}
                    placeholder="Dupont"
                    style={{width:"100%",background:"transparent",border:"none",borderBottom:"1.5px solid rgba(13,27,62,0.25)",color:"#0d1b3e",padding:"0.4rem 0",fontSize:"0.9rem",fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box"}}
                  />
                </div>
              </div>
              <div>
                <div style={{fontSize:"0.52rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#0d1b3e",opacity:0.4,marginBottom:"0.35rem"}}>Email</div>
                <input
                  type="email" value={modalEmail} onChange={e=>setModalEmail(e.target.value)}
                  placeholder="jean.dupont@exemple.com"
                  style={{width:"100%",background:"transparent",border:"none",borderBottom:"1.5px solid rgba(13,27,62,0.25)",color:"#0d1b3e",padding:"0.4rem 0",fontSize:"0.9rem",fontFamily:"'DM Mono',monospace",outline:"none",boxSizing:"border-box"}}
                />
              </div>
            </div>

            {/* Actions */}
            <ModalActions
              valid={modalFirst.trim().length > 0 && modalLast.trim().length > 0 && /\S+@\S+\.\S+/.test(modalEmail)}
              hasCustom={hasCustom}
              onSubmit={() => {
                const type = hasCustom ? 'paid' : 'free';
                fetch('/api/track-download', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    first_name: modalFirst.trim(),
                    last_name:  modalLast.trim(),
                    email:      modalEmail.trim(),
                    download_type: type,
                  }),
                }).catch(() => {});
                if (hasCustom) {
                  window.location.href = `/checkout?email=${encodeURIComponent(modalEmail)}&first=${encodeURIComponent(modalFirst)}&last=${encodeURIComponent(modalLast)}`;
                } else {
                  download();
                  setShowModal(false);
                }
              }}
              onCancel={()=>setShowModal(false)}
            />

          </div>
        </div>
      )}
    </>
  );
}

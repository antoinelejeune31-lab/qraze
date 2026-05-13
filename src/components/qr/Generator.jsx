"use client"
import { useState, useRef, useEffect } from "react";

const LOGO_B64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAIAAABEtEjdAAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAfSgAwAEAAAAAQAAAfQAAAAAhFSjgwAAAAlwSFlzAAALEwAACxMBAJqcGAAAABxpRE9UAAAAAgAAAAAAAAD6AAAAKAAAAPoAAAD6AAAulV0nAsgAAC5hSURBVHgB7J139O1EuYZdLvDiVUEBERBBehFs9C4daVKld2lKrweOIEhVEQHpClIUjvSiFAFBKQIqRek27Ni99e/73Ju7srIy3zc7yU6ys+e8rLNY+c2ezHzzzuTJZMo3b/jvf/5W/6SAFJACUiAxBd6QWHlUHCkgBaSAFEABwV0fLlJACkiBBBUQ3BOsVHVbpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKCu+AuBaSAFEhQAcE9wUpVn0UKSAEpILgL7lJACkiBBBUQ3BOsVPVZpIAUkAKC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";

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
        // Other logos (Barna B, custom): mask tint color with logo alpha
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
  const [gradMidPos, setGradMidPos] = useState(0.5);
  const [gradSPos,   setGradSPos]   = useState(0);
  const [gradEPos,   setGradEPos]   = useState(1);
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

  const canvasRef  = useRef(null);
  const fileRef    = useRef(null);
  const bgFileRef  = useRef(null);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js";
    s.onload = () => setLibReady(true);
    document.head.appendChild(s);
  }, []);

  const sf = (k,v) => setFields(f=>({...f,[k]:v}));
  const syncFg = (v) => { setFgColor(v); if(syncEyes){setEyeOuter(v);setEyeInner(v);} if(syncLogo){setLogoTint(v);} };
  const syncGs = (v) => { setGradStart(v); if(syncEyes){setEyeOuter(v);setEyeInner(v);} if(syncLogo){setLogoTint(v);} };

  const logoSrc = logoMode==="barna" ? LOGO_B64 : logoMode==="instagram" ? IG_GRADIENT : logoMode==="custom" ? customLogo : null;

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

  const isReady = libReady && buildText(tab,fields).length > 2;

  // ── UI helpers ──
  const Label = ({ch}) => <div style={{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:"#0d1b3e",opacity:0.45,marginBottom:"0.5rem"}}>{ch}</div>;
  const Sec = ({title,children}) => <div style={{marginBottom:"1.1rem"}}><Label ch={title}/>{children}</div>;
  const Btns = ({opts,val,onChange}) => (
    <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
      {opts.map(o=>(
        <button key={o.id} onClick={()=>onChange(o.id)} style={{cursor:"pointer",border:`1.5px solid ${val===o.id?"#0d1b3e":"#c5bfb0"}`,padding:"0.32rem 0.7rem",fontSize:"0.61rem",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",background:val===o.id?"#0d1b3e":"#faf6ee",color:val===o.id?"#faf6ee":"#0d1b3e",transition:"all 0.15s"}}>
          {o.label}
        </button>
      ))}
    </div>
  );
  const CRow = ({label,val,onChange}) => (
    <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
      <input type="color" value={val} onChange={e=>onChange(e.target.value)} style={{width:"30px",height:"30px",border:"1.5px solid #c5bfb0",padding:"2px",cursor:"pointer",background:"none"}}/>
      <span style={{fontSize:"0.58rem",fontFamily:"'DM Mono',monospace",color:"#0d1b3e",opacity:0.55}}>{label} {val}</span>
    </div>
  );
  const Inp = ({label,val,onChange,ph,type="text"}) => (
    <div style={{marginBottom:"0.65rem"}}>
      <div style={{fontSize:"0.57rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"#0d1b3e",opacity:0.42,marginBottom:"0.25rem"}}>{label}</div>
      <input type={type} value={val} onChange={e=>onChange(e.target.value)} placeholder={ph}
        style={{width:"100%",background:"transparent",border:"none",borderBottom:"1.5px solid #c5bfb0",color:"#0d1b3e",padding:"0.4rem 0",fontSize:"0.85rem",fontFamily:"'DM Mono',monospace",outline:"none"}}/>
    </div>
  );
  const Chk = ({label,val,onChange}) => (
    <label style={{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}}>
      <input type="checkbox" checked={val} onChange={e=>onChange(e.target.checked)} style={{width:"13px",height:"13px",accentColor:"#0d1b3e",cursor:"pointer"}}/>
      <span style={{fontSize:"0.6rem",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#0d1b3e",opacity:0.55}}>{label}</span>
    </label>
  );
  const Slider = ({label,min,max,val,onChange}) => (
    <div>
      <div style={{fontSize:"0.57rem",color:"#0d1b3e",opacity:0.42,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.2rem"}}>{label}</div>
      <input type="range" min={min} max={max} value={val} onChange={e=>onChange(+e.target.value)} style={{width:"100%",accentColor:"#0d1b3e",cursor:"pointer"}}/>
    </div>
  );
  const HR = () => <div style={{height:"1px",background:"#0d1b3e",opacity:0.08,margin:"0.9rem 0"}}/>;

  // Reference helpers to avoid false-positive ESLint 'no-unused-vars' in this large, dynamic component
  // They are used throughout the JSX below; this explicit reference silences the rule safely.
  void [Label, Sec, Btns, CRow, Inp, Chk, Slider, HR, logoTint];

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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box}
        ::placeholder{color:#b8b0a0;font-family:'DM Mono',monospace}
        input[type=text]:focus,input[type=password]:focus,input[type=tel]:focus,input[type=email]:focus{border-bottom:2px solid #0d1b3e!important;outline:none}
      `}</style>

      <div style={{minHeight:"100vh",background:"#faf6ee",display:"flex",alignItems:"flex-start",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",padding:"2rem"}}>
        <div style={{background:"#faf6ee",padding:"2rem",maxWidth:"500px",width:"100%",border:"1.5px solid #0d1b3e",boxShadow:"8px 8px 0 #0d1b3e"}}>

          {/* Logo */}
          <div style={{textAlign:"center",marginBottom:"1.25rem"}}>
            <img src={LOGO_B64} alt="Barna B" style={{height:"40px"}}/>
          </div>
          <HR/>

          {/* Content type */}
          <Sec title="Type de contenu">
            <Btns opts={TABS} val={tab} onChange={v=>{setTab(v);setGenerated(false);}}/>
          </Sec>

          {tab==="url"   && <Inp label="URL" val={fields.url} onChange={v=>sf("url",v)} ph="https://exemple.com"/>}
          {tab==="wifi"  && <>
            <Inp label="Nom du réseau" val={fields.wifiSsid} onChange={v=>sf("wifiSsid",v)} ph="MonWifi"/>
            <Inp label="Mot de passe"  val={fields.wifiPass} onChange={v=>sf("wifiPass",v)} ph="••••••" type="password"/>
            <div style={{marginBottom:"0.65rem"}}><Label ch="Chiffrement"/><Btns opts={[{id:"WPA",label:"WPA"},{id:"WEP",label:"WEP"},{id:"nopass",label:"Aucun"}]} val={fields.wifiEnc} onChange={v=>sf("wifiEnc",v)}/></div>
          </>}
          {tab==="vcard" && <>
            <Inp label="Nom"          val={fields.vcName}  onChange={v=>sf("vcName",v)}  ph="Jean Dupont"/>
            <Inp label="Organisation" val={fields.vcOrg}   onChange={v=>sf("vcOrg",v)}   ph="Barna B"/>
            <Inp label="Téléphone"    val={fields.vcTel}   onChange={v=>sf("vcTel",v)}   ph="+33 6 …" type="tel"/>
            <Inp label="Email"        val={fields.vcEmail} onChange={v=>sf("vcEmail",v)} ph="contact@…" type="email"/>
            <Inp label="Site web"     val={fields.vcUrl}   onChange={v=>sf("vcUrl",v)}   ph="https://…"/>
          </>}
          {tab==="sms"   && <>
            <Inp label="Numéro"  val={fields.smsTo}  onChange={v=>sf("smsTo",v)}  ph="+33 6 …" type="tel"/>
            <Inp label="Message" val={fields.smsMsg} onChange={v=>sf("smsMsg",v)} ph="Bonjour !"/>
          </>}

          <HR/>

          {/* Colors */}
          <Sec title="Couleurs">
            <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"0.75rem"}}>
              <CRow label="Modules" val={fgColor} onChange={syncFg}/>
              <div>
                <div style={{fontSize:"0.57rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"#0d1b3e",opacity:0.42,marginBottom:"0.35rem"}}>Fond</div>
                <div style={{display:"flex",gap:"0.4rem",marginBottom:"0.35rem"}}>
                  {[{id:"color",label:"Couleur"},{id:"image",label:"Image"}].map(o=>(
                    <button key={o.id} onClick={()=>setBgMode(o.id)} style={{cursor:"pointer",border:`1.5px solid ${bgMode===o.id?"#0d1b3e":"#c5bfb0"}`,padding:"0.28rem 0.6rem",fontSize:"0.58rem",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",background:bgMode===o.id?"#0d1b3e":"#faf6ee",color:bgMode===o.id?"#faf6ee":"#0d1b3e"}}>
                      {o.label}
                    </button>
                  ))}
                </div>
                {bgMode==="color" && <CRow label="" val={bgColor} onChange={setBgColor}/>}
                {bgMode==="image" && <>
                  <button onClick={()=>bgFileRef.current.click()} style={{cursor:"pointer",border:"1.5px solid #c5bfb0",padding:"0.28rem 0.65rem",fontSize:"0.58rem",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",background:"#faf6ee",color:"#0d1b3e",marginBottom:"0.4rem"}}>
                    {bgImage?"Changer…":"Importer…"}
                  </button>
                  <input ref={bgFileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setBgImage(ev.target.result);r.readAsDataURL(f);}}/>
                  {bgImage && <>
                    <Slider label={`Opacité — ${Math.round(bgOpacity*100)}%`} min={10} max={100} val={Math.round(bgOpacity*100)} onChange={v=>setBgOpacity(v/100)}/>
                    <div style={{marginTop:"0.35rem",height:"32px",backgroundImage:`url(${bgImage})`,backgroundSize:"cover",backgroundPosition:"center",border:"1px solid #c5bfb0",opacity:bgOpacity}}/>
                  </>}
                </>}
              </div>
            </div>
            <Chk label="Dégradé" val={useGrad} onChange={setUseGrad}/>
            {useGrad && <div style={{marginTop:"0.65rem"}}>
              <div style={{fontSize:"0.57rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"#0d1b3e",opacity:0.42,marginBottom:"0.35rem"}}>Direction</div>
              <Btns opts={GRAD_DIRS} val={gradDir} onChange={setGradDir}/>
              <div style={{height:"10px",borderRadius:"2px",background:gradPreview,margin:"0.65rem 0"}}/>
              <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"0.6rem"}}>
                <CRow label="Début" val={gradStart} onChange={syncGs}/>
                <CRow label="Fin"   val={gradEnd}   onChange={setGradEnd}/>
              </div>
              <div style={{display:"flex",gap:"1rem",marginBottom:"0.6rem",flexWrap:"wrap"}}>
                <div style={{flex:1,minWidth:"110px"}}><Slider label={`Position début — ${Math.round(gradSPos*100)}%`} min={0} max={80} val={Math.round(gradSPos*100)} onChange={v=>setGradSPos(v/100)}/></div>
                <div style={{flex:1,minWidth:"110px"}}><Slider label={`Position fin — ${Math.round(gradEPos*100)}%`}   min={20} max={100} val={Math.round(gradEPos*100)} onChange={v=>setGradEPos(v/100)}/></div>
              </div>
              <Chk label="Couleur intermédiaire" val={useMid} onChange={setUseMid}/>
              {useMid && <div style={{marginTop:"0.55rem",display:"flex",gap:"1rem",flexWrap:"wrap",alignItems:"center"}}>
                <CRow label="Milieu" val={gradMid} onChange={setGradMid}/>
                <div style={{flex:1,minWidth:"110px"}}><Slider label={`Position — ${Math.round(gradMidPos*100)}%`} min={10} max={90} val={Math.round(gradMidPos*100)} onChange={v=>setGradMidPos(v/100)}/></div>
              </div>}
            </div>}
          </Sec>

          <HR/>

          {/* Modules */}
          <Sec title="Forme des modules">
            <Btns opts={MOD_SHAPES} val={modShape} onChange={setModShape}/>
            <div style={{marginTop:"0.65rem"}}>
              <Slider label={`Taille des modules — ${Math.round(modSize*100)}%`} min={30} max={100} val={Math.round(modSize*100)} onChange={v=>setModSize(v/100)}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.55rem",color:"#0d1b3e",opacity:0.35,marginTop:"0.1rem",fontFamily:"'DM Mono',monospace"}}>
                <span>Aéré</span><span>Plein</span>
              </div>
            </div>
          </Sec>

          {/* Eyes */}
          <Sec title="Style des yeux">
            <Btns opts={EYE_SHAPES} val={eyeShape} onChange={setEyeShape}/>
            <div style={{marginTop:"0.55rem"}}><Chk label="Suivre la couleur des modules" val={syncEyes} onChange={v=>{setSyncEyes(v);if(v){setEyeOuter(fgColor);setEyeInner(fgColor);}}}/></div>
            {!syncEyes && <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginTop:"0.55rem"}}>
              <CRow label="Contour" val={eyeOuter} onChange={setEyeOuter}/>
              <CRow label="Centre"  val={eyeInner} onChange={setEyeInner}/>
            </div>}
          </Sec>

          <HR/>

          {/* Logo */}
          <Sec title="Logo au centre">
            <Btns opts={[{id:"none",label:"Aucun"},{id:"barna",label:"Barna B"},{id:"instagram",label:"Instagram"},{id:"custom",label:customLogo?"Changer…":"Importer…"}]} val={logoMode}
              onChange={v=>{if(v==="custom")fileRef.current.click();else setLogoMode(v);}}/>
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{setCustomLogo(ev.target.result);setLogoMode("custom");};r.readAsDataURL(f);}}/>
            {logoMode!=="none" && <div style={{marginTop:"0.55rem"}}>
              <Slider label={`Taille — ${Math.round(logoRatio*100)}%`} min={10} max={35} val={Math.round(logoRatio*100)} onChange={v=>setLogoRatio(v/100)}/>
              <div style={{marginTop:"0.55rem"}}>
                <Chk label="Lier la couleur au logo" val={syncLogo} onChange={v=>{setSyncLogo(v);if(v)setLogoTint(fgColor);}}/>
              </div>
            </div>}
          </Sec>

          {/* Glass */}
          <Sec title="Effet Liquid Glass">
            <Btns opts={[{id:"none",label:"Aucun"},{id:"modules",label:"Modules"},{id:"eyes",label:"Yeux"},{id:"both",label:"Les deux"}]} val={glassMode} onChange={setGlassMode}/>
            {glassMode!=="none" && <div style={{marginTop:"0.65rem"}}>
              <Slider label={`Transparence — ${Math.round(glassOpacity*100)}%`} min={5} max={60} val={Math.round(glassOpacity*100)} onChange={v=>setGlassOpacity(v/100)}/>
              <div style={{fontSize:"0.55rem",color:"#0d1b3e",opacity:0.4,marginTop:"0.25rem",fontFamily:"'DM Mono',monospace",letterSpacing:"0.05em"}}>
                💡 Fonctionne mieux avec un fond coloré ou une image
              </div>
            </div>}
          </Sec>

          {/* Frame */}
          <Sec title="Cadre décoratif">
            <Btns opts={FRAMES} val={frame} onChange={setFrame}/>
            {frame!=="none" && <div style={{marginTop:"0.55rem"}}><CRow label="Couleur" val={frameColor} onChange={setFrameColor}/></div>}
          </Sec>

          {/* Export */}
          <Sec title="Format d'export"><Btns opts={EXPORTS} val={exportFmt} onChange={setExportFmt}/></Sec>

          {/* Generate */}
          <button onClick={generate} disabled={!isReady||loading}
            style={{width:"100%",background:isReady&&!loading?"#0d1b3e":"#ddd8cc",color:"#faf6ee",border:"none",padding:"0.85rem",fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.18em",textTransform:"uppercase",cursor:isReady&&!loading?"pointer":"not-allowed",fontFamily:"'DM Sans',sans-serif",marginBottom:"1.5rem",transition:"all 0.2s"}}>
            {loading?"Génération…":libReady?"Générer le QR Code":"Chargement…"}
          </button>

          {/* Canvas (hidden, used for rendering) */}
          <canvas ref={canvasRef} style={{display:"none"}}/>

          {/* Preview from dataURL */}
          {generated && previewUrl && (
            <div style={{animation:"fadeIn 0.3s ease"}}>
              <div style={{border:"1.5px solid #0d1b3e",padding:"0.75rem",textAlign:"center",background:bgColor}}>
                <img src={previewUrl} alt="QR Code" style={{width:"100%",maxWidth:"260px",display:"block",margin:"0 auto"}}/>
              </div>
              <button onClick={download}
                style={{display:"block",width:"100%",marginTop:"0.85rem",background:"transparent",border:"1.5px solid #0d1b3e",color:"#0d1b3e",padding:"0.65rem",fontSize:"0.65rem",fontWeight:600,letterSpacing:"0.18em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                ↓ Télécharger {exportFmt.toUpperCase()}
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

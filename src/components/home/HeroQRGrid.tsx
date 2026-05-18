'use client'
import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    qrcode: (t: number, ec: string) => {
      addData(s: string): void; make(): void
      getModuleCount(): number; isDark(r: number, c: number): boolean
    }
  }
}

type Shape   = 'round'|'square'|'diamond'|'dot'|'star'|'heart'
type GradDir = 'diagonal'|'radial'|'horizontal'|'vertical'
type Eye     = 'round'|'square'|'leaf'

type Theme = { fg0:string; fg1:string; dir:GradDir; bg:string; mod:Shape; eye:Eye }

const THEMES: Theme[] = [
  { fg0:'#0d1b3e', fg1:'#2563eb', dir:'diagonal',   bg:'#ffffff', mod:'round',   eye:'round'  },
  { fg0:'#7c2d12', fg1:'#fb923c', dir:'diagonal',   bg:'#fff7ed', mod:'star',    eye:'square' },
  { fg0:'#052e16', fg1:'#16a34a', dir:'radial',     bg:'#f0fdf4', mod:'dot',     eye:'round'  },
  { fg0:'#78350f', fg1:'#d97706', dir:'horizontal', bg:'#fffbeb', mod:'diamond', eye:'square' },
  { fg0:'#581c87', fg1:'#a855f7', dir:'diagonal',   bg:'#faf5ff', mod:'round',   eye:'leaf'   },
  { fg0:'#c8b8ff', fg1:'#818cf8', dir:'diagonal',   bg:'#0f0a1a', mod:'square',  eye:'square' },
  { fg0:'#881337', fg1:'#fb7185', dir:'radial',     bg:'#fff1f2', mod:'heart',   eye:'round'  },
  { fg0:'#0e4d4d', fg1:'#14b8a6', dir:'horizontal', bg:'#f0fdfa', mod:'diamond', eye:'square' },
  { fg0:'#111827', fg1:'#9ca3af', dir:'vertical',   bg:'#f9fafb', mod:'square',  eye:'leaf'   },
  { fg0:'#92400e', fg1:'#fbbf24', dir:'diagonal',   bg:'#fefce8', mod:'star',    eye:'round'  },
  { fg0:'#1e3a5f', fg1:'#38bdf8', dir:'diagonal',   bg:'#f0f9ff', mod:'dot',     eye:'round'  },
  { fg0:'#3b0764', fg1:'#e879f9', dir:'radial',     bg:'#fdf4ff', mod:'round',   eye:'leaf'   },
]

// ── Drawing helpers ────────────────────────────────────────────────────────

function starPath(ctx: CanvasRenderingContext2D, cx:number, cy:number, r:number) {
  const step = Math.PI / 5
  ctx.beginPath()
  for (let i=0;i<10;i++){const a=i*step-Math.PI/2,rd=i%2===0?r:r*0.42;i===0?ctx.moveTo(cx+Math.cos(a)*rd,cy+Math.sin(a)*rd):ctx.lineTo(cx+Math.cos(a)*rd,cy+Math.sin(a)*rd)}
  ctx.closePath()
}

function heartPath(ctx: CanvasRenderingContext2D, cx:number, cy:number, r:number) {
  ctx.beginPath()
  ctx.moveTo(cx, cy+r*0.3)
  ctx.bezierCurveTo(cx-r*1.1, cy-r*0.3, cx-r*1.1, cy-r*1.1, cx, cy-r*0.4)
  ctx.bezierCurveTo(cx+r*1.1, cy-r*1.1, cx+r*1.1, cy-r*0.3, cx, cy+r*0.3)
  ctx.closePath()
}

function drawMod(ctx: CanvasRenderingContext2D, x:number, y:number, size:number, shape:Shape) {
  const p=size*0.1, s=size-p*2, cx=x+size/2, cy=y+size/2, r=s/2
  ctx.beginPath()
  switch(shape) {
    case 'round':   ctx.arc(cx,cy,r,0,Math.PI*2); break
    case 'dot':     ctx.arc(cx,cy,r*0.6,0,Math.PI*2); break
    case 'diamond': ctx.moveTo(cx,cy-r);ctx.lineTo(cx+r,cy);ctx.lineTo(cx,cy+r);ctx.lineTo(cx-r,cy);ctx.closePath(); break
    case 'star':    starPath(ctx,cx,cy,r); break
    case 'heart':   heartPath(ctx,cx,cy,r*0.75); break
    default:        ctx.roundRect(x+p,y+p,s,s,size*0.15)
  }
  ctx.fill()
}

function drawEye(ctx: CanvasRenderingContext2D, ox:number, oy:number, cell:number, fg:string, bg:string, eye:Eye) {
  const full=cell*7, cx=ox+full/2, cy=oy+full/2
  const rr = eye==='round'?cell*1.2 : eye==='leaf'?[cell*1.2,cell*0.1,cell*1.2,cell*0.1] as any : 0
  ctx.fillStyle = fg
  ctx.beginPath(); ctx.roundRect(ox,oy,full,full,rr); ctx.fill()
  ctx.fillStyle = bg
  ctx.beginPath(); ctx.roundRect(ox+cell,oy+cell,cell*5,cell*5, eye==='round'?cell*0.7:eye==='leaf'?[cell*0.7,cell*0.05,cell*0.7,cell*0.05] as any:0); ctx.fill()
  ctx.fillStyle = fg
  ctx.beginPath()
  if (eye==='round') ctx.arc(cx,cy,cell*1.5,0,Math.PI*2)
  else if (eye==='leaf') ctx.roundRect(ox+cell*2,oy+cell*2,cell*3,cell*3,[cell*0.5,0,cell*0.5,0])
  else ctx.rect(ox+cell*2,oy+cell*2,cell*3,cell*3)
  ctx.fill()
}

function renderTheme(canvas: HTMLCanvasElement, theme: Theme) {
  if (!window.qrcode) return
  const ctx = canvas.getContext('2d')!
  const qr  = window.qrcode(0,'M')
  qr.addData('https://qraze.fr'); qr.make()
  const n=qr.getModuleCount(), Q=4, S=400, cell=S/(n+Q*2)
  canvas.width=S; canvas.height=S
  ctx.fillStyle=theme.bg; ctx.fillRect(0,0,S,S)

  let grad: CanvasGradient
  if      (theme.dir==='radial')     grad=ctx.createRadialGradient(S/2,S/2,0,S/2,S/2,S*.65)
  else if (theme.dir==='horizontal') grad=ctx.createLinearGradient(0,0,S,0)
  else if (theme.dir==='vertical')   grad=ctx.createLinearGradient(0,0,0,S)
  else                               grad=ctx.createLinearGradient(0,0,S,S)
  grad.addColorStop(0,theme.fg0); grad.addColorStop(1,theme.fg1)
  ctx.fillStyle=grad

  const isEye=(r:number,c:number)=>(r<8&&c<8)||(r<8&&c>=n-8)||(r>=n-8&&c<8)
  for(let r=0;r<n;r++) for(let c=0;c<n;c++) {
    if(!qr.isDark(r,c)||isEye(r,c)) continue
    drawMod(ctx,(c+Q)*cell,(r+Q)*cell,cell,theme.mod)
  }
  ;[{r:0,c:0},{r:0,c:n-7},{r:n-7,c:0}].forEach(({r,c})=>
    drawEye(ctx,(c+Q)*cell,(r+Q)*cell,cell,theme.fg0,theme.bg,theme.eye)
  )
}

// ── Single animated cell ───────────────────────────────────────────────────

function QRCell({ startIdx, delay, libReady }: { startIdx:number; delay:number; libReady:boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [idx,     setIdx]     = useState(startIdx)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!libReady || !canvasRef.current) return
    renderTheme(canvasRef.current, THEMES[startIdx])
    const t = setTimeout(() => setVisible(true), delay + 60)
    return () => clearTimeout(t)
  }, [libReady, startIdx, delay])

  useEffect(() => {
    if (!libReady) return
    const t = setTimeout(() => {
      const id = setInterval(() => {
        setVisible(false)
        setTimeout(() => {
          setIdx(prev => {
            const next = (prev + 1) % THEMES.length
            if (canvasRef.current) renderTheme(canvasRef.current, THEMES[next])
            return next
          })
          setTimeout(() => setVisible(true), 60)
        }, 320)
      }, 2800)
      return () => clearInterval(id)
    }, delay)
    return () => clearTimeout(t)
  }, [libReady, delay])

  const theme = THEMES[idx]
  return (
    <div
      style={{
        backgroundColor: theme.bg,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.32s ease, background-color 0.4s ease',
      }}
    >
      <canvas ref={canvasRef} style={{ width:'100%', height:'auto', display:'block' }} />
    </div>
  )
}

// ── Grid export ────────────────────────────────────────────────────────────

export function HeroQRGrid() {
  const [libReady, setLibReady] = useState(false)

  useEffect(() => {
    if ((window as any).qrcode) { setLibReady(true); return }
    const s = document.createElement('script')
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js'
    s.onload = () => setLibReady(true)
    document.head.appendChild(s)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-3">
      {[0, 3, 6, 9].map((startIdx, i) => (
        <QRCell key={i} startIdx={startIdx} delay={i * 600} libReady={libReady} />
      ))}
    </div>
  )
}

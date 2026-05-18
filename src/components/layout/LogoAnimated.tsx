export function LogoAnimated({ height = 72 }: { height?: number }) {
  const letters = [
    {
      delay: '0ms',
      rects: [
        [10,0],[20,0],[30,0],
        [0,10],[40,10],
        [0,20],[40,20],
        [0,30],[40,30],
        [0,40],[20,40],[40,40],
        [0,50],[30,50],
        [10,60],[20,60],[40,60],
      ],
    },
    {
      delay: '130ms',
      rects: [
        [60,0],[70,0],[80,0],[90,0],
        [60,10],[100,10],
        [60,20],[100,20],
        [60,30],[70,30],[80,30],[90,30],
        [60,40],[80,40],
        [60,50],[90,50],
        [60,60],[100,60],
      ],
    },
    {
      delay: '55ms',
      rects: [
        [130,0],[140,0],[150,0],
        [120,10],[160,10],
        [120,20],[160,20],
        [120,30],[130,30],[140,30],[150,30],[160,30],
        [120,40],[160,40],
        [120,50],[160,50],
        [120,60],[160,60],
      ],
    },
    {
      delay: '210ms',
      rects: [
        [180,0],[190,0],[200,0],[210,0],[220,0],
        [220,10],
        [210,20],
        [200,30],
        [190,40],
        [180,50],
        [180,60],[190,60],[200,60],[210,60],[220,60],
      ],
    },
    {
      delay: '20ms',
      rects: [
        [240,0],[250,0],[260,0],[270,0],[280,0],
        [240,10],
        [240,20],
        [240,30],[250,30],[260,30],[270,30],
        [240,40],
        [240,50],
        [240,60],[250,60],[260,60],[270,60],[280,60],
      ],
    },
  ]

  const scale = height / 70

  return (
    <>
      <style>{`
        @keyframes letter-drop {
          0%   { transform: translateY(-160px); opacity: 0; }
          58%  { transform: translateY(0px);    opacity: 1; }
          72%  { transform: translateY(-14px); }
          84%  { transform: translateY(0px); }
          92%  { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        .logo-letter {
          animation: letter-drop 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 290 70"
        fill="#0A1A3A"
        shapeRendering="crispEdges"
        style={{ height: `${height}px`, width: 'auto', overflow: 'visible' }}
        aria-label="QRaze"
      >
        {letters.map((letter, i) => (
          <g
            key={i}
            className="logo-letter"
            style={{ animationDelay: letter.delay }}
          >
            {letter.rects.map(([x, y], j) => (
              <rect key={j} x={x} y={y} width="10" height="10" />
            ))}
          </g>
        ))}
      </svg>
    </>
  )
}

import { useEffect, useRef } from 'react';
import { useTempo } from '../context/TempoContext';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { intensity } = useTempo();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(scale, scale);
    };

    window.addEventListener('resize', resize);
    resize();

    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);
    
    const colors = [
      'rgba(26, 161, 137, 0.8)',  // cyber-teal
      'rgba(225, 90, 52, 0.8)',   // cyber-orange
      'rgba(255, 255, 255, 0.6)'  // white
    ];

    const draw = () => {
      // Adjust fade based on beat intensity
      ctx.fillStyle = `rgba(10, 9, 14, ${0.1 + intensity * 0.4})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const alpha = 0.8 - (intensity * 0.3); // Reduce opacity on beats
        
        ctx.fillStyle = color.replace(/[\d.]+\)$/g, `${alpha})`);
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40"
      style={{ zIndex: 1 }}
    />
  );
};

export default MatrixRain;
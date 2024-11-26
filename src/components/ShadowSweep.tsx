import { useEffect, useRef } from 'react';
import { useTempo } from '../context/TempoContext';

const ShadowSweep = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { intensity } = useTempo();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    type Shadow = {
      x: number;
      progress: number;
      speed: number;
      width: number;
      opacity: number;
    };

    const shadows: Shadow[] = [
      { x: -500, progress: 0, speed: 0.2, width: 800, opacity: 0.4 },
      { x: -800, progress: 0.3, speed: 0.15, width: 1000, opacity: 0.3 },
      { x: -300, progress: 0.6, speed: 0.25, width: 600, opacity: 0.35 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shadows.forEach((shadow) => {
        const gradient = ctx.createLinearGradient(
          shadow.x + (canvas.width * shadow.progress),
          0,
          shadow.x + shadow.width + (canvas.width * shadow.progress),
          0
        );

        // Adjust shadow opacity based on beat intensity
        const adjustedOpacity = shadow.opacity + (intensity * 0.3);

        gradient.addColorStop(0, `rgba(10, 9, 14, 0)`);
        gradient.addColorStop(0.5, `rgba(10, 9, 14, ${adjustedOpacity})`);
        gradient.addColorStop(1, `rgba(10, 9, 14, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Speed up shadows slightly during beats
        const speedMultiplier = 1 + (intensity * 0.5);
        shadow.progress += (shadow.speed * speedMultiplier) / 100;
        if (shadow.progress > 1.5) {
          shadow.progress = -0.5;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ShadowSweep;
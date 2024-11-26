import { useEffect, useRef } from 'react';

const MandelbrotBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseImageRef = useRef<ImageData | null>(null);

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
      baseImageRef.current = null; // Reset base image on resize
    };
    resize();
    window.addEventListener('resize', resize);

    const zoom = 200;
    const offsetX = -2;
    const offsetY = -1.5;
    let frame = 0;
    let pulses: { x: number; y: number; age: number }[] = [];
    const maxPulseAge = 15; // Reduced from 30 for faster pulses

    const createPulse = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      pulses.push({ x: centerX, y: centerY, age: 0 });
    };

    const generateBaseMandelbrot = () => {
      const width = canvas.width;
      const height = canvas.height;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      const dpr = window.devicePixelRatio || 1;

      const maxIterations = 30;
      const pixelStep = Math.max(3, Math.floor(Math.max(width, height) / 600) * dpr);

      for (let x = 0; x < width; x += pixelStep) {
        for (let y = 0; y < height; y += pixelStep) {
          const real = (x / dpr) / zoom + offsetX;
          const imag = (y / dpr) / zoom + offsetY;

          let zReal = real;
          let zImag = imag;
          let i;

          for (i = 0; i < maxIterations; i++) {
            const zReal2 = zReal * zReal;
            const zImag2 = zImag * zImag;

            if (zReal2 + zImag2 > 4) break;

            zImag = 2 * zReal * zImag + imag;
            zReal = zReal2 - zImag2 + real;
          }

          const setPixel = (px: number, py: number) => {
            if (px >= width || py >= height) return;
            
            const pixelIndex = (py * width + px) * 4;
            
            if (i === maxIterations) {
              data[pixelIndex] = 10;
              data[pixelIndex + 1] = 9;
              data[pixelIndex + 2] = 14;
              data[pixelIndex + 3] = 255;
            } else {
              const value = i / maxIterations;
              data[pixelIndex] = Math.sin(value * Math.PI * 2) * 20 + 25;
              data[pixelIndex + 1] = Math.sin((value + 0.33) * Math.PI * 2) * 15 + 20;
              data[pixelIndex + 2] = Math.sin((value + 0.66) * Math.PI * 2) * 30 + 35;
              data[pixelIndex + 3] = 140;
            }
          };

          for (let fx = 0; fx < pixelStep; fx++) {
            for (let fy = 0; fy < pixelStep; fy++) {
              setPixel(x + fx, y + fy);
            }
          }
        }
      }

      return imageData;
    };

    const draw = () => {
      if (!baseImageRef.current) {
        baseImageRef.current = generateBaseMandelbrot();
      }

      // Start with the base Mandelbrot pattern
      const currentFrame = ctx.createImageData(baseImageRef.current);
      const data = currentFrame.data;

      // Apply pulse effects
      const width = canvas.width;
      const height = canvas.height;

      for (const pulse of pulses) {
        const pulseRadius = pulse.age * 40; // Increased speed of pulse expansion
        const pulseWidth = 40; // Slightly reduced pulse width

        // Only process pixels in the pulse area
        const minX = Math.max(0, Math.floor(pulse.x - pulseRadius - pulseWidth));
        const maxX = Math.min(width, Math.ceil(pulse.x + pulseRadius + pulseWidth));
        const minY = Math.max(0, Math.floor(pulse.y - pulseRadius - pulseWidth));
        const maxY = Math.min(height, Math.ceil(pulse.y + pulseRadius + pulseWidth));

        for (let x = minX; x < maxX; x += 2) { // Skip pixels for performance
          for (let y = minY; y < maxY; y += 2) {
            const dx = x - pulse.x;
            const dy = y - pulse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (Math.abs(distance - pulseRadius) < pulseWidth) {
              const intensity = (1 - Math.abs(distance - pulseRadius) / pulseWidth) * 
                              (1 - pulse.age / maxPulseAge) * 0.8;
              
              const pixelIndex = (y * width + x) * 4;
              data[pixelIndex] = data[pixelIndex] * (1 - intensity) + 255 * intensity;
              data[pixelIndex + 1] = data[pixelIndex + 1] * (1 - intensity) + 255 * intensity;
              data[pixelIndex + 2] = data[pixelIndex + 2] * (1 - intensity) + 255 * intensity;
            }
          }
        }
      }

      ctx.putImageData(currentFrame, 0, 0);

      // Update and clean up pulses
      pulses = pulses.filter(pulse => pulse.age < maxPulseAge);
      pulses.forEach(pulse => pulse.age++);

      // Create new pulse every 30 frames (twice as frequent as before)
      if (frame % 30 === 0) {
        createPulse();
      }

      frame++;
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-75"
      style={{ zIndex: 0 }}
    />
  );
};

export default MandelbrotBackground;
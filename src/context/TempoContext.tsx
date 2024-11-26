import { createContext, useContext, useEffect, useState } from 'react';

interface TempoContextType {
  beat: number;
  intensity: number;
}

const TempoContext = createContext<TempoContextType>({ beat: 0, intensity: 0 });

export const useTempo = () => useContext(TempoContext);

export const TempoProvider = ({ children }: { children: React.ReactNode }) => {
  const [beat, setBeat] = useState(0);
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const BPM = 160;
    const msPerBeat = (60 * 1000) / BPM;
    const beatsPerPattern = 8;

    let lastTime = performance.now();

    const updateBeat = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      const newBeat = (beat + (deltaTime / msPerBeat)) % beatsPerPattern;
      setBeat(newBeat);

      // Calculate intensity based on beats 1 and 6
      const beatPosition = newBeat % beatsPerPattern;
      const isEmphasisBeat = Math.floor(beatPosition) === 0 || Math.floor(beatPosition) === 5;
      const fractionalPart = beatPosition % 1;

      if (isEmphasisBeat && fractionalPart < 0.1) {
        setIntensity(Math.max(0, 1 - (fractionalPart * 10)));
      } else {
        setIntensity(0);
      }

      lastTime = currentTime;
      requestAnimationFrame(updateBeat);
    };

    requestAnimationFrame(updateBeat);
  }, [beat]);

  return (
    <TempoContext.Provider value={{ beat, intensity }}>
      {children}
    </TempoContext.Provider>
  );
};
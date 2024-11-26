import { useTempo } from '../context/TempoContext';

const VideoBackground = () => {
  const { intensity } = useTempo();
  
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-cyber-dark/80 to-cyber-purple/80 mix-blend-multiply z-10"
        style={{
          backgroundColor: `rgba(10, 9, 14, ${0.8 + intensity * 0.2})`,
          transition: 'background-color 100ms ease-out'
        }}
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60 transition-opacity duration-100"
        style={{ 
          filter: 'hue-rotate(220deg) saturate(80%)',
          opacity: 0.6 - (intensity * 0.3)
        }}
      >
        <source
          src="https://cdn.pixabay.com/vimeo/470402790/Liquid%20-%2046309.mp4?width=1280&hash=0a86269cd85f33c3efac06a1a3bab5c477c7a103"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
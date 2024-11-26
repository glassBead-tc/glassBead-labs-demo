import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const GlitchText = ({ children, className }: { children: string, className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.03) { // 3% chance every check
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isGlitching) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={`relative ${className}`}>
      <span className="absolute top-0 left-0 text-cyber-orange translate-x-[1px] translate-y-[1px] opacity-70">
        {children}
      </span>
      <span className="absolute top-0 left-0 text-cyber-teal -translate-x-[1px] -translate-y-[1px] opacity-70">
        {children}
      </span>
      {children}
    </span>
  );
};

const Header = () => {
  return (
    <header className="glass-panel fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <GlitchText className="text-cyber-text font-bold text-xl">
              glassBead-labs
            </GlitchText>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              to="/about"
              className="group relative overflow-hidden"
            >
              <GlitchText className="text-cyber-text group-hover:text-cyber-orange transition-colors duration-200">
                About
              </GlitchText>
            </Link>
            <Link 
              to="/contact"
              className="group relative overflow-hidden"
            >
              <GlitchText className="text-cyber-text group-hover:text-cyber-teal transition-colors duration-200">
                Contact
              </GlitchText>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
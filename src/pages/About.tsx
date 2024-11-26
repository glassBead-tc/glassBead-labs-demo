const About = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          {/* Futuristic oval background with blur effect */}
          <div className="absolute inset-0 bg-cyber-purple/10 backdrop-blur-sm rounded-[100px] transform -rotate-1 scale-105" />
          <div className="absolute inset-0 bg-cyber-purple/5 backdrop-blur-sm rounded-[100px] transform rotate-1 scale-105" />
          
          {/* Main content container */}
          <div className="glass-panel p-12 rounded-[80px] relative overflow-hidden border border-cyber-teal/20">
            <h1 className="text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-cyber-orange/90 via-cyber-teal/80 to-cyber-orange/90 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                About Us
              </span>
            </h1>
            
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-cyber-orange/90 via-cyber-teal/80 to-cyber-orange/90 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                  Typescript is GenAI tomorrow.
                  <br />
                  TypeScript is GenAI today.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './src/components/Header';
import Home from './src/pages/Home';
import About from './src/pages/About';
import Contact from './src/pages/Contact';
import VideoBackground from './src/components/VideoBackground';
import ShadowSweep from './src/components/ShadowSweep';
import MatrixRain from './src/components/MatrixRain';
import { TempoProvider } from './src/context/TempoContext';
import './index.css';
import React from 'react';

function App() {
  return (
    <TempoProvider>
      <Router>
        <div className="relative min-h-screen bg-cyber-dark">
          <VideoBackground />
          <MatrixRain />
          <ShadowSweep />
          <div className="relative z-10">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </TempoProvider>
  );
}

export default App;
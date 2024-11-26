import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import VideoBackground from './components/VideoBackground';
import ShadowSweep from './components/ShadowSweep';
import MatrixRain from './components/MatrixRain';
import { TempoProvider } from './context/TempoContext';
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

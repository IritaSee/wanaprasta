import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import './App.css';

// Import article components
import WhatIsWanaprastha from './components/articles/WhatIsWanaprastha';
import Benefits from './components/articles/Benefits';
import Practices from './components/articles/Practices';

function Home() {
  return (
    <>
      <div className="hero">
        <h1 className="hero-title">
          Discover <span className="highlight">Wanaprasta</span>
        </h1>
        <p className="hero-description">
          An integrated tourism paradigm based on cultural and environmental harmony that brings communities and travelers together.
        </p>
        <div className="cta-buttons">
          <Link to="/what-is-wanaprastha" className="btn btn-primary">
            Get Started
            <ArrowRightIcon className="btn-icon" />
          </Link>
          <Link to="/benefits" className="btn btn-secondary">
            Learn More
          </Link>
        </div>
      </div>

      <div id="features" className="features">
        <Link to="/what-is-wanaprastha" className="feature-card hover:shadow-lg transition-shadow duration-300">
          <div className="feature-icon bg-primary">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3>What is Wanaprastha?</h3>
          <p>Discover the philosophy and principles behind Wanaprastha Tourism and its cultural significance.</p>
          <div className="mt-4 text-green-700 font-medium">Read more →</div>
        </Link>
        
        <Link to="/benefits" className="feature-card hover:shadow-lg transition-shadow duration-300">
          <div className="feature-icon bg-secondary">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3>Benefits</h3>
          <p>Explore the environmental, cultural, and community benefits of Wanaprastha Tourism.</p>
          <div className="mt-4 text-green-700 font-medium">Read more →</div>
        </Link>
        
        <Link to="/practices" className="feature-card hover:shadow-lg transition-shadow duration-300">
          <div className="feature-icon bg-accent">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3>Sustainable Practices</h3>
          <p>Learn about the eco-friendly accommodations and responsible tourism activities we promote.</p>
          <div className="mt-4 text-green-700 font-medium">Read more →</div>
        </Link>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app min-h-screen flex flex-col">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-content">
              <div className="nav-logo">
                <Link to="/" className="text-2xl font-bold">Wanaprasta</Link>
              </div>
              <div className="nav-links">
                <Link to="/what-is-wanaprastha" className="nav-link">About</Link>
                <Link to="/benefits" className="nav-link">Benefits</Link>
                <Link to="/practices" className="nav-link">Practices</Link>
              </div>
              <div className="mobile-menu">
                <button className="menu-button">
                  <svg className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="main-content flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/what-is-wanaprastha" element={<WhatIsWanaprastha />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/practices" element={<Practices />} />
          </Routes>
        </main>

        <footer className="bg-gray-100 py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="text-center text-gray-600">
              <p>© {new Date().getFullYear()} Wanaprasta Tourism. All rights reserved.</p>
              <div className="mt-4 space-x-4">
                <Link to="/what-is-wanaprastha" className="hover:text-gray-900">About</Link>
                <Link to="/benefits" className="hover:text-gray-900">Benefits</Link>
                <Link to="/practices" className="hover:text-gray-900">Practices</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

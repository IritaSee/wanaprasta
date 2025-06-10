import { ArrowRightIcon } from '@heroicons/react/24/outline'
import './App.css'

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-logo">
              <span>Wanaprasta</span>
            </div>
            <div className="nav-links">
              <a href="#about" className="nav-link">About</a>
              <a href="#features" className="nav-link">Features</a>
              <a href="#contact" className="nav-link">Contact</a>
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

      <main className="main-content">
        <div className="hero">
          <h1 className="hero-title">
            Discover <span className="highlight">Wanaprasta</span>
          </h1>
          <p className="hero-description">
            An integrated tourism paradigm based on cultural and environmental harmony that brings communities and travelers together.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary">
              Get Started
              <ArrowRightIcon className="btn-icon" />
            </button>
            <button className="btn btn-secondary">
              Learn More
            </button>
          </div>
        </div>

        <div id="features" className="features">
          <div className="feature-card">
            <div className="feature-icon bg-indigo">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3>Cultural Heritage</h3>
            <p>Experience the rich cultural tapestry of Wanaprasta through authentic local experiences and traditions.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon bg-green">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3>Environmental Harmony</h3>
            <p>Discover sustainable tourism practices that protect and preserve our natural environment for future generations.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon bg-purple">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3>Community Engagement</h3>
            <p>Connect with local communities and contribute to meaningful cultural exchanges and sustainable development.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

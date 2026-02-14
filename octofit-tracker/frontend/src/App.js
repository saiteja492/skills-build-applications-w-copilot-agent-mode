import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.png';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="OctoFit Logo" className="app-logo" />
            OctoFit Tracker
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <span role="img" aria-label="home">🏠</span> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  <span role="img" aria-label="activities">🏃</span> Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  <span role="img" aria-label="leaderboard">🏆</span> Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  <span role="img" aria-label="teams">👥</span> Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <span role="img" aria-label="users">👤</span> Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  <span role="img" aria-label="workouts">🎯</span> Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-4 mb-4">
        <Routes>
          <Route path="/" element={
            <div>
              <div className="hero-section text-center">
                <h1 className="display-4 mb-3">Welcome to OctoFit Tracker</h1>
                <p className="lead mb-4">Track your fitness activities and compete with your team!</p>
                <Link to="/activities" className="btn btn-light btn-lg me-2">
                  Get Started
                </Link>
                <Link to="/leaderboard" className="btn btn-outline-light btn-lg">
                  View Leaderboard
                </Link>
              </div>

              <div className="row mt-4">
                <div className="col-md-4 mb-4">
                  <div className="card feature-card h-100">
                    <div className="card-body text-center">
                      <div className="icon text-primary">🏃</div>
                      <h5 className="card-title">Track Activities</h5>
                      <p className="card-text text-muted">Log your daily workouts and activities to monitor your progress.</p>
                      <Link to="/activities" className="btn btn-primary">View Activities</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card feature-card h-100">
                    <div className="card-body text-center">
                      <div className="icon text-warning">🏆</div>
                      <h5 className="card-title">Compete</h5>
                      <p className="card-text text-muted">See how you rank against others on the leaderboard.</p>
                      <Link to="/leaderboard" className="btn btn-warning">View Leaderboard</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card feature-card h-100">
                    <div className="card-body text-center">
                      <div className="icon text-success">👥</div>
                      <h5 className="card-title">Join Teams</h5>
                      <p className="card-text text-muted">Create or join teams to collaborate and compete together.</p>
                      <Link to="/teams" className="btn btn-success">View Teams</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>

      <footer className="footer text-center">
        <div className="container">
          <span>© 2026 OctoFit Tracker - Built with React & Bootstrap</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

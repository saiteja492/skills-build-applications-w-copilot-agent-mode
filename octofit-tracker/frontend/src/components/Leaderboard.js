import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching leaderboard from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard data received:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard array:', leaderboardData);
        setLeaderboard(leaderboardData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="badge bg-warning text-dark">🥇 1st</span>;
    if (rank === 2) return <span className="badge bg-secondary">🥈 2nd</span>;
    if (rank === 3) return <span className="badge bg-danger">🥉 3rd</span>;
    return <span className="badge bg-light text-dark">{rank}th</span>;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
        <hr />
        <p className="mb-0">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <span role="img" aria-label="leaderboard">🏆</span> Leaderboard
        </h2>
        <span className="badge bg-warning text-dark">{leaderboard.length} Participants</span>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Top Performers</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-4">
                      No leaderboard data available
                    </td>
                  </tr>
                ) : (
                  leaderboard.map((entry, index) => (
                    <tr key={entry._id || entry.id || index} className={index < 3 ? 'table-active' : ''}>
                      <td>{getRankBadge(index + 1)}</td>
                      <td>
                        <strong>{entry.user?.username || entry.user}</strong>
                      </td>
                      <td>
                        <span className="badge bg-success fs-6">{entry.score} pts</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;

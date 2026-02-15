import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Fetching teams from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams data received:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams array:', teamsData);
        setTeams(teamsData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading teams...</p>
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
          <span role="img" aria-label="teams">👥</span> Teams
        </h2>
        <span className="badge bg-success">{teams.length} Teams</span>
      </div>

      <div className="row">
        {teams.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info" role="alert">
              No teams found. Create a team to get started!
            </div>
          </div>
        ) : (
          teams.map((team, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={team._id || team.id || index}>
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="mb-0">
                    <span role="img" aria-label="team">👥</span> {team.name}
                  </h5>
                </div>
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Members</h6>
                  <div>
                    {team.members && team.members.length > 0 ? (
                      team.members.map((member, idx) => (
                        <span key={idx} className="badge bg-primary me-1 mb-1">
                          {member.username || member}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">No members yet</span>
                    )}
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <small className="text-muted">
                    {team.members?.length || 0} member(s)
                  </small>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Teams;

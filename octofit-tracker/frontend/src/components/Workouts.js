import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching workouts from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts data received:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts array:', workoutsData);
        setWorkouts(workoutsData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading workouts...</p>
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
          <span role="img" aria-label="workouts">🎯</span> Workouts
        </h2>
        <span className="badge bg-danger">{workouts.length} Workouts</span>
      </div>

      <div className="row">
        {workouts.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info" role="alert">
              No workouts found. Add a workout to get started!
            </div>
          </div>
        ) : (
          workouts.map((workout, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={workout._id || workout.id || index}>
              <div className="card h-100">
                <div className="card-header bg-danger text-white">
                  <h5 className="mb-0">
                    <span role="img" aria-label="workout">💪</span> {workout.name}
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{workout.description || 'No description available'}</p>
                </div>
                <div className="card-footer bg-transparent">
                  <button className="btn btn-outline-danger btn-sm w-100">
                    Start Workout
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Workouts;

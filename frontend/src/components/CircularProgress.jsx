export default function CircularProgress({ percentage }) {
  const radius = 76;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-wrapper">
      <svg viewBox="0 0 180 180" className="progress-svg">
        <circle
          cx="90"
          cy="90"
          r={radius}
          className="progress-track"
        />

        <circle
          cx="90"
          cy="90"
          r={radius}
          className="progress-value"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="progress-center">
        <span className="progress-number">{percentage}%</span>
        <span className="progress-label">COMPLETED</span>
      </div>
    </div>
  );
}
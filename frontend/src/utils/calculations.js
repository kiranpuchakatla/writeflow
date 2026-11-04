export const calculateProgress = (completed, total) => {
  if (!total) return 0;
  return Math.min(100, Math.round((completed / total) * 100));
};

export const calculateRemaining = (completed, total) => {
  return Math.max(0, total - completed);
};

export const calculateSpeed = (pages, seconds) => {
  if (!seconds || seconds <= 0) return 0;
  return Number((pages / (seconds / 3600)).toFixed(2));
};

export const calculateRemainingTime = (remaining, speed) => {
  if (!speed || speed <= 0) return null;
  return Math.ceil((remaining / speed) * 60);
};

export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export const formatEstimate = (minutes) => {
  if (minutes === null) return "Calculating...";
  if (minutes === 0) return "Completed";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};
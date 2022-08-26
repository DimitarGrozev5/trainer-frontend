type seconds = number;

// Function to format duration to hours:minutes:seconds
export const formatDurationClock = (duration: seconds): string => {
  return duration.toString();
};

// Format duration to h or m or s
export const formatDurationText = (duration: seconds): string => {
  if (duration <= 60) {
    return `${Math.floor(duration)}s`;
  }

  if (duration <= 60 * 60) {
    return `${Math.floor(duration / 60)}m`;
  }

  return `${Math.floor(duration / 60 / 60)}h`;
};

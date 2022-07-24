import formatDuration from "format-duration";

export const formatTime = (timeInSeconds = 0) =>
  formatDuration(timeInSeconds * 1000);

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

import { useEffect, useState } from "react";
import { useWeatherContext } from "../context/weatherContext";

const StatusMessage = () => {
  const { loading, error, lastUpdated } = useWeatherContext();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (date) => {
    if (!date) return "";
    const seconds = Math.floor((now - new Date(date)) / 1000);

    if (seconds < 6) return "Recently";

    if (seconds < 60) return `${seconds}s ago`;
    const mins = Math.floor(seconds / 60);
    return `${mins} min${mins > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="text-white opacity-70 text-sm mt-4 tracking-wider text-center">
      {loading && <p className="animate-pulse">Fetching new data…</p>}
      {!loading && !error && lastUpdated && (
        <p>Last updated: {formatTimeAgo(lastUpdated)}</p>
      )}
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
};

export default StatusMessage;

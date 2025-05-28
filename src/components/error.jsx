import { useWeatherContext } from "../context/weatherContext";

const ErrorDisplay = () => {
  const { error, weatherData, loading } = useWeatherContext();

  // No error and valid data, nothing to show
  if (!error && weatherData && !weatherData.error) return null;

  // Determine error message
  let message = "⚠️ Error fetching data";

  if (weatherData?.error) {
    if (weatherData.cod === "NETWORK_ERROR") {
      message = "⚠️ Network error. ";
    } else if (weatherData.cod === "404") {
      message = "⚠️ City not found. ";
    } else {
      message = weatherData.message || message;
    }
  } else if (error) {
    message = error;
  }

  return (
    <div className="mt-6 text-white font-bold text-xl text-center">
      {(error || weatherData?.error) && !loading ? message : ""}
    </div>
  );
};

export default ErrorDisplay;

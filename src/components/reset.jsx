import { useWeatherContext } from "../context/weatherContext";

const ResetButton = () => {
  const { resetWeather } = useWeatherContext();

  return (
    <button
      onClick={resetWeather}
      className="mt-2 px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 cursor-pointer "
    >
      Reset Weather
    </button>
  );
};

export default ResetButton;

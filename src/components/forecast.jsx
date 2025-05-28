import ForecastCard from "./forecastCard";

const Forecast = ({ forecast, unit }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-white mb-2">5-Day Forecast</h2>
      <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
        {forecast.map((day, index) => (
          <ForecastCard key={index} day={day} unit={unit} />
        ))}
      </div>
    </div>
  );
};

export default Forecast;

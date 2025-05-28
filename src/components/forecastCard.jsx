const ForecastCard = ({ day, unit }) => {
  const dayTemp =
    unit === "C" ? day.temp : ((day.temp * 9) / 5 + 32).toFixed(1);

  return (
    <div className="bg-white/10 text-white p-3 w-[130px] rounded-lg flex flex-col items-center">
      <p className="text-sm">
        {new Date(day.date).toLocaleDateString(undefined, {
          weekday: "short",
          day: "numeric",
          month: "short",
        })}
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
        alt="icon"
        className="w-12 h-12"
      />
      <p>{day.weather}</p>
      <p className="font-bold">
        {dayTemp}°{unit}
      </p>
    </div>
  );
};

export default ForecastCard;

import { useEffect, useState } from "react";
import { WeatherProvider, useWeatherContext } from "./context/weatherContext";
import SearchInput from "./components/search";
import WeatherInfo from "./components/weather";
import ErrorDisplay from "./components/error";
import LoadingSkeleton from "./components/skeleton";

const WeatherMain = () => {
  const { error, weatherData, loading } = useWeatherContext();
  const [bg, setBg] = useState("/pics/welcome.jpg");

  useEffect(() => {
    if (weatherData && !weatherData.error) {
      setBg(`/pics/${weatherData.icon || "welcome"}.jpg`);
    } else {
      setBg("/pics/welcome.jpg");
    }
  }, [weatherData]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="min-h-screen w-full flex flex-col items-center justify-center py-10 px-4">
        <div className="z-10 relative box bg-black/50 backdrop-blur-md p-5 rounded-lg text-center shadow-[0_16px_60px_rgba(0,0,0,0.6)] w-[90vw] max-w-4xl my-4">
          <h1 className="text-3xl font-bold text-white my-4">
            Hey, Good {greeting()}
          </h1>
          {!loading && !error && !weatherData ? (
            <p className="text-lg text-white font-lighter mb-4 tracking-[10px] mt-[-10px]">
              WELCOME TO THE WEATHER APP!!
            </p>
          ) : (
            ""
          )}
          <SearchInput />
          {loading ? <LoadingSkeleton /> : <WeatherInfo />}
          <ErrorDisplay />
          {!loading && !error && !weatherData ? (
            <p className="mt-6 text-white font-bold text-xl text-center">
              Please enter a City!
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

const App = () => (
  <WeatherProvider>
    <WeatherMain />
  </WeatherProvider>
);

export default App;

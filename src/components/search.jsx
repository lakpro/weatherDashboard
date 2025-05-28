import { useState } from "react";
import { useWeatherContext } from "../context/weatherContext";

const SearchInput = () => {
  const { fetchWeather } = useWeatherContext();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) fetchWeather(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4 py-5"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter City"
        className="input h-[50px] text-lg font-bold rounded-lg bg-white/60 text-black w-full max-w-[300px] text-center focus:bg-white/70"
      />
      <button className="btn h-[50px] w-full max-w-[300px] text-lg font-bold rounded-lg bg-white/60 text-black px-4 py-2 cursor-pointer hover:bg-white/70">
        Search
      </button>
    </form>
  );
};

export default SearchInput;

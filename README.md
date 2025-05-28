# 🌦️ Weather Dashboard

![Home](https://github.com/user-attachments/assets/1d334590-a5ea-4468-9014-3c2b52e9e4b9)
![Weather](https://github.com/user-attachments/assets/fa43276f-0bf4-4549-97c1-f80d0926c4f7)

A responsive, real-time weather dashboard built with **React.js** and the **OpenWeatherMap API**. It allows users to search for any city and view current weather conditions along with a 5-day forecast.

---

## 🚀 Features

- 🔍 Search for a city’s weather
- 🌡️ Current temperature, humidity, and wind speed
- 🌤️ Weather icons and conditions (sunny, cloudy, rainy, etc.)
- 🔁 Auto-refresh every 30 seconds (polling)
- 💾 Local storage for last searched city and preferred metric (C/F)
- ⚠️ Error handling (invalid city, network errors)
- 📅 5-day forecast at 12:00 PM each day
- 🕒 Time display based on the city’s timezone

---

## 🛠️ Tech Stack

- React.js
- Vite
- Tailwind CSS
- OpenWeatherMap API
- React Context API for state management

---

## 📁 Folder Structure
```
src/
├── components/
│ ├── error.jsx
│ ├── reset.jsx
│ ├── search.jsx
│ ├── skeleton.jsx
│ ├── status.jsx
│ └── weather.jsx
├── context/
│ └── weatherContext.jsx
├── hooks/
│ └── useWeather.jsx
├── utils/
│ └── api.js
├── App.jsx
```

**Steps to run:**
```bash
cd weatherDashboard
npm install
npm run dev
```

---

## 🧑‍💻 Author

**Lakshay (Lakpro)**   - Fullstack Developer 
 
If you'd like to learn more or check out more projects, visit my [portfolio](https://lakpro.github.io).


---




import React, { useState } from "react";
import { InputField } from "./input";
import { ButtonElevated } from "./button";
import { motion, AnimatePresence } from "framer-motion";

// WEATHER ICON MAP - Updated, keyed strictly by OpenWeatherMap "icon" codes
// See: https://openweathermap.org/weather-conditions
const iconMap = {
  "01d": "/v2/sunny.png",
  "01n": "/v2/clear_night.png",
  "02d": "/v2/partly_cloudy.png",
  "02n": "/v2/partly_cloudy_night.png",
  "03d": "/v2/cloudy.png",
  "03n": "/v2/cloudy.png",
  "04d": "/v2/mostly_cloudy_day.png",
  "04n": "/v2/mostly_cloudy_night.png",
  "09d": "/v2/showers_rain.png",
  "09n": "/v2/showers_rain.png",
  "10d": "/v2/scattered_showers_day.png",
  "10n": "/v2/scattered_showers_night.png",
  "11d": "/v2/strong_tstorms.png",
  "11n": "/v2/isolated_scattered_tstorms_night.png",
  "13d": "/v2/heavy_snow.png",
  "13n": "/v2/heavy_snow.png",
  "50d": "/v2/haze_fog_dust_smoke.png",
  "50n": "/v2/haze_fog_dust_smoke.png",
};


// Safer fallback icon if nothing else found:
const fallbackIcon = "/v2/cloudy.png";

// PanelImageContent rewritten for OWM "icon" code logic
function PanelImageContentWithIcon({ weatherData, iconCode }) {
  if (!weatherData || !weatherData.city) return null;

  const { city, country, temperature, condition, humidity, windSpeed } = weatherData;

  let iconUrl = (iconCode && iconMap[iconCode]) || fallbackIcon;

  return (
    <div
      className="rounded-2xl p-6 border shadow-md flex flex-col items-center"
      style={{ background: "#F4F4F4", borderColor: "#1D546C" }}
    >
      {iconUrl && (
        <img
          key={iconUrl}
          src={iconUrl}
          alt={condition}
          className="mb-4 w-24 h-24"
          style={{ filter: "drop-shadow(0 4px 16px #1D546C22)" }}
          loading="lazy"
        />
      )}
      <h2 className="font-bold text-2xl mb-1" style={{ color: "#1D546C" }}>
        {city}
        {country ? `, ${country}` : ""}
      </h2>
      <div className="text-5xl font-bold mb-2" style={{ color: "#1D546C" }}>{temperature}</div>
      <div className="capitalize text-lg mb-4" style={{ color: "#1D546C" }}>{condition}</div>
      <div className="flex gap-4 text-sm" style={{ color: "#1D546C" }}>
        <span>💧 Humidity: {humidity}</span>
        <span>💨 Wind: {windSpeed}</span>
      </div>
    </div>
  );
}

// Customized Navigation wrapper to move "About" to the right
function NavigationWithAboutRight() {
  return (
    <nav
      className="flex items-center justify-between w-full max-w-5xl mx-auto py-4 px-6"
      style={{ background: "#F4F4F4" }}
    >
      <div className="flex items-center gap-6">
        <span className="font-bold text-xl tracking-tight" style={{ color: "#1D546C" }}>WeatherApp</span>
      </div>
      <div className="flex-1" />
      <a
        href="https://www.sedkiy.dev"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#1D546C",
          whiteSpace: "nowrap",
          fontWeight: "500",
          transition: "color 0.2s",
        }}
        onMouseOver={e => (e.currentTarget.style.color = "#102B36")}
        onMouseOut={e => (e.currentTarget.style.color = "#1D546C")}
      >
        About
      </a>
    </nav>
  );
}

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [weatherData, setWeatherData] = useState({
    city: "",
    country: "",
    temperature: "",
    condition: "",
    humidity: "",
    windSpeed: "",
  });
  const [showPanel, setShowPanel] = useState(false);
  // Use icon code from OWM API response:
  const [weatherIconCode, setWeatherIconCode] = useState("");
  // Track lastPanelKey for <AnimatePresence> exit/enter separation
  const [lastPanelKey, setLastPanelKey] = useState(null);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const handleSearch = async () => {
    if (!searchValue) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        alert("City not found!");
        setShowPanel(false);
        return;
      }

      const data = await response.json();
      const weather0 = data.weather && data.weather[0];

      let rawMain = weather0?.main || "";
      let rawDescription = weather0?.description || "";
      let iconCode = weather0?.icon || "";
      // Compose panel key BEFORE updating state
      const nextPanelKey =
        (data.name || "") +
        (data.main?.temp ? `${Math.round(data.main.temp)}°C` : "") +
        (iconCode || "");

      setShowPanel(false);

      // Wait for exit animation BEFORE showing new panel (to properly trigger AnimatePresence exit/enter)
      setTimeout(() => {
        setWeatherData({
          city: data.name || "",
          country: data.sys?.country || "",
          temperature: data.main?.temp ? `${Math.round(data.main.temp)}°C` : "",
          condition: rawDescription ? rawDescription : rawMain,
          humidity: data.main?.humidity ? `${data.main.humidity}%` : "",
          windSpeed: data.wind?.speed ? `${Math.round(data.wind.speed)} m/s` : "",
        });
        setWeatherIconCode(iconCode);
        setLastPanelKey(nextPanelKey);
        setShowPanel(true);
      }, 350);

      setSearchValue("");
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Failed to fetch weather data.");
      setShowPanel(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen"
      style={{ background: "#F4F4F4" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <NavigationWithAboutRight />
      <main className="flex flex-col items-center gap-8 mt-12 px-4">
        <motion.div
          className="flex gap-4 w-full max-w-xl rounded-2xl p-6 border"
          style={{
            background: "#F4F4F4",
            borderColor: "#1D546C",
          }}
        >
          <InputField
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border outline-none text-lg transition-all duration-300"
            style={{
              borderColor: "#1D546C",
              background: "#F4F4F4",
              color: "#1D546C",
              fontWeight: "500",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Enter a city name"
          />
          <ButtonElevated
            onClick={handleSearch}
            className="px-5 py-2 rounded-lg text-white transition-all duration-200 active:scale-95 shadow"
            style={{
              background: "linear-gradient(90deg, #1D546C 0%, #287694 100%)",
              color: "#F4F4F4",
              fontWeight: 600,
            }}
          />
        </motion.div>
        <div className="w-full flex justify-center">
          <AnimatePresence mode="wait">
            {showPanel && (
              <motion.div
                key={lastPanelKey ?? ""}
                initial={{ opacity: 0, y: -32, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 32, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                  duration: 0.5,
                }}
                className="w-full max-w-md mt-4"
              >
                <PanelImageContentWithIcon weatherData={weatherData} iconCode={weatherIconCode} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
}

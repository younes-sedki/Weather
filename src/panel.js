export const PanelImageContent = ({ weatherData }) => {
  const { city, country, temperature, condition, humidity, windSpeed } =
    weatherData;

  if (!city) {
    return (
      <section className="w-full max-w-lg bg-white p-8 rounded-lg flex justify-center">
        <p className="text-gray-500">Search for a city to see weather info</p>
      </section>
    );
  }

  return (
    <section
      className="w-full max-w-lg bg-white p-8 rounded-lg flex flex-col gap-4"
      aria-label="Weather information panel"
    >
      <h1 className="text-xl font-semibold">
        Weather Today in {city}{country && `, ${country}`}
      </h1>
      <p className="text-lg font-medium">
        {temperature} - {condition}
      </p>
      <p className="text-gray-700">
        Humidity: {humidity} | Wind: {windSpeed}
      </p>
    </section>
  );
};

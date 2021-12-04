import React from "react";

const Weather = ({ data }) => {
   const getWeatherIcon = (id) => {
      switch (true) {
         case id >= 200 && id <= 232:
            return "11d";
         case id >= 801 && id <= 804:
            return "03d";
         case id >= 300 && id <= 321:
            return "09d";
         case id >= 500 && id <= 531:
            return "10d";
         case id >= 600 && id <= 622:
            return "13d";
         case id >= 701 && id <= 781:
            return "50d";
         case id === 800:
            return "01d";
         default:
            return;
      }
   };

   const capitalizeFirstLetterc = (string) => {
      return string?.charAt(0).toUpperCase() + string?.slice(1);
   };

   return (
      <div className="weather">
         <div className="city-details">
            <h1>
               {data?.name}, {data?.sys?.country}
            </h1>
            <h3>
               {new Date().toLocaleTimeString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
               })}
            </h3>
         </div>
         <img
            src={`http://openweathermap.org/img/wn/${getWeatherIcon(
               data?.weather?.[0].id
            )}@2x.png`}
            alt={data?.weather?.[0].main}
         />
         <h1>{data?.main?.temp.toFixed()}°F</h1>
         <div className="weather-lists">
            <ul>
               <li>High: {data?.main?.temp_max}°F</li>
               <li>Low: {data?.main?.temp_min}°F</li>
            </ul>
            <ul>
               <li>Humidity: {data?.main?.humidity}%</li>
               <li>Wind Speed: {data?.wind?.speed}mph</li>
            </ul>
         </div>
         <h1>{capitalizeFirstLetterc(data?.weather?.[0].description)}</h1>
      </div>
   );
};

export default Weather;

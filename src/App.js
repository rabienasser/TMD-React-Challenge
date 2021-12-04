import { useEffect } from "react";
import { fetchHomeCity, fetchCity } from "store/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import Form from "components/Form";
import CityList from "components/CityList";
import Weather from "components/Weather";
import "App.scss";

const App = () => {
   const { weatherData, loading, error } = useSelector(
      (state) => state.weather
   );
   const { cityList } = useSelector((state) => state.cityList);
   const dispatch = useDispatch();

   const getCoords = () => {
      navigator.geolocation.getCurrentPosition((position) => {
         let lat = position.coords.latitude;
         let long = position.coords.longitude;
         dispatch(fetchHomeCity({ lat: lat, long: long }));
      });
   };

   useEffect(() => {
      getCoords();
   }, []);

   return (
      <div className="App">
         {loading && <h1>Loading...</h1>}
         {error && alert("Please enter valid city!")}
         {Object.keys(weatherData).length !== 0 && (
            <div>
               <Form cityList={cityList} />
               <CityList cityList={cityList} />
               <Weather data={weatherData} />
            </div>
         )}
      </div>
   );
};

export default App;

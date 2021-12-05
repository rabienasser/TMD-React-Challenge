import { useEffect } from "react";
import { fetchHomeCity } from "store/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import Form from "components/Form/Form";
import CityList from "components/CityList/CityList";
import Weather from "components/Weather/Weather";
import "App.scss";

const App = () => {
   const { weatherData, loading } = useSelector((state) => state.weather);
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
         <Form cityList={cityList} />
         <CityList cityList={cityList} />
         {weatherData !== undefined && <Weather data={weatherData} />}
      </div>
   );
};

export default App;

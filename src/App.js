import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { fetchHomeCity } from "store/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import Form from "components/Form/Form";
import CityList from "components/CityList/CityList";
import Weather from "components/Weather/Weather";
import "react-toastify/dist/ReactToastify.css";
import "App.scss";

const App = () => {
   const { weatherData, loading } = useSelector((state) => state.weather);
   const { cityList } = useSelector((state) => state.cityList);
   const dispatch = useDispatch();

   const getCoords = () => {
      navigator.geolocation.getCurrentPosition((position) => {
         const lat = position.coords.latitude;
         const long = position.coords.longitude;
         dispatch(fetchHomeCity({ lat, long }));
      });
   };

   useEffect(() => {
      getCoords();
   }, []);

   return (
      <div className="App">
         <ToastContainer />
         <Form cityList={cityList} />
         <CityList cityList={cityList} />
         {weatherData !== undefined && (
            <Weather data={weatherData} loading={loading} />
         )}
      </div>
   );
};

export default App;

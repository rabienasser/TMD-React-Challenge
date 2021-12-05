import React from "react";
import { useDispatch } from "react-redux";
import { fetchCity } from "store/weatherSlice";
import { deleteCity } from "store/cityListSlice";
import "./CityList.style.scss";

const CityList = ({ cityList }) => {
   const dispatch = useDispatch();
   return (
      <ul className="city-list">
         {cityList?.map((city, idx) => (
            <div key={idx}>
               <li onClick={() => dispatch(fetchCity(city))}>{city}</li>
               <button onClick={() => dispatch(deleteCity(city))}>x</button>
            </div>
         ))}
      </ul>
   );
};

export default CityList;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCity } from "store/weatherSlice";
import { addCity } from "store/cityListSlice";
import "./Form.style.scss";

const Form = ({ cityList }) => {
   const [city, setCity] = useState("");

   const dispatch = useDispatch();

   const handleChange = (e) => {
      setCity(e.target.value);
   };

   const handleSubmit = (e, city) => {
      e.preventDefault();

      if (city === "") {
         alert("Please enter a valid city!");
      } else if (cityList.includes(city)) {
         alert("City has already been entered!");
      } else {
         dispatch(fetchCity(city));
         dispatch(addCity(city));
         setCity("");
      }
   };

   return (
      <form
         onSubmit={(e) => {
            handleSubmit(e, city);
         }}
      >
         <input onChange={(e) => handleChange(e)} type="text" value={city} />
         <button>Get Weather</button>
      </form>
   );
};

export default Form;

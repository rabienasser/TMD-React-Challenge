import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHomeCity = createAsyncThunk(
   "weather/fetchHomeCity",
   async (coords) => {
      const { lat, long } = coords;
      try {
         const timestamp = new Date().toISOString();
         const { data } = await axios.get(
            `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
            // { headers: { Timestamp: timestamp } }
         );
         return data;
      } catch (err) {
         alert(err);
      }
   }
);

export const fetchCity = createAsyncThunk(
   "weather/fetchCity",
   async (cityName) => {
      try {
         const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
         );
         return data;
      } catch (err) {
         alert("Please enter valid city!");
      }
   }
);

const initialState = {
   loading: false,
   weatherData: {},
};

const weatherSlice = createSlice({
   name: "weather",
   initialState,
   extraReducers: {
      [fetchHomeCity.pending]: (state) => {
         state.loading = true;
      },
      [fetchHomeCity.fulfilled]: (state, action) => {
         state.loading = false;
         state.weatherData = action.payload;
      },
      [fetchHomeCity.rejected]: (state) => {
         state.loading = false;
      },
      [fetchCity.pending]: (state) => {
         state.loading = true;
      },
      [fetchCity.fulfilled]: (state, action) => {
         state.loading = false;
         state.weatherData = action.payload;
      },
      [fetchCity.rejected]: (state) => {
         state.loading = false;
      },
   },
});

export default weatherSlice.reducer;

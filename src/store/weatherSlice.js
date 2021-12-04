import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const timestamp = new Date().toISOString();

const config = {
   headers: {
      Timestamp: timestamp,
   },
};

export const fetchHomeCity = createAsyncThunk(
   "weather/fetchHomeCity",
   async (coords) => {
      const { lat, long } = coords;
      try {
         const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
         );
         console.log(data);
         return data;
      } catch (err) {
         console.log(err);
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
         console.log(data);
         return data;
      } catch (err) {
         console.log(err);
      }
   }
);

const initialState = {
   weatherData: {},
   loading: false,
   error: false,
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
         state.error = true;
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
         state.error = true;
      },
   },
});

export default weatherSlice.reducer;

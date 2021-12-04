import { createSlice } from "@reduxjs/toolkit";

const initialState = { cityList: [] };

const cityListSlice = createSlice({
   name: "cityList",
   initialState,
   reducers: {
      addCity: (state, action) => {
         state.cityList = [...state.cityList, action.payload];
      },
      deleteCity: (state, action) => {
         state.cityList = state.cityList.filter(
            (city) => city !== action.payload
         );
      },
   },
});

export const { addCity, deleteCity } = cityListSlice.actions;

export default cityListSlice.reducer;

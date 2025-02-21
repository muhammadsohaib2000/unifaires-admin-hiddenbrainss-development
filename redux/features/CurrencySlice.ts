import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "https://api.currencyapi.com/v3"; //currencyapi.com
const API_URL = "https:///openexchangerates.org/api"; //openexchangerates.org
const API_KEY = "29f25338425b4c008951855e633e7e28"; // Replace with your actual API key
// const API_KEY = "cur_live_0Hr9SfSFCMAIVDYyGgGrEvc7hAOFro6cZl0J5aqn"; // currencyapi.com

interface StateInt {
  currencyRate: any;
  loading: boolean;
  error: any;
}

export const fetchCurrencyConvertionRate = createAsyncThunk(
  "currencies/fetchCurrencyConvertionRate",
  async ({ currency }: any) => {
    const response = await axios.get(`${API_URL}/latest.json`, {
      params: { symbols: currency, app_id: API_KEY },
    });
    return !Number.isNaN(parseFloat(response?.data?.rates?.[currency]))
      ? parseFloat(response.data.rates[currency])
      : 0;
  }
);

const initialState: StateInt = {
  currencyRate: 1,
  loading: false,
  error: null,
};

const currency = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyConvertionRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencyConvertionRate.fulfilled, (state, action) => {
        state.loading = false;
        state.currencyRate = action.payload;
      })
      .addCase(fetchCurrencyConvertionRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default currency.reducer;

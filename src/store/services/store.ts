import { configureStore } from "@reduxjs/toolkit";
import {contactApi} from "./contactDetailsApi"
import { covidApi } from "./covidApi";

const store = configureStore({
  reducer: {
    [contactApi.reducerPath]: contactApi.reducer,
    [covidApi.reducerPath]:covidApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      contactApi.middleware,
      covidApi.middleware
    ]),
});
export default store;

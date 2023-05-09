import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const covidApi = createApi({
  reducerPath: "covid",
  baseQuery: fetchBaseQuery({ baseUrl: "https://disease.sh/v3/covid-19/" }),
  endpoints: (builder) => ({
    getCovidData: builder.query<any, void>({
      query: () => `historical/all?lastdays=all`,
    }),
    getCountryData: builder.query<any, void>({
      query: () => `countries`,
    }),
  }),
});

export const { useGetCovidDataQuery, useGetCountryDataQuery } = covidApi;

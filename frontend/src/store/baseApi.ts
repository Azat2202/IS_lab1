// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks


// initialize an empty api service that we'll inject endpoints into later as needed
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token; // Assuming you store the token in your auth slice
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
})
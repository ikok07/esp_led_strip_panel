import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_URL,
    prepareHeaders: headers => {
        headers.set("Authorization", `Bearer ${import.meta.env.VITE_API_KEY}`)
    },
    timeout: 30_000
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 3});

const backendApi = createApi({
    reducerPath: "backendApi",
    baseQuery: baseQueryWithRetry,
    refetchOnReconnect: true,
    endpoints: () => ({}),
    tagTypes: []
})

export default backendApi;
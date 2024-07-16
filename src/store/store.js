import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import backendApi from "./backendApi.js";

const store = configureStore({
    reducer: {
        [backendApi.reducerPath]: backendApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(backendApi.middleware)
})

setupListeners(store.dispatch)

export default store
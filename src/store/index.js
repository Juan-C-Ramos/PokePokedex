import { configureStore } from "@reduxjs/toolkit";
import trainerName from "./slices/trainerName.slice"

const store = configureStore({
    reducer: {
        // Add reducers here
        trainerName
    },

});

export default store;
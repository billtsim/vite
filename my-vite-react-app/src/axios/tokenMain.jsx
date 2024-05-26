import { configureStore } from "@reduxjs/toolkit";
import tokenReducers from "./Token";

const store = configureStore({
    reducer: {
        token: tokenReducers
    }
})

export default store
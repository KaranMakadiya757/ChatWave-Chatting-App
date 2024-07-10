import { configureStore } from "@reduxjs/toolkit";
import Theme from './ThemeSlice'

const store = configureStore({
    reducer: {
        Theme: Theme
    }
})


export default store;
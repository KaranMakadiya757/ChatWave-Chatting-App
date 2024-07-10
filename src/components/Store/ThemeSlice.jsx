import { createSlice } from "@reduxjs/toolkit";


const ThemeSlice = createSlice({
    name: "Theme",
    initialState: { theme: localStorage.getItem("Theme") || "light" },

    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("Theme", state.theme);
        }
    }
})

export const { toggleTheme } = ThemeSlice.actions

export default ThemeSlice.reducer
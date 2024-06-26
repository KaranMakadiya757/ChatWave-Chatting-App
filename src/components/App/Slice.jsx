import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
    name: "data",
    initialState: {
        selecteduser: {}
    },
    reducers: {
        setselecteduser: (state, action) => {
            state.selecteduser = action.payload;
        }
    },
});

export const { setselecteduser } = Slice.actions;
export default Slice.reducer;

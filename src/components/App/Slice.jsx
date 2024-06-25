import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
    name: "data",
    initialState: {
        token: '',
        user_id: ''
    },
    reducers: {
        settoken: (state, action) => {
            state.token = action.payload;
        },
        setuserid: (state, action) => {
            state.user_id = action.payload;
        }
    },
});

export const { settoken, setuserid } = Slice.actions;
export default Slice.reducer;

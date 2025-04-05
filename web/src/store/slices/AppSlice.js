import {createSlice} from "@reduxjs/toolkit";

const initialState = {

};

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        reset: () => initialState
    }
});

export const AppActions = AppSlice.actions;
export default AppSlice;

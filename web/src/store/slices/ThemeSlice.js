import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    miniSidebar: false,
    miniSidebarWidth: 80,
    sidebarWidth: 240,
};

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setMiniSidebar: (state, action) => {
            state.miniSidebar = action?.payload ?? !state.miniSidebar
        },
        reset: () => initialState
    }
});

export const ThemeActions = ThemeSlice.actions;
export default ThemeSlice;

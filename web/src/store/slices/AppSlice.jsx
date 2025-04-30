import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    needCreateWorkspace: false,
    workspaces: [],
    activeWorkspace: null
};

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setWorkspaces: (state, action) => {
            if (action.payload?.length === 0) {
                state.needCreateWorkspace = true;
            } else {
                state.workspaces = action.payload;
            }
        },
        setActiveWorkspace: (state, action) => {
            state.activeWorkspace = action.payload;
        },
        reset: () => initialState
    }
});

export const AppActions = AppSlice.actions;

export default AppSlice;

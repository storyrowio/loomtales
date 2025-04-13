import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    appNavbarHeight: 50,
    drawerWidth: 240,
    miniDrawerWidth: 80,
    sidebarOpen: true,
    isMobile: false,
    activeGroupMenu: [],
    heightMenuItem: 43.25
};

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
        setMobile: (state, action) => {
            state.isMobile = action.payload;
        },
        setActiveGroupMenu: (state, action) => {
            state.activeGroupMenu = action.payload;
        },
        addUpdateActiveGroupMenu: (state, action) => {
            if (state.activeGroupMenu.includes(action.payload)) {
                state.activeGroupMenu = state.activeGroupMenu.filter(e => e !== action.payload);
            } else {
                state.activeGroupMenu = [...state.activeGroupMenu, action.payload];
            }
        }
    }
});

export const ThemeActions = ThemeSlice.actions;
export default ThemeSlice;

import {createSlice} from "@reduxjs/toolkit";

const initialState = {

};

export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    }
});

export const ProfileActions = ProfileSlice.actions;
export default ProfileSlice;

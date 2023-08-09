import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const showProfileSlice = createSlice({
  name: "showProfile",
  initialState,
  reducers: {
    setShowProfile: (state, action) => (state = action.payload),
  },
});

export const { setShowProfile } = showProfileSlice.actions;
export default showProfileSlice.reducer;

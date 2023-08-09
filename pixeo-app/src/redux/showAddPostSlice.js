import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const showAddPostSlice = createSlice({
  name: "showAddPost",
  initialState,
  reducers: {
    setShowAddPost: (state, action) => (state = action.payload),
  },
});

export const { setShowAddPost } = showAddPostSlice.actions;
export default showAddPostSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showProfile: false,
}

export const showProfileSlice = createSlice({
  name: 'showProfile',
  initialState,
  reducers: {
    setShowProfile: (state, action) => {
      state.showProfile = action.payload
    }
  } 
})

export const { setShowProfile } = showProfileSlice.actions
export default showProfileSlice.reducer;
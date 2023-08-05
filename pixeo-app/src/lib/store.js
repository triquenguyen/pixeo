import { configureStore } from '@reduxjs/toolkit'
import showAddPostReducer from '../redux/showAddPostSlice'
import showProfileReducer from '../redux/showProfileSlice'

export const store = configureStore({
  reducer: {
    showAddPost: showAddPostReducer,
    showProfile: showProfileReducer,
  },
})
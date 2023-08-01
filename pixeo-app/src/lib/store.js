import { configureStore } from '@reduxjs/toolkit'
import showAddPostReducer from '../redux/showAddPostSlice'

export const store = configureStore({
  reducer: {
    showAddPost: showAddPostReducer,
  },
})
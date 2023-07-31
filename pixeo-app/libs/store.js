import { configureStore } from '@reduxjs/toolkit'
import showAddPostReducer from '../pages/redux/showAddPostSlice'

export const store = configureStore({
  reducer: {
    showAddPost: showAddPostReducer,
  },
})
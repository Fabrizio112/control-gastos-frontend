import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/LoginSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer
  }
})

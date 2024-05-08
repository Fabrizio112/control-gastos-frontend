import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: false,
  reducers: {
    changeLoader: (state, action) => {
      return action.payload
    }
  }
})

export const { changeLoader } = loaderSlice.actions
export default loaderSlice.reducer

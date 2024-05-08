import { createSlice } from '@reduxjs/toolkit'

export const categoriaSlice = createSlice({
  name: 'categoria',
  initialState: '',
  reducers: {
    changeCategories: (state, action) => {
      return action.payload
    }

  }
})

export const { changeCategories } = categoriaSlice.actions
export default categoriaSlice.reducer

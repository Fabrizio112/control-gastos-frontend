import { createSlice } from '@reduxjs/toolkit'

const initialUserState = ''

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    changeUser: (state, action) => {
      return action.payload
    }
  }
})

export const { changeUser } = userSlice.actions
export default userSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialRegisterSlice = {
  allRegisters: '',
  actualRegister: ''
}

export const registerSlice = createSlice({
  name: 'register',
  initialState: initialRegisterSlice,
  reducers: {
    changeAllRegisters: (state, action) => {
      state.allRegisters = action.payload
    },
    changeActualRegister: (state, action) => {
      state.actualRegister = action.payload
    }

  }
})

export const { changeAllRegisters, changeActualRegister } = registerSlice.actions
export default registerSlice.reducer

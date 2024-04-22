import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: false,
  signup: true,
  signupForm: {
    email: '',
    password: ''
  },
  registerForm: {
    email: '',
    nombre: '',
    apellido: '',
    username: '',
    avatar: '',
    password: '',
    password_check: ''
  }
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.login = action.payload
    },
    signup: (state, action) => {
      state.signup = action.payload
    },
    changeFormSignUp: (state, action) => {
      const { element, value } = action.payload
      state.signupForm[element] = value
    },
    changeFormRegister: (state, action) => {
      const { element, value } = action.payload
      state.registerForm[element] = value
    }
  }
})

export const { login, signup, changeFormRegister, changeFormSignUp } = loginSlice.actions
export default loginSlice.reducer

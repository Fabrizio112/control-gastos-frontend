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
  },
  loadingRegister: false,
  loadingSignup: false
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
    },
    changeLoadingRegister: (state, action) => {
      state.loadingRegister = action.payload
    },
    changeLoadingSignup: (state, action) => {
      state.loadingSignup = action.payload
    }
  }
})

export const { login, signup, changeFormRegister, changeFormSignUp, changeLoadingRegister, changeLoadingSignup } = loginSlice.actions
export default loginSlice.reducer

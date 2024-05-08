import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/LoginSlice'
import userReducer from './slices/UserSlice'
import registerReducer from './slices/RegisterSlice'
import loaderReducer from './slices/LoaderSlice'
import ingresosEgresosReducer from './slices/IngresosEgresosSlice'
import categoriaReducer from './slices/CategoriasSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    register: registerReducer,
    loader: loaderReducer,
    ingresos_egresos: ingresosEgresosReducer,
    categoria: categoriaReducer
  }
})

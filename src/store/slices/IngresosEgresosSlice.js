import { createSlice } from '@reduxjs/toolkit'

const ingresoEgresosInitialState = {
  ingresosRegistroActual: '',
  egresosRegistroActual: '',
  ingresosTodosRegistros: '',
  egresosTodosRegistros: ''
}

export const ingresosEgresosSlice = createSlice({
  name: 'ingresos_egresos',
  initialState: ingresoEgresosInitialState,
  reducers: {
    changeIngresosRegistroActual: (state, action) => {
      state.ingresosRegistroActual = action.payload
    },
    changeEgresosRegistroActual: (state, action) => {
      state.egresosRegistroActual = action.payload
    },
    changeIngresosTodosRegistros: (state, action) => {
      state.ingresosTodosRegistros = action.payload
    },
    changeEgresosTodosRegistros: (state, action) => {
      state.egresosTodosRegistros = action.payload
    }

  }
})

export const { changeIngresosRegistroActual, changeEgresosRegistroActual, changeIngresosTodosRegistros, changeEgresosTodosRegistros } = ingresosEgresosSlice.actions
export default ingresosEgresosSlice.reducer

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegistersPage from '../pages/RegistersPage'
import ConfigurationPage from '../pages/ConfigurationPage'
import EditProfile from './config/EditProfile'
import EditPassword from './config/EditPassword'
import RegisterSpecificPage from '../pages/RegisterSpecificPage'

function ControlGastosApp () {
  const login = useSelector(state => state.login.login)
  const usuarioLogeado = JSON.parse(window.sessionStorage.getItem('usuario_logeado'))
  return (
    <HashRouter>
        <Routes>
            <Route path="/" element={(login === true || usuarioLogeado !== null) ? <HomePage/> : <LoginPage/> } />
            <Route path='/registros' element={<RegistersPage/>} />
            <Route path='/configuracion' element={<ConfigurationPage/>}>
              <Route path='editar-perfil' element={<EditProfile/>}/>
              <Route path='editar-contraseña' element={<EditPassword/>} />
            </Route>
            <Route path='/registros/:id' element={<RegisterSpecificPage/>}/>
            <Route path='*' element={<Navigate to="/"/>}/>
        </Routes>
    </HashRouter>
  )
}

export default ControlGastosApp

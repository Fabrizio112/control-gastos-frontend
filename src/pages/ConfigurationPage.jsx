import { useEffect } from 'react'
import NavBar from '../components/home/NavBar'
import { useSelector, useDispatch } from 'react-redux'
import { changeUser } from '../store/slices/UserSlice'
import { NavLink, Outlet } from 'react-router-dom'

function ConfigurationPage () {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user === '') {
      const usuarioMemoria = JSON.parse(window.sessionStorage.getItem('usuario'))
      dispatch(changeUser(usuarioMemoria))
    }
  }, [])
  return (<>
  <NavBar username={user?.username}/>
  <section className='container-page'>
    <h1 className='text-center p-3'>Configuracion General</h1>
    <section className='d-flex flex-column justify-content-center align-items-center gap-3  mt-2'>
      <NavLink className='btn btn-secondary px-5 w-50' to="editar-perfil">Editar Perfil</NavLink>
      <NavLink className='btn btn-secondary px-5 w-50' to="editar-contraseña">Editar Contraseña</NavLink>
      <NavLink className='btn btn-warning px-5 w-50'>Eliminar Cuenta</NavLink>
    </section>
    <section>
      <Outlet/>
    </section>
  </section>
  </>)
}

export default ConfigurationPage

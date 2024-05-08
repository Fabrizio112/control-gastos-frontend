import { useDispatch, useSelector } from 'react-redux'
import { changeFormRegister, changeLoadingRegister, signup } from '../../store/slices/LoginSlice'
import Loader from '../Varios/Loader'

function Registrarse () {
  const form = useSelector(state => state.login.registerForm)
  const loading = useSelector(state => state.login.loadingRegister)
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(signup(true))
  }
  const handleRegister = (e) => {
    e.preventDefault()
    if (form.password === form.password_check) {
      dispatch(changeLoadingRegister(true))
      async function registrarUsuario () {
        const bodyFinal = {
          email: form.email,
          nombre: form.nombre,
          apellido: form.apellido,
          username: form.username,
          avatar: form.avatar,
          password: form.password
        }
        try {
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyFinal)
          }
          const peticion = await fetch('http://localhost:5000/signup', options)
          const results = await peticion.json()
          dispatch(changeLoadingRegister(false))
          console.log(results)
        } catch (error) {
          console.error(error)
        }
      }
      registrarUsuario()
    } else {
      console.log('Las contraseñas no coinciden')
    }
  }
  const handleChange = (e) => {
    dispatch(changeFormRegister({ element: e.target.name, value: e.target.value }))
  }

  return (
  <section className="container">
  {loading === true && <Loader/>}
  <h1>Hola yo sirvo para Registrarse</h1>
  <form onSubmit={handleRegister}>
    <div className='row'>
      <div className='col-6'>
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" name='nombre' onChange={handleChange} required />
      </div>
      <div className='col-6'>
        <label className="form-label">Apellido</label>
        <input type="text" className="form-control" name='apellido' onChange={handleChange} required />
      </div>
      <div>
        <label className="form-label">Usuario</label>
        <input type="text" className="form-control" name='username' onChange={handleChange} required/>
      </div>
      <div>
        <label className="form-label">Correo Electronico</label>
        <input type="text" className="form-control" name='email' onChange={handleChange} required/>
      </div>
      <div>
        <label className="form-label">Contraseña</label>
        <input type="text" className="form-control" name='password' onChange={handleChange} required/>
      </div>
      <div>
        <label className="form-label">Repetir contraseña</label>
        <input type="text" className="form-control" name='password_check' onChange={handleChange} required/>
      </div>
    </div>
    <button type='submit' className='btn btn-primary' >Registrarse</button>
  </form>
  <div>
    <p>Ya tienes una cuenta? <a href="#" onClick={handleClick} className="text-decoration-none fw-bolder">Inicia Sesion</a></p>
  </div>
</section>)
}

export default Registrarse

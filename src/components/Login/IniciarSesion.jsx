import { useDispatch, useSelector } from 'react-redux'
import { changeFormSignUp, changeLoadingSignup, login, signup } from '../../store/slices/LoginSlice'
import { changeUser } from '../../store/slices/UserSlice'
import Loader from '../Varios/Loader'

function IniciarSesion () {
  const form = useSelector(state => state.login.signupForm)
  const loading = useSelector(state => state.login.loadingSignup)
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(signup(false))
  }
  const handleSignUp = (e) => {
    e.preventDefault()
    dispatch(changeLoadingSignup(true))
    const bodyFinal = {
      email: form.email,
      password: form.password
    }
    async function getUserData (email) {
      try {
        const peticion = await fetch(`http://localhost:5000/user/${email}`)
        const user = await peticion.json()
        return user
      } catch (error) {
        console.error(error)
      }
    }
    async function iniciarSesion () {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyFinal)
        }
        const peticion = await fetch('http://localhost:5000/login', options)
        const results = await peticion.json()
        dispatch(changeLoadingSignup(false))
        return results
      } catch (error) {
        console.error(error)
      }
    }
    async function acceder () {
      try {
        const respuesta = await iniciarSesion()

        if (respuesta.success === true) {
          const usuario = await getUserData(form.email)

          dispatch(changeUser(usuario))
          window.sessionStorage.setItem('usuario', JSON.stringify(usuario))
          window.sessionStorage.setItem('usuario_logeado', JSON.stringify({ email: form.email }))
          dispatch(login(true))
        }
      } catch (error) {
        console.error(error)
      }
    }
    acceder()
  }
  const handleChange = (e) => {
    dispatch(changeFormSignUp({ element: e.target.name, value: e.target.value }))
  }

  return (
  <section className="container">
    {loading === true && <Loader/>}
    <h1>Hola yo sirvo para iniciar sesion</h1>
  <form onSubmit={handleSignUp}>
    <label className="form-label">Correo Electronico</label>
    <input type="text" className="form-control" name='email' onChange={handleChange} />
    <label className="form-label">Contraseña</label>
    <input type="text" className="form-control" name='password' onChange={handleChange}/>
    <button type='submit' className='btn btn-primary' >Iniciar Sesion</button>
  </form>
  <div>
    <p>No tienes una cuenta? <a href="#" onClick={handleClick} className="text-decoration-none fw-bolder">Registrarse</a></p>
  </div>
  </section>
  )
}

export default IniciarSesion

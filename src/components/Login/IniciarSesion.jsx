import { useDispatch, useSelector } from 'react-redux'
import { changeFormSignUp, login, signup } from '../../store/slices/LoginSlice'

function IniciarSesion () {
  const form = useSelector(state => state.login.signupForm)
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(signup(false))
  }
  const handleSignUp = (e) => {
    e.preventDefault()
    async function iniciarSesion () {
      const bodyFinal = {
        email: form.email,
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
        const peticion = await fetch('http://localhost:5000/login', options)
        const results = await peticion.json()
        const resultados = await results
        return resultados
      } catch (error) {
        console.error(error)
      }
    }
    async function acceder () {
      try {
        const respuesta = await iniciarSesion()
        console.log(respuesta)

        if (respuesta.success === true) {
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

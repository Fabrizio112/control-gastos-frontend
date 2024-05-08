import { useSelector } from 'react-redux'
import IniciarSesion from '../components/Login/IniciarSesion'
import Registrarse from '../components/Login/Registrarse'

function LoginPage () {
  const signup = useSelector(state => state.login.signup)
  return (
  <>
  {signup === true ? <IniciarSesion/> : <Registrarse/>}
  </>)
}

export default LoginPage

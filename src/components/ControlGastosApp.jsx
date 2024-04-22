import { HashRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'

function ControlGastosApp () {
  const login = useSelector(state => state.login.login)
  return (
    <HashRouter>
        <Routes>
            <Route path="/" element={login === true ? <HomePage/> : <LoginPage/> } />
        </Routes>
    </HashRouter>
  )
}

export default ControlGastosApp

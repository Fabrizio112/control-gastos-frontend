import { NavLink } from 'react-router-dom'

function NavBar ({ username }) {
  function handleCloseSession () {
    window.sessionStorage.clear()
    document.location.href = '/'
  }
  return (
<section className="navbar-principal">
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '250px' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4 ">Control Gastos</span>
        </a>
        <hr/>
        <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
            <NavLink to="/" className="nav-link text-white" aria-current="page">
            Inicio
            </NavLink>
        </li>
        <li>
            <NavLink to="/registros" className="nav-link text-white">
            Tus Registros
            </NavLink>
        </li>
        <li>
            <NavLink to="/configuracion" className="nav-link text-white">
            Configuracion
            </NavLink>
        </li>
        </ul>
        <hr/>
        <div className="dropdown d-flex flex-column justify-content-between ">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
            <strong>{username}</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a className="dropdown-item" href="#">Nuevo Registro...</a></li>
            <li><a className="dropdown-item" href="#">Configuracion</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Cerrar Sesion</a></li>
        </ul>
        <button className='btn btn-danger' onClick={handleCloseSession}>Cerrar Sesion</button>
        </div>
  </div>
  </section>)
}

export default NavBar

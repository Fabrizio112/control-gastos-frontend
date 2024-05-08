import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/home/NavBar'
import { changeUser } from '../store/slices/UserSlice'
import { changeLoader } from '../store/slices/LoaderSlice'
import { changeActualRegister, changeAllRegisters } from '../store/slices/RegisterSlice'
import Loader from '../components/Varios/Loader'
import { NavLink } from 'react-router-dom'

function HomePage () {
  const [allIngresosEgresos, setAllIngresosEgresos] = useState({ ingresos: '', egresos: '' })
  const user = useSelector(state => state.user)
  const loader = useSelector(state => state.loader)
  const registers = useSelector(state => state.register.allRegisters)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeLoader(true))
    const usuario = JSON.parse(window.sessionStorage.getItem('usuario'))
    if (user === null || user === '') {
      dispatch(changeUser(usuario))
    }
  }, [])
  useEffect(() => {
    async function getRegistersOfTheUser (email) {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        const peticion = await fetch(`http://localhost:5000/registro/${email}`, options)
        const registro = await peticion.json()
        return registro
      } catch (error) {
        console.error(error)
      }
    }
    async function getAllEgresos (idRegistro) {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        const peticion = await fetch(`http://localhost:5000/egreso/${idRegistro}`, options)
        const egresos = await peticion.json()
        return egresos
      } catch (error) {
        console.error(error)
      }
    }
    async function getAllIngresos (idRegistro) {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        const peticion = await fetch(`http://localhost:5000/ingreso/${idRegistro}`, options)
        const ingresos = await peticion.json()
        return ingresos
      } catch (error) {
        console.error(error)
      }
    }
    async function registro (email) {
      const registros = await getRegistersOfTheUser(email)
      if (registros != null) {
        dispatch(changeAllRegisters(registros))
        const allIngresosEgresosAcumulado = { ingresos: [], egresos: [] }
        for (const registroIndividual of registros) {
          const ingresoRegistroIndividual = await getAllIngresos(registroIndividual.id)
          const egresoRegistroIndividual = await getAllEgresos(registroIndividual.id)
          allIngresosEgresosAcumulado.ingresos = allIngresosEgresosAcumulado.ingresos.concat(ingresoRegistroIndividual)
          allIngresosEgresosAcumulado.egresos = allIngresosEgresosAcumulado.egresos.concat(egresoRegistroIndividual)
        }
        setAllIngresosEgresos({ ingresos: allIngresosEgresosAcumulado.ingresos, egresos: allIngresosEgresosAcumulado.egresos })
      }
      dispatch(changeLoader(false))
    }
    registro(user.email)
  }, [user])

  async function crearNuevoRegistro (correo) {
    try {
      const bodyFinal = {
        email: correo
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyFinal)
      }
      const peticion = await fetch('http://localhost:5000/registro', options)
      const registro = await peticion.json()
      return registro
    } catch (error) {
      console.error(error)
    }
  }
  const handleNewRegister = () => {
    async function crear () {
      try {
        const registro = await crearNuevoRegistro(user.email)
        document.location.reload()
      } catch (error) {
        console.error(error)
      }
    }
    crear()
  }

  const handleChangeRegisterSelected = (id) => {
    dispatch(changeActualRegister(id))
    window.sessionStorage.setItem('actual_registro', id)
  }
  return (
  <>
  {loader && <Loader/>}
    <NavBar username={user?.username}/>
    <div className='container-page'>
        <h1 className='text-center p-4'>Hola {user?.nombre} {user?.apellido} , bienvenido de nuevo !!!</h1>

        <h2 className='mb-4'>Resumen de tus registros:</h2>
        <section>
        <div className='text-center mb-4'>
            <button className='btn btn-primary px-5 py-2' onClick={handleNewRegister}>Crear nuevo Registro</button>
          </div>
          <div className='row w-100 px-3'>
            {registers && registers.map(el => <div key={el.id} className="card col-6">
    <img src="..." className="card-img-top" alt="..."/>

    <div className="card-body">
      <NavLink className='btn btn-outline-primary' onClick={() => handleChangeRegisterSelected(el.id)} to={`/registros/${el.id}`}>Ir al Registro</NavLink>
    </div>
            </div>)}
          </div>

        </section>
        <div>
          <h3 className='mt-3'>Operaciones recientes</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Detalle</th>
                <th>ID</th>
                <th>Fecha</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allIngresosEgresos.ingresos.length > 0 && allIngresosEgresos.ingresos.slice(0, 3).map(ingreso => <tr key={ingreso.nro}><td>{ingreso.descripcion}</td><td>{ingreso.nro}</td><td>{ingreso.fecha}</td><td>Ingreso</td><td><button className='btn btn-outline-secondary'>Ver detalles</button></td></tr>) }
              {allIngresosEgresos.egresos.length > 0 && allIngresosEgresos.egresos.slice(0, 3).map(egreso => <tr key={egreso.nro}><td>{egreso.descripcion}</td><td>{egreso.nro}</td><td>{egreso.fecha}</td><td>Egreso</td><td><button className='btn btn-outline-secondary'>Ver detalles</button></td></tr>) }
            </tbody>
          </table>
        </div>
    </div>
  </>)
}
// Para cada registro se podria hacer un grafico de lineas para saber los ingresos y egresos totales , incluso se podria
// hacer uno para el dashboard general
// Añadir una seccion de gastos fijos e ingresos fijos, y automatizarlo por fecha

export default HomePage

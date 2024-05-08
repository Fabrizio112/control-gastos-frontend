import { useEffect, useState } from 'react'
import NavBar from '../components/home/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { changeActualRegister } from '../store/slices/RegisterSlice'
import { changeCategories } from '../store/slices/CategoriasSlice'
import ModalIngresoEgreso from '../components/Varios/ModalIngresoEgreso'
import { changeEgresosRegistroActual, changeIngresosRegistroActual } from '../store/slices/IngresosEgresosSlice'
import RegisterTable from '../components/register/RegisterTable'
import { changeLoader } from '../store/slices/LoaderSlice'
import Loader from '../components/Varios/Loader'

function RegisterSpecific () {
  const [actualSelected, setActualSelected] = useState('ingresos')
  const [montos, setMontos] = useState({ ingresos: 0, egresos: 0 })
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const register = useSelector(state => state.register.actualRegister)
  const egresos = useSelector(state => state.ingresos_egresos.egresosRegistroActual)
  const ingresos = useSelector(state => state.ingresos_egresos.ingresosRegistroActual)
  const categorias = useSelector(state => state.categoria)
  const loader = useSelector(state => state.loader)
  useEffect(() => {
    if (register === '') {
      dispatch(changeActualRegister(window.sessionStorage.getItem('actual_registro')))
    }
    async function getCategories () {
      try {
        const peticion = await fetch('http://localhost:5000/category')
        const categories = await peticion.json()
        return categories
      } catch (error) {
        console.error(error)
      }
    }
    async function traerCategorias () {
      try {
        const categoria = await getCategories()
        if (categoria !== '' || categoria !== undefined) {
          dispatch(changeCategories(categoria))
        }
      } catch (error) {
        console.log(error)
      }
    }

    traerCategorias()
  }, [])
  useEffect(() => {
    async function getIngresos (idRegistro) {
      try {
        const peticion = await fetch(`http://localhost:5000/ingreso/${idRegistro}`)
        const categories = await peticion.json()
        return categories
      } catch (error) {
        console.error(error)
      }
    }
    async function getEgresos (idRegistro) {
      try {
        const peticion = await fetch(`http://localhost:5000/egreso/${idRegistro}`)
        const categories = await peticion.json()
        return categories
      } catch (error) {
        console.error(error)
      }
    }
    async function traerRegistros () {
      try {
        let acumuladorEgresos = 0
        let acumuladorIngresos = 0
        const ingresos = await getIngresos(register)
        const egresos = await getEgresos(register)
        if (ingresos !== '' || ingresos !== undefined) {
          for (const ingreso of ingresos) {
            acumuladorIngresos += ingreso.monto
          }
          dispatch(changeIngresosRegistroActual(ingresos))
          setMontos(prevMontos => ({ ...prevMontos, ingresos: prevMontos.ingresos + acumuladorIngresos }))
        }
        if (egresos !== '' || egresos !== undefined) {
          for (const egreso of egresos) {
            acumuladorEgresos += egreso.monto
          }
          dispatch(changeEgresosRegistroActual(egresos))
          setMontos(prevMontos => ({ ...prevMontos, egresos: prevMontos.egresos + acumuladorEgresos }))
        }
        dispatch(changeLoader(false))
      } catch (error) {
        console.error(error)
      }
    }
    if (register !== '') {
      dispatch(changeLoader(true))
      traerRegistros()
    }
  }, [register])

  const handleModal = () => {
    setModal(true)
  }
  return (
  <>
  {loader && <Loader/> }
  {modal && <ModalIngresoEgreso categorias={categorias} selected={actualSelected} cerrarModal={setModal}/>}
    <NavBar username={JSON.parse(window.sessionStorage.getItem('usuario'))?.username}/>
    <section className='container-page'>
        <h1 className='text-center py-2'>Registro Nro {register}</h1>
        <p className='fs-2 text-center mb-4'>$ {montos.ingresos - montos.egresos}</p>
        <div className='d-flex gap-3'>
            <button className='btn btn-success w-50'onClick={() => setActualSelected('ingresos')}>Ingresos</button>
            <button className='btn btn-danger w-50' onClick={() => setActualSelected('egresos')}>Egresos</button>
        </div>
        <div className='text-center mt-4'>
        {actualSelected === 'ingresos' ? <button className='btn btn-outline-success px-5' onClick={handleModal}>Añadir Ingreso</button> : <button className='btn btn-outline-danger px-5' onClick={handleModal}>Añadir Egreso</button>}
        </div>

        {actualSelected === 'ingresos' ? (ingresos !== undefined && ingresos !== '' && ingresos.length !== 0) ? ingresos && <RegisterTable valor={ingresos} /> : <h2 className='text-center mt-5 display-3'>No hay ingresos </h2> : (egresos !== undefined && egresos !== '' && egresos.length !== 0) ? egresos && <RegisterTable valor={egresos} /> : <h2 className='text-center mt-5 display-3'>No hay egresos</h2>}

    </section>
  </>
  )
}

export default RegisterSpecific

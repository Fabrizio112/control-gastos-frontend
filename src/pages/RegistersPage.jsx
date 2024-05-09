import { useEffect, useState } from 'react'
import NavBar from '../components/home/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { changeActualRegister, changeAllRegisters } from '../store/slices/RegisterSlice'
import { changeUser } from '../store/slices/UserSlice'
import { NavLink } from 'react-router-dom'
import { changeLoader } from '../store/slices/LoaderSlice'
import Loader from '../components/Varios/Loader'
import ReactECharts from 'echarts-for-react'
import { right } from '@popperjs/core'

function DashBoardPage () {
  const [optionForGraphs, setOptionForGraphs] = useState([])
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const registers = useSelector(state => state.register.allRegisters)
  const loader = useSelector(state => state.loader)
  const [totalAmount, setTotalAmount] = useState({ ingresos: 0, egresos: 0 })
  useEffect(() => {
    dispatch(changeLoader(true))
    if (registers === null || registers === '') {
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
      async function registro (email) {
        const registros = await getRegistersOfTheUser(email)
        if (registros != null) {
          dispatch(changeAllRegisters(registros))
        }
      }
      if (user === null || user === undefined || user === '') {
        const usuarioMemoria = JSON.parse(window.sessionStorage.getItem('usuario_logeado'))
        registro(usuarioMemoria.email)
      } else {
        registro(user.email)
      }
    }
    if (user === '') {
      const usuarioMemoria = JSON.parse(window.sessionStorage.getItem('usuario'))
      dispatch(changeUser(usuarioMemoria))
    }
  }, [])
  useEffect(() => {
    if (registers !== '') {
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
      async function getTotalRegisters () {
        try {
          let acumuladorEgresos = 0
          let acumuladorIngresos = 0
          for (const registro of registers) {
            const option = {
              title: {
                text: `${registro.nombre} `,
                subtext: 'Resumen de tus cuentas',
                left: 'left'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 10,
                top: 'center'
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                  },
                  label: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: 20,
                      fontWeight: 'bold'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: [
                    { value: registro.fondos, name: 'Fondo Inicial' }
                  ]
                }
              ]
            }
            const ingresos = await getIngresos(registro.id)
            const egresos = await getEgresos(registro.id)
            acumuladorIngresos += registro.fondos
            if (ingresos !== '' || ingresos !== undefined) {
              for (const ingreso of ingresos) {
                acumuladorIngresos += ingreso.monto
                option.series[0].data.push({ value: ingreso.monto, name: ingreso.descripcion })
              }
            }
            if (egresos !== '' || egresos !== undefined) {
              for (const egreso of egresos) {
                acumuladorEgresos += egreso.monto
                option.series[0].data.push({ value: egreso.monto, name: egreso.descripcion })
              }
            }
            setOptionForGraphs(prevState => ([...prevState, { id: registro.id, option }]))
          }
          setTotalAmount({ ingresos: acumuladorIngresos, egresos: acumuladorEgresos })
          dispatch(changeLoader(false))
        } catch (error) {
          console.error(error)
        }
      }
      getTotalRegisters()
    }
  }, [registers])

  const handleChangeRegisterSelected = (el) => {
    dispatch(changeActualRegister(el))
    window.sessionStorage.setItem('actual_registro', JSON.stringify(el))
  }
  return (
  <>
  {loader && <Loader/>}
  <NavBar username={user?.username}/>
  <section className='container-page'>
    <h1 className='py-3'>Panel Principal</h1>
    <h2>Todos tus registros:</h2>
    <div>
        <h3 className='text-center py-3'>Total de las cuentas:  <span>$ {totalAmount.ingresos - totalAmount.egresos}</span></h3>

    </div>
    <div>
    {(registers && optionForGraphs.length === registers.length) && registers.map(el => <div key={el.id}>  {optionForGraphs && optionForGraphs.map(element => (el.id === element.id) && <ReactECharts key={el.id} option={element.option}/>)} <NavLink className='btn btn-outline-primary' onClick={() => handleChangeRegisterSelected(el)} to={`/registros/${el.id}`}>Ir al Registro</NavLink></div>)}
    </div>

  </section>
  </>
  )
}

export default DashBoardPage

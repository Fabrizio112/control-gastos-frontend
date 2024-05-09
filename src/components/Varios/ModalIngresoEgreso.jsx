import { useState } from 'react'
import { useSelector } from 'react-redux'

function ModalIngresoEgreso ({ categorias, selected, cerrarModal }) {
  const actualRegistro = useSelector(state => state.register.actualRegister)
  const [ingresoEgreso, setIngresoEgreso] = useState({ monto: '', descripcion: '', categoria: '' })
  const handleChange = (e) => {
    if (e.target.name === 'monto') {
      setIngresoEgreso({ ...ingresoEgreso, monto: e.target.value })
    }
    if (e.target.name === 'descripcion') {
      setIngresoEgreso({ ...ingresoEgreso, descripcion: e.target.value })
    }
  }
  const handleClick = (e) => {
    setIngresoEgreso({ ...ingresoEgreso, categoria: Number(e.currentTarget.dataset.id) })
  }
  const handleAddIngreso = async (ingreso) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingreso)
    }
    try {
      const peticion = await fetch('http://localhost:5000/ingreso', options)
      const ingreso = await peticion.json()
      console.log(ingreso)
      return ingreso
    } catch (error) {
      console.error(error)
    }
  }
  const handleAddEgreso = async (egreso) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(egreso)
    }
    try {
      const peticion = await fetch('http://localhost:5000/egreso', options)
      const egreso = await peticion.json()
      console.log(egreso)
      return egreso
    } catch (error) {
      console.error(error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      id_registro: actualRegistro.id,
      monto: ingresoEgreso.monto,
      descripcion: ingresoEgreso.descripcion,
      fecha: Date.now(),
      id_categoria: ingresoEgreso.categoria
    }
    if (selected === 'ingresos') {
      const ingreso = await handleAddIngreso(body)
      document.location.reload()
    } else {
      const egreso = await handleAddEgreso(body)
      document.location.reload()
    }
  }
  return (
  <section id="modal-container" className="d-flex justify-content-center align-items-center">
    <div id="modal">
    <button className="btn btn-dark close-modal" onClick={() => cerrarModal(false)} >X</button>
        <form action="" onSubmit={handleSubmit}>
            {selected === 'ingresos' ? <h4>Añadir Ingreso</h4> : <h4>Añadir Egreso</h4>}
            <div className="mb-2">
                <label htmlFor="" className="form-label">Monto</label>
                <input type="number" className="form-control" name="monto" onChange={handleChange}/>
            </div>
            <div className="mb-2">
                <label htmlFor="" className="form-label">Descripcion</label>
                <input type="text" className="form-control" name="descripcion" onChange={handleChange} />
            </div>
            <div>
                <h3>Categoria:</h3>
                <div className="container-categories">
                      {(categorias && selected === 'ingresos') ? categorias.slice(0, 8).map(categoria => <div className={`categorie-box ${ingresoEgreso.categoria === categoria.id ? 'active-categorie-box' : ''} `} key={categoria.id} data-id={categoria.id} onClick={handleClick}><p className="text-center">{categoria.nombre}</p></div>) : categorias.slice(8).map(categoria => <div className={`categorie-box ${ingresoEgreso.categoria === categoria.id ? 'active-categorie-box' : ''} `} key={categoria.id} data-id={categoria.id} onClick={handleClick}><p className="text-center">{categoria.nombre}</p></div>)}
                </div>
            </div>
            {selected === 'ingresos' ? <button className="btn btn-success mt-3" >Añadir</button> : <button className="btn btn-danger mt-3">Añadir</button>}
        </form>
    </div>
  </section>)
}

export default ModalIngresoEgreso

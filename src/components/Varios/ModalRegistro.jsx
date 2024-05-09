import { useState } from 'react'

function ModalRegistro ({ nuevoRegistro, cerrarModal, email }) {
  const [bodyFinal, setBodyFinal] = useState({ fondos: '', nombre: '', email })
  const handleChange = (e) => {
    setBodyFinal(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }
  const handleSendForm = (e) => {
    e.preventDefault()
    nuevoRegistro(bodyFinal)
  }

  return (
  <section id="modal-container" className='d-flex justify-content-center align-items-center'>
    <section id="modal">
    <button className="btn btn-dark close-modal" onClick={() => cerrarModal(false)} >X</button>
    <form action="" onSubmit={handleSendForm}>
        <h2>Nuevo Registro/Cuenta </h2>
    <div className="mb-2">
        <label htmlFor="" className="form-label">Nombre del Registro Cuenta</label>
        <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
    </div>
    <div className="mb-2">
        <label htmlFor="" className="form-label">Fondos del Registro</label>
        <input type="number" className="form-control" name="fondos" onChange={handleChange}/>
    </div>
    <button className='btn btn-primary'>Crear Registro</button>
    </form>
    </section>
</section>)
}

export default ModalRegistro

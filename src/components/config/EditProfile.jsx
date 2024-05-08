function EditProfile () {
  return (
  <section className="m-5">
    <h1 className="text-center">Editar Perfil</h1>
    <form className="px-3">
      <div className="mb-3">
          <label className="form-label" htmlFor="">Nombre</label>
          <input className="form-control" type="text" name="nombre" required/>
      </div>
      <div className="mb-3">
          <label className="form-label" htmlFor="">Apellido</label>
          <input className="form-control" type="text" name="apellido" required/>
      </div>
      <div className="mb-3">
          <label className="form-label" htmlFor="">Username</label>
          <input className="form-control" type="text" name="username" required/>
      </div>
      <button className="btn btn-outline-primary btn-lg px-5">Editar</button>
    </form>
  </section>
  )
}

export default EditProfile

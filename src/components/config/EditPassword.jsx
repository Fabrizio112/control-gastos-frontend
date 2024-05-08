function EditPassword () {
  return (
  <section className="m-5">
    <h1 className="text-center">Editar Contraseña</h1>
    <form action="" className="px-3">
        <div className="mb-3">
            <label className="form-label" htmlFor="">Nueva Contraseña</label>
            <input className="form-control" type="password" name="password" required/>
        </div>
        <div className="mb-3">
            <label className="form-label" htmlFor="">Repetir Contraseña</label>
            <input className="form-control" type="password" name="check_password" required/>
        </div>
        <button className="btn btn-outline-primary px-5">Cambiar Contraseña</button>
    </form>
</section>)
}

export default EditPassword

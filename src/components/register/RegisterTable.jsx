function RegisterTable ({ valor }) {
  return (
<div className="border border-black rounded-4 px-4">
  <table className="table table-borderless mt-4">
    <thead>
        <tr>
            <th>Numero</th>
            <th>Monto</th>
            <th>Descripcion</th>
            <th>Fecha</th>
            <th>Categoria</th>
        </tr>
    </thead>
    <tbody>
    {valor && valor.map(el => <tr key={el.nro}><td>{el.nro}</td><td>{el.monto}</td><td>{el.descripcion}</td><td>{el.fecha}</td><td>{el.id_categoria}</td></tr>)}
    </tbody>
</table>
</div>)
}

export default RegisterTable

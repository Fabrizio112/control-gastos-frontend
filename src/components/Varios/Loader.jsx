import spinner from '../../assets/spinner.svg'
function Loader () {
  return (
  <section className='loader-container'>
    <img src={spinner} alt="loader-spinner" />
  </section>
  )
}

export default Loader

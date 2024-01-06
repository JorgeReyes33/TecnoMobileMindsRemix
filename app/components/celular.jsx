import { Link } from '@remix-run/react'

function Celular({celular}) {
  const { descripcion, imagen, precio, marca, url } = celular

  // Acceder a la descripcion, ya que al ser un tipo array con atributo children, no se puede acceder directamente
  const descripcionContent = descripcion[0]?.children[0]?.text || '';

  // Asegurarse de que imagen y sus propiedades necesarias estén presentes antes de acceder a ellas
  const imageUrl = imagen?.data?.attributes?.formats?.small?.url || '';

  return (
    <div className="celular">
      {imageUrl && <img className='img' src={imageUrl} alt={`Imagen celular ${marca}`} />}
      <div className="contenido">
        <h3>{marca}</h3>
        <p className="descripcion">{descripcionContent}</p>
        <p className="precio">${precio}</p>

        <Link className='enlace' to={`/celulars/${url}`}>Ver producto</Link>
      </div>
    </div>
  )
}

export default Celular;





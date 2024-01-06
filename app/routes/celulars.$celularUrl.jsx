import { useState } from 'react'
import { getCelular } from '~/models/celulares.server'
import { useLoaderData, useOutletContext } from '@remix-run/react'

export async function loader({params}){
  const { celularUrl } = params
  const celular = await getCelular(celularUrl)

  if(celular.data.length === 0){
    throw new Response('', {
      status: 404,
      statusText: 'Celular no encontrado'
    })
  }

  return celular
}

export function meta({data}){
  //para que funcionen correctamente los datos meta, title y descripcion deben de ser un objeto diferente, no ambos en uno solo
  
  return ([
    {
        title: `TecnoMobileMinds - ${data.data[0].attributes.marca}`,
    },
    {
        description: `Celulares, venta de celulares, celular ${data.data[0].attributes.marca}`
    }
])
  /*
  return [
    {
      title: `TecnoMobileMinds - ${data.data[0].attributes.marca}`,
      description: `Celulares, venta de celulares, celular ${data.data[0].attributes.marca}`
    }
  ]
  */
}

//En la nueva version de remix el routing dinamico ha cambiado, ya no hay que crear una carpeta celulars/$celularUrl.jsx
//Solucion: crear un unico archivo con el siguiente nombre dentro de la carpeta de rutas celulars/$celularUrl.jsx

function Celular() {

    //const {sumar} = useOutletContext() 
    const {agregarCarrito} = useOutletContext()

    const [cantidad, setCantidad] = useState(0)
    const celular = useLoaderData()
    const { marca, descripcion, imagen, precio } = celular.data[0].attributes
    //console.log(celular.data[0].attributes.marca)

    

    const descripcionContent = descripcion[0]?.children[0]?.text || '';

    const handleSubmit = e => {
        e.preventDefault();

        if(cantidad < 1){
            alert('Debes seleccionar una cantidad')
            return
        }

        const celularSeleccionado = {
            id: celular.data[0].id,
            imagen: imagen.data.attributes.url,
            marca,
            precio,
            cantidad
        }

        //console.log(celularSeleccionado)
        agregarCarrito(celularSeleccionado)
    }


  return (
    <div className='celular'>
        <img className='imagen' src={imagen.data.attributes.url} alt={`Imagen del celular ${marca}`} />

       <div className='contenido'>
          <h3>{marca}</h3>
          <p className='texto'>{descripcionContent}</p>
          <p className='precio'>${precio}</p>

          <form onSubmit={handleSubmit} className='formulario'>
            <label htmlFor='cantidad'>Cantidad</label>

            <select 
              onChange={ e => setCantidad(parseInt(e.target.value))}
              id='cantidad'
            >
                <option value="0">-- Seleccione --</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <input 
                type='submit'
                value='Agregar al carrito'
            />
          </form>
      </div>
    </div>
  )
}

export default Celular

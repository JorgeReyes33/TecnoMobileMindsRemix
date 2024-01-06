import { useLoaderData } from '@remix-run/react'
import { getCelulares } from '~/models/celulares.server' 
import ListadoCelulares from '~/components/listado-celulares'

export function meta() {
  return [
    {
      title: 'TecnoMobileMinds - Tienda de celulares', 
    },
    {
      descripcion: 'TecnoMobileMinds - Nuestro catalogo de celulares'
    }
  ]
} 

//Loader se utiliza cuando el componente carga y action es cuando se envian datos desde un formulario
export async function loader(){
    const celulares = await getCelulares()
    return celulares.data
}

function Tienda() {

  const celulares = useLoaderData()

  //console.log('Datos de celulares en Tienda:', celulares);

  return (

        <ListadoCelulares 
          celulares={celulares}
        />
  )
}

export default Tienda

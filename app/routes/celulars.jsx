import { Outlet, useOutletContext } from '@remix-run/react'
import styles from '~/styles/celulares.css'

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

//Loader se utiliza cuando el componente carga y action es cuando se envian datos desde un formulario

function Tienda() {

  //console.log('Datos de celulares en Tienda:', celulares);

  return (
    <main className='contenedor'>
        <Outlet 
          context={useOutletContext()}
        />
    </main>
  )
}

export default Tienda

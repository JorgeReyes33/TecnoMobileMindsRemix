import { useState, useEffect } from 'react'
import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useRouteError,
    isRouteErrorResponse,
    Link
    //useCatch
} from '@remix-run/react'
import styles from '~/styles/index.css'
import Header from '~/components/header'
import Footer from '~/components/footer'
import Swal from 'sweetalert2'

export function meta(){
    const error = useRouteError();
    if (error?.status === 404) {
        return ([
            {
                title: `GuitarLA - 404`,
            },
            {
                description: `Contenido no encontrado`
            }
        ])
    }

    return [
        {
            charset: 'utf8',
            title: 'TecnoMobileMinds - Remix',
            viewport: 'width=device-width,initial-scale=1'
        }
    ]
}

export function links(){
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: "true"
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export default function App(){
    
    const carritoLS = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("carrito")) ?? [] : [];
    const [carrito, setCarrito] = useState(carritoLS);

    // UseEffect para guardar en el LS
    useEffect(() => {
        if (carrito?.length === 0) return;
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    /*
    const agregarCarrito = celular => {
        //console.log('Agregando...', celular)
        
        if(carrito.some(celularState => celularState.id === celular.id)){
            //console.log('Ese elemento ya existe...')
            //Iterar sobre el arreglo e identificar el elemento duplicado
            const carritoActualizado = carrito.map(celularState => {
                if(celularState.id === celular.id) {
                    //Reescribir la cantidad
                    celularState.cantidad = celular.cantidad
                }
                return celularState
            })
            //Agregar al carrito
            setCarrito(carritoActualizado)

        }else {
            //registro nuevo, agregar al carrito
            setCarrito([...carrito, celular])
        }
    }
    */

    //Funcion mejorada con sweet Alert
    const agregarCarrito = (celular) => {
        if (carrito.some((celularState) => celularState.id === celular.id)) {
          const carritoActualizado = carrito.map((celularState) => {
            if (celularState.id === celular.id) {
              // Reescribir la cantidad
              celularState.cantidad = celular.cantidad;
            }
            return celularState;
          });
      
          // Agregar al carrito
          setCarrito(carritoActualizado);
      
          // Mostrar SweetAlert2 de éxito
          Swal.fire({
            icon: 'success',
            title: 'Agregado al carrito',
            text: `Se ha actualizado la cantidad de ${celular.marca} en el carrito.`,
          });
        } else {
          // Registro nuevo, agregar al carrito
          setCarrito([...carrito, celular]);
      
          // Mostrar SweetAlert2 de éxito
          Swal.fire({
            icon: 'success',
            title: 'Agregado al carrito',
            text: `Se ha agregado ${celular.cantidad} ${
              celular.cantidad > 1 ? 'unidades' : 'unidad'
            } de ${celular.marca} al carrito.`,
          });
        }
      };

    const actualizarCantidad = celular => {
        //console.log(celular)
        const carritoActualizado = carrito.map(celularState => {
            if(celularState.id === celular.id){
                celularState.cantidad = celular.cantidad
            }
            return celularState
        })
        setCarrito(carritoActualizado)
    }

    
    /*
    const eliminarCelular = id => {
        //console.log("Eliminando...", id)
        const carritoActualizado = carrito.filter( celularState => celularState.id !== id)
        setCarrito(carritoActualizado)
    }
    */

    //Funcion mejorada con sweetAlert
    const eliminarCelular = (id, celular) => {
        // Mostrar SweetAlert2 para confirmar la eliminacion
        Swal.fire({
          icon: 'question',
          title: 'Eliminar del carrito',
          text: `¿Estás seguro de que quieres eliminar este articulo del carrito?`,
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          // Si el usuario hace clic en "Sí, eliminar"
          if (result.isConfirmed) {
            // Filtrar el carrito para eliminar el artículo
            const carritoActualizado = carrito.filter(
              (celularState) => celularState.id !== id
            );
            setCarrito(carritoActualizado);
      
            // Mostrar mensaje de éxito al eliminar el producto
            Swal.fire({
              icon: 'success',
              title: 'Eliminado del carrito',
              text: 'Se ha eliminado correctamente el articulo'
            });
          }
        });
      };

    return(
        <Document>
            {/* Lo que esta en routes es lo que se inyecta en el outlet */}
            <Outlet 
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarCelular
                }}
            />
        </Document>
    )
}

function Document({children}){
    return(
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

/** Manejo de errores en renix */

/*

ya no hay necesidad de utilizar catchboundary, el hook useCatch ya esta deprecated, asi que hacemos todo en
errorBoundary

export function CatchBoundary(){

        useCatch ya es deprecated
        const error = useCatch()
        hay que utilizar useRouterError
    
    const error = useRouteError()

    return (
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>
        </Document>
    )
}
*/

export function ErrorBoundary(){

    const error = useRouteError()

    if(isRouteErrorResponse(error)){
        return(
            <Document>
                <p className='error'>{error.status} {error.statusText}</p>
                <Link className='error-enlace' to='/'>Tal vez quieras regresar a la pagina principal</Link>
            </Document>
        )
    }
}


/* 
    codigo no usado

    //const [carrito, setCarrito] = useState([])

    //Solucion al error del local storage
    
    const carritoLS =
    typeof window !== 'undefined'
      ? (() => {
          try {
            const storedCarrito = localStorage.getItem('carrito');
            return storedCarrito ? JSON.parse(storedCarrito) : [];
          } catch (error) {
            console.error('Error parsing localStorage:', error);
            return [];
          }
        })()
      : [];
    const [carrito, setCarrito] = useState(carritoLS);

    
    const eliminarCelular = id => {
        const carritoActualizado = carrito.filter((celularState) => celularState.id !== id);
        carritoActualizado.length === 0 && localStorage.setItem('carrito', '[]');
        setCarrito(carritoActualizado);
    };

    // useEffect para cargar el state con info del LS
    
    useEffect(() => {
        const carritoLS = JSON.parse(localStorage.getItem('carrito')) ?? [];
        setCarrito(carritoLS);
    }, []);
    
*/
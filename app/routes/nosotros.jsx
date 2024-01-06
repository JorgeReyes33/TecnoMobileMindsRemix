import imagen from '../../public/img/nosotros2.jpeg'
import styles from '~/styles/nosotros.css'

export function meta(){
    return [
      {
        title: 'TecnoMoblileMinds - Sobre Nosotros',
        description: 'Venta de celulares, blog y mas'
      }
    ]
}

export function links(){
    return [
      {
        rel: 'stylesheet',
        href: styles
      },
      {
        rel: 'preload',
        href: imagen,
        as: 'image'
      }
    ]
}

function Nosotros() {

   

    return (
      <main className="contenedor nosotros">
          <h2 className="heading">Nosotros</h2>

          <div className="contenido">
              <img src={imagen} alt='imagen sobre nosotros' />

              <div>
                  <p>
                    Somos una empresa lider en la venta de smartphones de todo tipo de gama, ofreciendo siempre la 
                    la mejor oferta al mercado y porsupuesto los smartphones del momento a los mejores precios.
                  </p>
              </div>
          </div>
      </main>
    )
}

export default Nosotros

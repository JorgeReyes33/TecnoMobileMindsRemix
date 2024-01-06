import { useLoaderData } from "@remix-run/react"
import { getCelulares } from "~/models/celulares.server"
import { getPosts } from "~/models/posts.server"
import { getOferta } from "~/models/oferta.server"
import ListadoCelulares from "~/components/listado-celulares"
import ListadoPosts from "~/components/listado-posts"
import Oferta from "~/components/oferta"
import stylesCelulares from '~/styles/celulares.css'
import stylesBlog from '~/styles/blog.css'
import stylesOferta from '~/styles/oferta.css'

/*
  Nota:
  En versiones actuales de remix, el index hay que nombrarlo de la siguiente manera: _index.jsx.
  En caso contrario, no carga la informacion correctamente.
*/

export function meta(){

}

export function links(){
  return [
    {
      rel: 'stylesheet',
      href: stylesCelulares
    },
    {
      rel: 'stylesheet',
      href: stylesBlog
    },
    {
      rel: 'stylesheet',
      href: stylesOferta
    }
  ]
}

export async function loader(){

  //De esta manera de mejora el performance
  const [celulares, posts, oferta] = await Promise.all([
    getCelulares(),
    getPosts(),
    getOferta()
  ])

  /*
    Otra forma de retorna el objeto

      const data = {
        celulares,
        posts
      }

      return data
  */

  return {
    celulares: celulares.data,
    posts: posts.data,
    oferta: oferta.data
  }

}

  /*
    Esta alternativa funciona sin embargo no es optima, ya que la segunda llamada se va a ejecutar 
    hasta que la primera termine. Esto funciona en ciertos casos, pero para este no es lo ideal.

    const celulares = await getCelulares();
    console.log(celulares)

    const posts = await getPosts();
    console.log(posts)

    return {}
  */



function Index() {

  const {celulares, posts, oferta} = useLoaderData()
  //Retornamos todo en un fragment ya que al ser la pagina principal deben estar todos los elementos
  return (
    <>
      <main className="contenedor">
        <ListadoCelulares 
          celulares = {celulares}
        />
      </main>

      <Oferta 
        oferta={oferta.attributes}
      />

      <section className="contenedor">
        <ListadoPosts 
          posts={posts}
        />
      </section>
    </>
  )
}

export default Index

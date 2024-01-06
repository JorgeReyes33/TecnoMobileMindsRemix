import { useLoaderData } from "@remix-run/react"
import { getPost } from "~/models/posts.server" 
import { formatearFecha } from "~/utils/helpers"


export function meta({data}){
    //para que funcionen correctamente los datos meta, title y descripcion deben de ser un objeto diferente, no ambos en uno solo
    
    return ([
      {
          title: `TecnoMobileMinds - ${data.data[0].attributes.titulo}`,
      },
      {
          description: `Blog, venta de celulares, entrada ${data.data[0].attributes.titulo}`
      }
  ])
}

export async function loader({params}){

    const { postUrl } = params
    const post = await getPost(postUrl)

    if(post.data.length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'Entrada no encontrada'

        })
    }

    return post
}

export default function Post() {

    const post = useLoaderData()

    const { titulo, contenido, imagen, publishedAt } = post?.data[0].attributes
    const postContent = contenido[0]?.children[0]?.text || '';

  return (
    <article className="post mt-3">
        <img className="imagen" src={imagen?.data.attributes.url} alt={`imagen blog ${titulo}`} />
        <div className="contenido">
            <h3>{titulo}</h3>
            <p className="fecha">{formatearFecha(publishedAt)}</p>
            <p className="texto">{postContent}</p>
        </div>
    </article>
     
  )
}

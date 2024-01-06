import { getPosts } from '~/models/posts.server'
import { useLoaderData } from '@remix-run/react'
import ListadoPosts from '~/components/listado-posts'

//Este archivo en vez de presentar informacion, va a actuar como layout, mediante uso de nested routes

export function meta() {
  return [
    {
      title: 'TecnoMobileMinds - Nuestro blog',
    },
    {
      description: 'TecnoMobileMinds - Blog de tecnologia, venta de smartphones'
    }
  ]
}

export async function loader(){
  const posts = await getPosts()

  return posts.data
}

function Blog(){

  const posts = useLoaderData()

  return (
      <ListadoPosts 
        posts={posts}
      />
  )
}

export default Blog

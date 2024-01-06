
import { Outlet } from '@remix-run/react'
import styles from '~/styles/blog.css'

//Este archivo en vez de presentar informacion, va a actuar como layout, mediante uso de nested routes

export function links(){
    return [
      {
        rel: 'stylesheet',
        href: styles
      }
    ]
}

function Blog(){

  return (
    <main className="contenedor">
      <Outlet />
    </main>
  )
}

export default Blog

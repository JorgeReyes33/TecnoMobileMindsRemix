

export default function Oferta({oferta}) {
    
    const { contenido, imagen, titulo } = oferta
    const content = contenido[0]?.children[0]?.text || '';

  return (
    <section className="curso">
        <style jsx="true">{`
            .curso{
                background-image: linear-gradient(to right, rgb(0 0 0 / .8), rgb(0 0 0 / .7)), url(${imagen.data.attributes.url})
            }
        `}</style>

        <div className="contenedor oferta-grid">
            <div className="contenido">
                <h2 className="heading">{titulo}</h2>
                <p className="texto">{content}</p>
            </div>
        </div>
    </section>
  )
}

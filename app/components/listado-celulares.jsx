import Celular from "./celular"

export default function ListadoCelulares({celulares}) {
  return (
    <>
        <h2 className='heading'>Nuestros productos</h2>
          {celulares?.length && (
            <div className='celulares-grid'>
                {celulares.map( celular => (
                    <Celular 
                      key={celular?.id}
                      celular = {celular?.attributes}
                    />
                ))}
            </div>
          )}
    </>
  )
}

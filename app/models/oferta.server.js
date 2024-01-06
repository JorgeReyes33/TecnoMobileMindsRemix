
export async function getOferta(){
    const respuesta = await fetch(`${process.env.API_URL}/oferta?populate=imagen`)
    return await respuesta.json()
}
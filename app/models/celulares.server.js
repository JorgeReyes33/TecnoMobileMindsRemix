export async function getCelulares() {
    const respuesta = await fetch(`${process.env.API_URL}/celulars/?populate=imagen`);
    //const resultado = await respuesta.json();
    return await respuesta.json()
    //return resultado
}

export async function getCelular(url){
    const respuesta = await fetch(`${process.env.API_URL}/celulars?filters[url]=${url}&populate=imagen`)
    return await respuesta.json()
}
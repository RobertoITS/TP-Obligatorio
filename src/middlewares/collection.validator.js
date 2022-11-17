
/**
 ** Validar colecciones permitidas,
 ** En este caso, solamente vamos a usar las de users
 ** Mas adelante se puede ampliar a varias colecciones, productos, usuarios, tiendas, etc
*/

const allowedCollection = (collection = '', collections = []) => {

    const included = collections.includes(collection) //* Vemos que la coleccion este en la lista de colecciones

    if(!included){
        throw new Error(`La coleccion ${collection} no esta permitida`)
    }

    return true

}

export const collections = { allowedCollection }
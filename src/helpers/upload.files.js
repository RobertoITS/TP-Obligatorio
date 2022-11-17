
/**
 * Helper para la carga de archivos
 */

const { v4: uuidv4 } = require('uuid')
const path = require('path')

const uploadFiles = (fileToUpload, extensions = ['jpg', 'jpeg', 'png', 'gif', 'bpm', 'svg'], pathLocation = '') => {
    return new Promise((resolve, rejected) => {
        const { file } = fileToUpload //* Obtenemos el archivo
        const extensionAndName = file.name.split('.') //* Obtenemos las extension y el nombre del archivo (una lista)
        const extension = extensionAndName[extensionAndName.length - 1] //* Obtenemos la extension solamente
        if(!extensions.includes(extension)) { //! Corroboramos que la extension sea la permitida
            return reject({mgs: `Las extensiones permitidas son: ${extensions}`});
        }
        const tempName = uuidv4() + '.' + extension //* Creamos una uuid unica para el archivo
        const uploadPath = path.join(__dirname, '../uploads/', pathLocation, tempName) //* La ubicacion donde se va a guardar el archivo
        file.mv(uploadPath, function(err) {
            if(err){
                rejected(err) //! En caso de algun error en la carga
            }
            resolve(tempName) //* Si todo esta OK, devuelve el nombre del archivo cargado
        })
    })
}

export const files = { uploadFiles }
import { connect } from "../database/database";
import { request, response } from "express";
import { files } from "../helpers/upload.files"

const path = require('path')
const fs = require('fs') //* El file system

//* Subimos el archivo:
const uploadFile = async(req = request, res = response) => { //! La key para referenciar el archivo es "file"
    const user_id = req.params.id //* Obtenemos el id del usuario
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file) { //* Si no se encuentra el archivo:
        res.status(400).send('Los archivos no han sido subidos')
        return
    }

    //* Obtenemos el nombre del archivo para guardarlo en la referencia del usuario actual
    const avatar = await files.uploadFiles(req.files, undefined, 'images/users')
    const user = { avatar: avatar } //* Creamos el objeto de usuario
    try {
        const connection = await connect
        //* Actualizamos el usuario
        const result = await connection.query('UPDATE users SET ? WHERE user_id = ?', [user, user_id])
        res.status(200).json({
            ok: true,
            avatar,
            result
        })
    }
    catch (err){
        res.status(400).json({
            ok: false,
            msg: `Algo salio mal: ${err}`
        })
    }
}

//* Modificamos el archivo
const updateFile = async(req = request, res = response) => {
    //* Pasamos como parametro el id y la coleccion (en este caso users)
    const user_id = req.params.id
    const collection = req.params.collection
    const connection = await connect
    switch(collection){ //! Aca cambiamos las colecciones!
        case 'users':
            const user = await connection.query('SELECT user_id, avatar FROM users WHERE user_id = ?', user_id)
            console.log(user);
            if(user.length < 1) { //* Comprobamos que el usuario exista:
                return res.status(400).json({
                    msg: `No existe el usuario con id: ${user_id}`
                })
            } else {
                //! Limpiamos las imagenes previas:
                const avatar = user[0].avatar
                console.log(avatar);
                try {
                    if(avatar){
                        //* Revisamos si la imagen esta ya insertada:
                        const imagePath = path.join(__dirname, '../uploads/images', collection, avatar)
                        console.log(imagePath);
                        if(fs.existsSync(imagePath)) {
                            fs.unlinkSync(imagePath) //* Caso que exista, se elimina
                        }
                    }
                } catch (err){
                    
                }
                const newImage = await files.uploadFiles(req.files, undefined, 'images/users')
                const result = await connection.query('UPDATE users SET avatar = ? WHERE user_id = ?', [newImage, user_id])
                res.status(200).json({
                    ok: true,
                    newImage,
                    result,
                    msg: 'Imagen actualizada con exito'
                })
            }
            break

            //TODO Aca se puede usar otro case para otra coleccion de imagenes:

        default:
            return res.status(500).json({
                msg: 'Colecion no permitida'
            })
    }
}

export const methods = { uploadFile, updateFile }
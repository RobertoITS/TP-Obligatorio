import { connect } from "./../database/database"
import { request, response } from "express"
import generateJWT from "./../helpers/jwt"
import bcryptjs from "bcryptjs"

const login = async(req = request, res = response) => {
    const { username, pass } = req.body
    try {
        //* Conexion y consulta a la BD
        const connection = await connect
        const result = await connection.query('SELECT * FROM users WHERE username = ?', username)

        const validPass = bcryptjs.compareSync(pass, result[0].pass) //! Encriptamos la contraseña!

        if (!validPass) {
            return res.status(400).json({
                ok: false,
                error: 'Contraseña incorrecta'
            })
        } else {
            console.log(result);
            //Si existe el usuario, generamos el token
            const token = await generateJWT(result[0].user_id)
            return res.status(200).json({
                ok: true,
                token,
                result
            })
        }
    } catch (err) {
        return res.status(404).json({
            ok: false,
            error: 'Algo salio mal'
        })
    }
}

export const methods = { login }
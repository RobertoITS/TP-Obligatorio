const jwt = require("jsonwebtoken")


//*Esta funcion middleware se usa antes de los endpoints para validar que el token exista
//! post("/", validateJWT) => Hace la validacion del token
const validateJWT = (req, res, next) => {
    const token = req.header("x-token") //!Obtenemos el token del header

    if(!token){
        return res.status(401).json({
            ok:false,
            msq: "No hay token en la peticion"
        })
    }
    try {
        //!Verificamos el token obtenido con la llave secreta:
        const {id} = jwt.verify(token, process.env.JWT_SECRET)
        //*Estamos seguros que el token es correcto
        req.id = id
        next()
    }
    catch (e){
        return res.status(401).json({
            ok: false,
            msq: "Token no valido"
        })
    }
}

//!Exportamos la funcion
export const jwtValidator = {
    validateJWT
}
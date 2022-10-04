import { request, response } from 'express'
import { connect } from './../database/database';

const newTransaction = async (req = request, res = response) => {
    //TODO Esta variable la obtenemos de la autenticacion del usuario
    const user_id = req.session.user_id

    //Obtenemos la cuenta de destino
    const { destiny, quantity } = req.body

    try {
        const connection = await connect

        //Obtenemos el monto del usuario actual
        const userOne = await connection.query('SELECT money FROM users WHERE user_id = ?', user_id)
        //Restamos el monto a transferir y el obtenido
        mount = userOne[0].money - quantity
        //Si es mayor a 0, se puede continuar
        if(mount > 0){
            //TODO Actualizar el monto del usuario actual y sumarle al usuario receptor
        }
        else {
            //TODO No se puede realizar la transaccion
        }
    }
    catch(err){
        
    }
}
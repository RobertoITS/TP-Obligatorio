import { request, response } from 'express'
import { connect } from './../database/database';

//TODO Si se transfiere sobre el mismo usuario, se pierde el monto...
const newTransaction = async (req = request, res = response) => {
    //TODO Esta variable la obtenemos de la autenticacion del usuario
    //TODO const user_id = req.session.user_id
    const user_id = req.params.id

    //Obtenemos la cuenta de destino y el fondo a transferir
    const { destiny, quantity } = req.body

    try {
        const connection = await connect

        //* Obtenemos el monto del usuario actual
        const userMoney = await connection.query('SELECT money FROM users WHERE user_id = ?', user_id)
        //* Restamos el monto a transferir y el obtenido
        const mount = userMoney[0].money - quantity
        //* Si es mayor a 0, se puede continuar
        if(mount > 0){
            //* Obtenemos el monto del usuario receptor
            const transaction = await connection.query('SELECT money FROM users WHERE user_id = ?', destiny)
            //* Actualizamos el monto del usuario receptor
            const final = quantity + transaction[0].money
            const receiverObject = {money: final}
            const receiver = await connection.query('UPDATE users SET ? WHERE user_id = ?', [receiverObject, destiny])
            //* Actualizamos el monto del usuario emisor
            const transmitterObject = {money:mount}
            const transmitter = await connection.query('UPDATE users SET ? WHERE user_id = ?', [transmitterObject, user_id])
            //* Dejamos registro de la transaccion
            //! Fecha actual
            const today = Date.now()
            const date = new Date(today)
            const formattedDate = date.toLocaleDateString()
            const finish = {
                source_: user_id,
                destiny: destiny,
                quantity: quantity,
                date_: formattedDate
            }
            const result = await connection.query('INSERT INTO transactions SET ?', finish)

            res.status(200).json({
                ok: true,
                result,
                receiver,
                transmitter,
                message: 'Todo ok'
            })
        }
        else {
            //! No se puede realizar la transaccion
            return res.status(400).json({
                ok: false,
                message: 'No hay fondos'
            })
        }
    }
    catch(err){
        res.status(400).json({
            ok: false,
            err,
            message: 'Algo salio mal'
        })
    }
}

const getTransactions = async (req = request, res = response) => {
    try {
        const connection = await connect

        const result = await connection.query('SELECT * FROM transactions')

        res.status(200).json({
            ok: true,
            result,
            message: 'Todo ok'
        })
    }
    catch(err) {
        res.status(400).json({
            ok: false,
            err,
            message: 'Algo salio mal'
        })
    }
}

export const methods = { newTransaction, getTransactions }
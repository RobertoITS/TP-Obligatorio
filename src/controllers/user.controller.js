import { request, response } from 'express'
import { connect } from './../database/database';
import bcryptjs from 'bcryptjs'

//Registramos el usuario
const registerUser = async(req = request, res = response) => {

    //Obtenemos los datos desde el body
    const {
        username,
        first_name,
        last_name,
        email,
        pass,
        gro_ups,
        user_permission,
        is_staff,
        is_active,
        is_superuser
    } = req.body

    //Encriptamos la contraseña
    let passwordHash = bcryptjs.hashSync(pass, 8)
        //Fecha actual
    const today = Date.now()
    const date = new Date(today)
    const formattedDate = date.toLocaleDateString()

    //Creamos el objeto
    const user = {
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        pass: passwordHash,
        gro_ups: gro_ups,
        user_permission: user_permission,
        is_staff: is_staff,
        is_active: is_active,
        is_superuser: is_superuser,
        last_login: formattedDate,
        date_joined: formattedDate
    }

    try {
        //Instanciamos la conexion
        const connection = await connect

        //Insertamos el objeto
        const result = await connection.query('INSERT INTO users SET ?', user)

        res.status(200).json({
            ok: true,
            user,
            result,
            message: 'Todo ok'
        })
    } catch (err) {
        res.status(400).json({
            ok: false,
            err,
            message: 'Algo salio mal'
        })
    }
}

//Obtenemos los usuarios
const getUsers = async(req = request, res = response) => {
    try {
        const connection = await connect

        const result = await connection.query('SELECT * FROM users')

        res.status(200).json({
            ok: true,
            result,
            message: 'Todo ok'
        })
    } catch (err) {
        res.status(400).json({
            ok: false,
            err,
            message: 'Algo salio mal'
        })
    }
}

//Obtenemos un usuario especifico
const getUser = async(req = request, res = response) => {
    const user_id = req.params.id

    try {
        const connection = await connect

        const result = await connection.query('SELECT * FROM users WHERE user_id = ?', user_id)

        res.status(200).json({
            ok: true,
            result,
            message: 'Todo ok'
        })
    } catch (err) {
        res.status(400).json({
            ok: false,
            err,
            message: 'Algo salio mal'
        })
    }
}

//Borramos el usuario
const deleteUser = async(req = request, res = response) => {
    const user_id = req.params.id
    try {
        const connection = await connect

        const result = await connection.query('DELETE FROM users WHERE user_id = ?', user_id)

        res.status(200).json({
            ok: true,
            result,
            message: 'Todo ok'
        })
    } catch (err) {
        res.status(400).json({
            ok: false,
            err,
            message: 'Algo salio mal'
        })
    }
}

//Agregamos fondos o cambiamos el rol, en su defecto
const editUser = async(req = request, res = response) => {
    const user_id = req.params.id

    //! Obtenemos el valor actual, antes de modificarlo
    const connection = await connect
    console.log(user);
    const dinero = await connection.query('SELECT money FROM users WHERE user_id = ?', user_id)


    const {
        money,
        gro_ups
    } = req.body

    console.log(money, gro_ups);

    let user = null

    //Verificamos que tipo de dato van a cambiar
    if (gro_ups != undefined && money != undefined) { //Ambos datos
        user = {
            money: money + dinero[0].money,
            gro_ups: gro_ups
        }
    }
    if (gro_ups == undefined) { //El rol
        user = {
            money: money + dinero[0].money
        }
    }
    if (money == undefined) { //El monto
        user = {
            gro_ups: gro_ups
        }
    }

    try {
        const connection = await connect
        console.log(user);
        const dinero = await connection.query('SELECT money FROM users WHERE user_id = ?', user_id)
        console.log(dinero[0].money);
        const result = await connection.query('UPDATE users SET ? WHERE user_id = ?', [user, user_id])
        return res.status(200).json({
            ok: true,
            result,
            dinero,
            message: 'Todo ok'
        })
    } catch (err) {
        return res.status(500).json({
            ok: false,
            err,
            message: 'Algo salio mal'
        })
    }
}


//Exportamos los metodos
export const methods = { registerUser, deleteUser, getUsers, getUser, editUser };
import mysql from "promise-mysql";
import config from "./../config"


const connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password
});
const getConnection = () => {
    console.log('DB Connectada');
    return connection;
}

export const connect = getConnection()
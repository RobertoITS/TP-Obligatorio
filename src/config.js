import {
    config
} from "dotenv";
config();
export default {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: 'mati',
    password: process.env.PASSWORD
}
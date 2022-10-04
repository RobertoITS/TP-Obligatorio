import express from "express";
import morgan from "morgan";
import session from "express-session";

//Routes
import userRoutes from "./routes/user.routes";
/*express framework que nos permite crear un servidor web
y manejar nuestras rutas a través de peticiones http:
get, post, put y delete
*/
//creamos nuestra aplicación con express
const app = express();

//Setting
//Le asignamos el puerto en el cual queremos trabajar
app.set("port", 3000);
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Middlewares
app.use(morgan("dev"));
//Session - usamos express-session para el manejo de las sesiones:
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true
}))


//le indicamos las rutas
app.use(userRoutes);

export default app;
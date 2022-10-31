import express from "express";
import morgan from "morgan";
import session from "express-session";
import fileUpload from "express-fileupload";


var cors = require('cors')

//Routes
import userRoutes from "./routes/user.routes";
import transactionRoutes from "./routes/transaction.routes"
import authRoutes from "./routes/auth.routes"

import uploadRoutes from "./routes/uploads.route"
/*express framework que nos permite crear un servidor web
y manejar nuestras rutas a través de peticiones http:
get, post, put y delete
*/
//creamos nuestra aplicación con express
const app = express();

app.use(cors())
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

// file upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


//le indicamos las rutas
app.use(userRoutes, transactionRoutes, authRoutes, uploadRoutes);

export default app;
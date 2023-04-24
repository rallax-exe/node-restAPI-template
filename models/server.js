const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        /*Propiedades de la clase*/

        //Crea la app de express
        this.app  = express();
        //Crea la prop port
        this.port = process.env.PORT || 3000;

        //Ruta del API de usuarios
        this.usuariosPath = '/api/usuarios';

        //Conectar con base de datos
        this.conectarDB();


        /*Middlewares*/
        this.middlewares();


        /*Rutas del servidor*/
        this.routes();
    }

    
    /*Metodos*/

    async conectarDB() {

        //Ejecuta la funcion de config.js
        await dbConnection();

    }


    middlewares() {


        //Cors
        this.app.use(cors());

        //Lecutra y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
        

    }

    routes() {
        //Rutas del servidor 
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }

}
  


module.exports = Server;
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


        this.paths = {

            //Ruta del API de auth
            auth: '/api/auth',
            //Ruta del API de buscar
            buscar: '/api/buscar',
            //Ruta del API de categorias
            categorias: '/api/categorias',
            //Ruta del API de usuarios
            usuarios: '/api/usuarios',
            //Ruta del API de usuarios
            productos: '/api/productos'

        }

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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }

}
  


module.exports = Server;
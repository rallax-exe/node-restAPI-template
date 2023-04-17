
require('dotenv').config();
const Server = require('./models/server');


//Crea una nueva instacia (objeto) del servidor
const server = new Server();


//Lanza el metodo listen 
server.listen();
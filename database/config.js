const mongoose = require('mongoose');

/*Configuraciones para conexion a base de datos*/

const dbConnection = async() => {

    try {
        
        //Conexion a mongoDB
        await mongoose.connect( process.env.DB_CNN,{
            /*
                Ya no son soportados por Mongoose
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFinAndModify: false
            */
        });

        console.log('Base de datos online');


    } catch (error) {
        console.log(error)
        throw new Error('Error en la conexion con la base de datos');
    }

}


module.exports = {
    dbConnection
};

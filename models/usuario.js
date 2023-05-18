

const { Schema, model } = require('mongoose');


//Se crea un nuevo modelo (tabla en db relacionales)
const UsuarioSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'El la contrasenia es obligatorio'],
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: [true, 'El rol es obligatorio'],
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    estado:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false,
    },

});


//Convierte la respuesta de Mongo a un objeto literal
UsuarioSchema.methods.toJSON = function() {
    /*
        Saca la version y el password de la respuesta para ignorarlos 
        y lo demas se mantiene como un objeto literal
    */
    const { __v, password, _id, ...usuario } = this.toObject();
    //Agrega una nueva prop llamada uid
    usuario.uid = _id;
    return usuario;
}

//model le pone nombre al modelo y tambien a la coleccion
module.exports = model('Usuario', UsuarioSchema);

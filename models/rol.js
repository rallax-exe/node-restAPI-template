

const { Schema, model } = require('mongoose');

const RoleSchema = {

    rol:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }

};

//model le pone nombre al modelo y tambien a la coleccion
module.exports = model('Role', RoleSchema);



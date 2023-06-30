
const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        //Es otro objeto que tenemos en mongo
        type: Schema.Types.ObjectId,
        //A punta a schema usuario
        ref: 'Usuario',
        required: true
    }
    
});

//Convierte la respuesta de Mongo a un JSON
CategoriaSchema.methods.toJSON = function() {
    /*
        Saca la version para ignorarlo
        y lo demas se mantiene como un objeto literal
    */
    const { __v, estado, ...categoria } = this.toObject();
    return categoria;
}


//model le pone nombre al modelo y tambien a la coleccion
module.exports = model('Categoria', CategoriaSchema);





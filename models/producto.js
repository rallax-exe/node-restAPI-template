
const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

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
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion:{ type: String },
    disponible:{ type: Boolean, default: true },
});

//Convierte la respuesta de Mongo a un JSON
ProductoSchema.methods.toJSON = function() {
    /*
        Saca la version para ignorarlo
        y lo demas se mantiene como un objeto literal
    */
    const { __v, estado, ...data } = this.toObject();
    return data;
}


//model le pone nombre al modelo y tambien a la coleccion
module.exports = model('Producto', ProductoSchema);





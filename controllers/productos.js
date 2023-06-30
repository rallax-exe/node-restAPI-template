
const { response } = require('express');
const { Producto } = require('../models');


/*  --- CONTROLADORES --- */

const obtenerProductos = async (req, res = response) => {

    //extrae el limit de la url
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    //Como son dos peticiones a base de datos se hace con un arreglo de promesas
    //El nombre total y productos, nombra la primera y segunda promesa en el mismo orden
    const [total, productos] = await Promise.all([
        //Esto se llamara total
        Producto.countDocuments(query),
        //Esto se llamara productos
        //Obtiene todos los productos de la BD, con filtro sin filtro regresa todos
        Producto.find(query)
            .skip(Number(desde))
            //la url es string por eso se convierte a entero
            .limit(Number(limite))
            /*
                POPULATE
                Funciona como una especie de join
                trae a los usuarios relacionados con la creacion del producto
                recibe como primer argumento el campo donde esta el id del usuario en la tabla producto
                como segundo argumento necesita los campos del usuario que regresara, en este caso solo
                se necesita el nombre del usuario
            */
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        total,
        productos
    });

}


//obtenerProducto  - populate { objeto del producto }

const obtenerProducto = async (req, res = response) => {

    //Obtiene el id de la url
    const { id } = req.params;

    //Obtiene el producto de la DB
    const producto = await Producto.findById(id)
                    .populate('usuario', 'nombre')
                    .populate('categoria', 'nombre');;

    res.json({
        producto
    });

}


const crearProducto = async (req, res = response) => {

    //Se extrae estado y usuario para que no se puea cambiar desde las props enviadas
    const {estado, usuario, ...body} = req.body;

    //Convierte nombre a mayusculas
    const nombre = body.nombre.toUpperCase();

    //Consulta en DB una producto con ese nombre
    const productoDB = await Producto.findOne({ nombre });

    //Si existe producto
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }


    //Generar la data a guardar
    const data = {
        //Ojo con el orden, body mantiene la prop nombre
        ...body,
        //Se sobre escribe la prop nombre aqui 
        nombre,
        //El usaurio que la esta creando viene por referencia 
        usuario: req.usuario._id
    }

    //Crea una instancia mongo del modelo producto 
    const producto = new Producto(data);

    //Guardar en DB
    await producto.save();

    res.status(201).json(producto);

}

//actualizarProducto
const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;
    //Extrae estado y usuario, data mantiene todas las props del req
    const {estado, usuario, ...data} = req.body;

    //Si viene el nombre en la req
    if(data.nombre){
        //Convierte en mayuscula el nombre de la categoria
        data.nombre = data.nombre.toUpperCase();
    }

    //Mantener el id del usuario de ultima modificacion
    data.usuario = req.usuario._id;

    //Si todo ok Actualiza en DB
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    res.json(producto);

}


//borrarCategoria - estado: false

const borrarProducto = async(req, res = response) => {

    //id de la url 
    const { id } = req.params;

    //Actualiza el estado del usuario a false, no se borra para mantener integridad referencial de datos
    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, { new: true });
    res.json(producto);
}


module.exports = {

    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto

}
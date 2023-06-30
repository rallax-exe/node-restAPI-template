const { response } = require('express');
const { Categoria } = require('../models');


/*  --- CONTROLADORES --- */


const obtenerCategorias = async (req, res = response) => {

    //extrae el limit de la url
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    //Como son dos peticiones a base de datos se hace con un arreglo de promesas
    //El nombre total y categorias, nombra la primera y segunda promesa en el mismo orden
    const [total, categorias] = await Promise.all([
        //Esto se llamara total
        Categoria.countDocuments(query),
        //Esto se llamara categorias
        //Obtiene todos los categorias de la BD, con filtro sin filtro regresa todos
        Categoria.find(query)
            .skip(Number(desde))
            //la url es string por eso se convierte a entero
            .limit(Number(limite))
            /*
                POPULATE
                Funciona como una especie de join
                trae a los usuarios relacionados con la creacion de la categoria
                recibe como primer argumento el campo donde esta el id del usuario en la tabla categoria
                como segundo argumento necesita los campos del usuario que regresara, en este caso solo
                se necesita el nombre del usuario
            */
            .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        categorias
    });

}


//ObtenerCategoria  - populate { objeto de la categoria }

const obtenerCategoria = async (req, res = response) => {

    //Obtiene el id de la url
    const { id } = req.params;

    //Obtiene categoria de la DB
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        categoria
    });

}


const crearCategoria = async (req, res = response) => {


    //Extrae el nombre de la request , lo convierte en mayuscula
    const nombre = req.body.nombre.toUpperCase();
    //Consulta en DB una categoria con ese nombre
    const categoriaDB = await Categoria.findOne({ nombre });

    //Si existe categoria
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        //El usaurio viene por referencia 
        usuario: req.usuario._id
    }

    //Crea una instancia mongo del modelo categoria 
    const categoria = new Categoria(data);

    //Guardar en DB
    await categoria.save();

    res.status(201).json(categoria);

}

//actualizarCategoria
const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params;
    //Extrae estado y usuario, data mantiene todas las props del req
    const {estado, usuario, ...data} = req.body;

    //Convierte en mayuscula el nombre de la categoria
    data.nombre = data.nombre.toUpperCase();

    //Mantener el id del usuario de ultima modificacion
    data.usuario = req.usuario._id;

    //Si todo ok Actualiza en DB
    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
    res.json(categoria);

}


//borrarCategoria - estado: false

const borrarCategoria = async(req, res = response) => {

    //id de la url 
    const { id } = req.params;

    //Actualiza el estado del usuario a false, no se borra para mantener integridad de datos
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, { new: true });
    res.json(categoria);
}


module.exports = {

    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria

}
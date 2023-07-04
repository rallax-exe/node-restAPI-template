const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

//Arreglo de todas las colecciones son permitidas
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'productosporcategoria'
];



const buscarPorductosCategoria = async (termino = '', res = response) => {

    //Por si el usuario manda un mongo id como termino de busqueda
    const esMongoID = ObjectId.isValid(termino); //TRUE o FALSE


    //Si es un mongoId
    if (esMongoID) {
        //Busqueda por nombre en base de datos
        const productos = await Producto.find({ categoria: termino, estado: true });

        return res.json({
            //Si el producto existe, regresa prducto, si no arreglo vacio
            //Mongoose hace el arreglo por nosotros
            results: productos
        });
    } else {
        return res.status(400).json({
            msg: 'La categoria no existe'
        });
    }

}

const buscarProductos = async (termino = '', res = response) => {

    //Por si el usuario manda un mongo id como termino de busqueda
    const esMongoID = ObjectId.isValid(termino); //TRUE o FALSE


    //Si es un mongoId
    if (esMongoID) {
        //realiza la busqueda en base de datos
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');

        return res.json({
            //Si el producto existe, regresa producto, si no arreglo vacio
            results: (producto) ? [producto] : []
        });
    }


    //Una expresion regular para hacer insensible la busqueda
    const regex = new RegExp(termino, 'i')

    //Busqueda por nombre en base de datos
    const productos = await Producto.find({ nombre: regex, estado: true }).populate('categoria', 'nombre');

    return res.json({
        //Si el producto existe, regresa prducto, si no arreglo vacio
        //Mongoose hace el arreglo por nosotros
        results: productos
    });

}

const buscarCategorias = async (termino = '', res = response) => {

    //Por si el usuario manda un mongo id como termino de busqueda
    const esMongoID = ObjectId.isValid(termino); //TRUE o FALSE


    //Si es un mongoId
    if (esMongoID) {
        //realiza la busqueda en base de datos
        const categoria = await Categoria.findById(termino);

        return res.json({
            //Si la categoria existe, regresa categoria, si no arreglo vacio
            results: (categoria) ? [categoria] : []
        });
    }


    //Una expresion regular para hacer insensible la busqueda
    const regex = new RegExp(termino, 'i')

    //Busqueda por nombre en base de datos
    const categorias = await Categoria.find({ nombre: regex, estado: true });

    return res.json({
        //Si la categoria existe, regresa categoria, si no arreglo vacio
        //Mongoose hace el arreglo por nosotros
        results: categorias
    });

}


const buscarUsuarios = async (termino = '', res = response) => {

    //Por si el usuario manda un mongo id como termino de busqueda
    const esMongoID = ObjectId.isValid(termino); //TRUE o FALSE


    //Si es un mongoId
    if (esMongoID) {
        //realiza la busqueda en base de datos
        const usuario = await Usuario.findById(termino);

        return res.json({
            //Si el usuario existe, regresa usuario, si no arreglo vacio
            results: (usuario) ? [usuario] : []
        });
    }


    //Una expresion regular para hacer insensible la busqueda
    const regex = new RegExp(termino, 'i')

    //Busqueda por nombre en base de datos
    const usuarios = await Usuario.find({

        //Condiciones de busqueda, aqui se acepta poner where
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]

    })

    return res.json({
        //Si el usuario existe, regresa usuario, si no arreglo vacio
        //Mongoose hace el arreglo por nosotros
        results: usuarios
    });

}


const buscar = (req, res = response) => {

    //Esto se recibe de los argumentos que vienen en la peticion
    const { coleccion, termino } = req.params;

    //Si la coleccion no existe entonces manda bad request
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }


    switch (coleccion) {

        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        case 'categorias':
            buscarCategorias(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;
        case 'productosporcategoria':
            buscarPorductosCategoria(termino, res)
            break;

        default:
            res.status(500).json({
                msg: 'No se pudo realizar la busqueda'
            });
    }

}


module.exports = {

    /*
        Como un objeto, por si hay mas controladores
        relacionados a la busqueda
    */

    buscar

}
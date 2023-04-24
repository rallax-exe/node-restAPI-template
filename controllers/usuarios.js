
//Para mantener el tipado
const { response, request } = require('express');

const bcryptjs = require('bcryptjs');

//Importa el modelo de mongoose
const Usuario = require('../models/usuario');


/*  --- CONTROLADORES --- */

const usuariosGet = async(req = request, res = response) => {

    //extrae el limit de la url
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    //Como son dos peticiones a base de datos se hace con un arreglo de promesas
    //El nombre total y usuarios, nombra la primera y segunda promesa en el mismo orden
    const [ total, usuarios ] = await Promise.all([
        //Esto se llamara total
        Usuario.countDocuments( query ),
        //Esto se llamara usuarios
        //Obtiene todos los usuarios de la BD, con filtro sin filtro regresa todos
        Usuario.find( query )
                    .skip(Number(desde))
                    //la url es string por eso se convierte a entero
                    .limit(Number(limite))
    ]);


    res.json({
        total,
        usuarios
    });
};


const usuariosPut = async(req, res = response) => {
    const { id } = req.params;

    //Extrae password, _id, coreo y google de req y genera un objeto sin estas props
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO Validar en base de datos

    if (password) {
        /*Encriptar la contrasenia*/
        //SaltSync, cuantas vueltas le dara a la encriptacion
        const salt = bcryptjs.genSaltSync(); 

        //Agrega la prop password encriptada
        resto.password = bcryptjs.hashSync(password, salt);
    };

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controlador',
        usuario
    });
};

const usuariosPost = async (req, res = response) => {

    /*Destructura lo que se necesita de la req*/
    const { nombre, correo, password, rol } = req.body;

    /*Crea una instancia del modelo (crea/selecciona la tabla Usuario en MongoDB)*/
    const usuario = new Usuario({ nombre, correo, password, rol });

    /*Encriptar la contrasenia*/
    //SaltSync, cuantas vueltas le dara a la encriptacion
    const salt = bcryptjs.genSaltSync();

    //Actualiza la prop password del usuario por la nueva encriptada
    usuario.password = bcryptjs.hashSync(password, salt);


    /*Graba en la tabla elegida (modelo), un nuevo usuario*/
    await usuario.save();

    res.json(usuario);
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    //Borrado fisico
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Actualiza el estado del usuario a false, no se borra para mantener integridad de datos
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPatch,
    usuariosDelete,
    usuariosPut,
    usuariosPost

}
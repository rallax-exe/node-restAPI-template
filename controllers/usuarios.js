
//Para mantener el tipado
const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    //Queryparams
    const { q, nombre ='No name', apikey } = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre, 
        apikey
    });
};


const usuariosPut = (req, res) => {
    //Controlador
    const id = req.params.id;

    res.status(400).json({
        msg: 'put API - controlador',
        id
    });
};

const usuariosPost = (req, res) => {
    //Controlador
    const {nombre, edad} = req.body;

    res.status(201).json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res) => {
    //Controlador
    res.json({
        msg: 'delete API - controlador'
    });
}

const usuariosPatch = (req, res) => {
    //Controlador
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
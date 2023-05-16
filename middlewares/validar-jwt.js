
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async(req = request, res = response, next) => {

    //Leer los headers
    const token = req.header('x-token');


    if (!token) {

        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })

    }

    try {

        //Metodo para verificar el JWT
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        //Leer el usaurio que corresponde al uid
        const usuario = await Usuario.findById( uid );

        //Si el usuario no existe
        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no valido'
            });
        };

        //Verificar si el uid tiene estado true
        if( !usuario.estado ){

            return res.status(401).json({
                msg: 'Token no valido'
            });

        };

        //Se le agrega a la request la prop usuario
        req.usuario = usuario;

        //Pasa al siguiente middleware
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }



}


module.exports = {

    validarJWT

}
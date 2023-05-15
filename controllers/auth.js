const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        //Si el usuario no existe
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Password No son correctos'
            });
        };

        //Verificar si el usuario esta activo en base de datos
        if( !usuario.estado  ){
            return res.status(400).json({
                msg: 'El usuario no esta activo'
            });
        };

        //Verificar la contrasenia
        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        };


        //Gnerar el JWT

        const token = await generarJWT( usuario.id );


        res.json({

            usuario, 
            token

        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({

            msg: 'Hable con el administrador',

        });
    }




}


module.exports = {

    login

}
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        //Si el usuario no existe
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password No son correctos'
            });
        };

        //Verificar si el usuario esta activo en base de datos
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario no esta activo'
            });
        };

        //Verificar la contrasenia
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        };


        //Gnerar el JWT
        const token = await generarJWT(usuario.id);


        res.json({

            usuario,
            token

        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({

            msg: 'Hable con el administrador',

        });
    };

};

const googleSigIn = async (req, res = response) => {

    //Extrae el token del la req
    const { id_token } = req.body;

    try {

        //Verifica el token 
        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        //Si usuario no existe
        if (!usuario) {
            //Se crea un nuevo usuario 
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            //Crea un modelo (instancia) 'usuario' de Mongo apartir del objeto literal data
            usuario = new Usuario(data);
            //Registra el usuario en DB
            await usuario.save();
        };

        //Si el usuario en DB esta desactivado
        if (!usuario.estado) {

            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });

        };


        //Si todo esta bien genera el JWT
        //Ojo el usuario.id es de Mongo 
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {

        res.status(400).json({
            ok: false,
            msg: 'El token de Google no se pudo verificar'
        });

    };
};




module.exports = {

    login,
    googleSigIn

}
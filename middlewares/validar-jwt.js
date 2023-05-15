
const { response, request } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req = request, res = response, next) => {

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

        //A la req, se le agrega la prop uid, la req viene por referencia
        req.uid = uid;

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